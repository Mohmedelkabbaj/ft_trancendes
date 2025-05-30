from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404, redirect
# from django.http import JsonResponse
from rest_framework import status,generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Profile,FriendRequest
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegistrationSerializer, LoginSerializer, ProfileSerializer, UserSerializer, RegistrationSerializer_42, FriendRequestSerializer, ProfileDetailSerializer
import requests
from django.db.models import Q
from rest_framework.parsers import MultiPartParser, FormParser
# import json
from django.contrib.auth import get_user_model
User = get_user_model()

DEFAULT_AVATAR_URL = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"

class login_42(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return redirect("https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-aeae34338eb2b61bbead013fba955aaefb9923825c0ad7e439f156a270a0ba29&redirect_uri=https%3A%2F%2Flocalhost%3A8000%2Foauth%2Fcallback%2F&response_type=code")

# def save_to_json(data, file_path="data.json"):
#     try:
#         with open(file_path, "w") as json_file:
#             json.dump(data, json_file, indent=4)
#         print(f"Data successfully saved to {file_path}")
#     except Exception as e:
#         print(f"An error occurred while saving data to {file_path}: {e}")

class callback_42(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        code = request.GET.get('code')
        token_url = 'https://api.intra.42.fr/oauth/token'
        data = {
            'grant_type': 'authorization_code',
            'client_id': "u-s4t2ud-aeae34338eb2b61bbead013fba955aaefb9923825c0ad7e439f156a270a0ba29",
            'client_secret': "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",
            'code': code,
            'redirect_uri': "https://localhost:8000/oauth/callback/",
        }
        response = requests.post(token_url, data=data)
        token_info = response.json()
        access_token = token_info.get('access_token')

        headers = {
            'Authorization': f'Bearer {access_token}',
        }
        response = requests.get('https://api.intra.42.fr/v2/me', headers=headers)

        user_data = response.json()
        email = user_data.get('email')
        if response.status_code != 200:
            return redirect("https://127.0.0.1:8000/?error")
        elif response.status_code == 200:
            if User.objects.filter(email=email).exists():
                exist = User.objects.get(email=email)
                refresh = RefreshToken.for_user(exist)
                access_token = str(refresh.access_token)
                user_id = exist.id
                redirect_url = f"https://127.0.0.1:5173/#/dashboard?success&access_token={access_token}&user_id={user_id}"
                # return redirect(redirect_url)
            else:
                user_data = response.json()
                user_data_serialized = {
                'username': user_data.get('login'),
                'email': user_data.get('email'),
                'first_name': user_data.get('first_name', ''),
                'last_name': user_data.get('last_name', ''),
                }
                serializer = RegistrationSerializer_42(data=user_data_serialized)
                if serializer.is_valid():
                    avatar_urls = user_data.get("image", {}).get("link") or DEFAULT_AVATAR_URL 
                    user = serializer.save()
                    profile = Profile.objects.get(user=user)
                    profile.avatar_url = avatar_urls
                    profile.save()
                    user_id = user.id
                    refresh = RefreshToken.for_user(user)
                    access_token = str(refresh.access_token)
                # else :
                #     user = User.objects.get(username=user_data.get('login'))
                #     refresh = RefreshToken.for_user(user)
                #     access_token = str(refresh.access_token)
                redirect_url = f"https://127.0.0.1:5173/#/dashboard?success&access_token={access_token}&user_id={user_id}"
            return redirect(redirect_url)

class RegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            email = request.data.get('email')
            if User.objects.filter(email=email).exists():
                return Response({"error": "Email already exists"}, status=400)
            user = serializer.save()
            profile = Profile.objects.get(user=user)
            return Response({
                "message": "User registered successfully!",
                "user": {
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
                "profile": {
                    "bio": profile.bio,
                    "email": profile.email,
                    "first_name": profile.first_name,
                    "last_name": profile.last_name,
                    "avatar": profile.avatar.url if profile.avatar else None,
                    "created_at": profile.created_at,
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful",
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_id': user.id,  # Add the user's ID to the response
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
class ProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser,)


    def put(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully!", "profile": serializer.data}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class RemoveRejectedFriendRequestsView(APIView):
#     permission_classes = [IsAuthenticated]

#     def delete(self, request):
#         FriendRequest.objects.filter(sender=request.user, status="rejected").delete()

class SendFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, receiver_id):
        sender = request.user
        receiver = get_object_or_404(User, id=receiver_id)
        
        if sender == receiver:
            return Response({"error": "You cannot send a friend request to yourself."}, status=status.HTTP_400_BAD_REQUEST)
        
        if FriendRequest.objects.filter(sender=sender, receiver=receiver, status="pending").exists():
            return Response({"error": "Friend request already sent."}, status=status.HTTP_400_BAD_REQUEST)
        
        friend_request = FriendRequest.objects.create(sender=sender, receiver=receiver)
        return Response({"message": "Friend request sent successfully.", "friend_request_id": friend_request.id}, status=status.HTTP_201_CREATED)
    
class AcceptFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, request_id):
        friend_request = get_object_or_404(FriendRequest, id=request_id, receiver=request.user, status="pending")
        friend_request.status = "accepted"
        friend_request.save()
        return Response({"message": "Friend request accepted."}, status=status.HTTP_200_OK)

class RejectFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, request_id):
        friend_request = get_object_or_404(FriendRequest, id=request_id, receiver=request.user, status="pending")
        # friend_request.status = "rejected"
        # friend_request.save()
        friend_request.delete()
        return Response({"message": "Friend request rejected."}, status=status.HTTP_200_OK)

class PendingFriendRequestsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FriendRequestSerializer

    def get_queryset(self):
        return FriendRequest.objects.filter(receiver=self.request.user, status="pending")

class FriendListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        sent_requests = FriendRequest.objects.filter(sender=user, status="accepted")
        received_requests = FriendRequest.objects.filter(receiver=user, status="accepted")
        
        friends = [fr.receiver for fr in sent_requests] + [fr.sender for fr in received_requests]
        
        friends = list(set(friends))
        
        serializer = UserSerializer(friends, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def delete(self, request, username=None):
        user = request.user
        friend = User.objects.filter(username=username).first()
        friend_request = FriendRequest.objects.filter(
            status="accepted",
            sender=user,
            receiver=friend
        ).first()
        
        if not friend_request:
            friend_request = FriendRequest.objects.filter(
                status="accepted",
                sender=friend,
                receiver=user
            ).first()
        
        if friend_request:
            friend_request.delete()
            return Response({"message": "Friend removed successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Friend request not found"}, status=status.HTTP_404_NOT_FOUND)

class UserListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileDetailView(generics.RetrieveAPIView):
    serializer_class = ProfileDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile
    
# class RemoveFriendView(APIView):
#     permission_classes = [IsAuthenticated]

#     def delete(self, request, friend_id):
#         user = request.user

#         # Query for accepted friend request where the current user is the sender.
#         qs1 = FriendRequest.objects.filter(sender=user, receiver_id=friend_id, status="accepted")
#         # Query for accepted friend request where the current user is the receiver.
#         qs2 = FriendRequest.objects.filter(sender_id=friend_id, receiver=user, status="accepted")
        
#         if qs1.exists() or qs2.exists():
#             qs1.delete()
#             qs2.delete()
#             return Response({"message": "Friend removed successfully."}, status=status.HTTP_200_OK)
#         else:
#             return Response({"error": "Friend not found or already removed."}, status=status.HTTP_404_NOT_FOUND)
    