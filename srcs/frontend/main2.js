let allUsers = [];
let lastRequestTime = 0;
let flag = 0
import { PongGame, setCurrentGame, TournamentPongGame, currentGame } from "./three";
import { NumberTapGame } from "./tapNumber.js";

document.addEventListener("DOMContentLoaded", () => {
    const pages = {
        signIn: `
            <div class="main">
                <div class="border-up">
                    <img class="logo" src="images/Pongify_logo.png">
                    <h2>WELCOME</h2>
                    <p>Login with your 42 Network account or use your own email and password</p>
                </div>
                <div class="border-bottom">
                    <form id="login-form">
                        <input id="login-username" type="text" class="brd" placeholder="Username"><br>
                        <input id="login-password" type="password" class="brd" placeholder="Password">
                        <p class="error-msg" style="color: red;"></p>
                        <button class="btn" type="submit">Login</button>
                    </form>
                    <button class="btn2"><img src="images/42.png">Network</button>
                    <a href="#" id="go-to-sign-up">Create Account</a>
                </div>
            </div>
        `,
        signUp: `
            <div class="main">
                <div class="border-up">
                    <img class="logo" src="images/Pongify_logo.png">
                    <h2>WELCOME</h2>
                    <p>Login with your 42 Network account or use your own email and password</p>
                </div>
                <div class="border-bottom">
                    <form id="signup-form">
                        <input id="username" type="text" class="brd" placeholder="Username">
                        <input id="email" type="email" class="brd" placeholder="Email">
                        <input id="password" type="password" class="brd" placeholder="Password">
                        <input id="first_name" type="text" class="brd" placeholder="First name">
                        <input id="last_name" type="text" class="brd" placeholder="Last name">
                        <button class="btn" type="submit">Sign Up</button>
                    </form>
                    <button class="btn2"><img src="images/42.png">Network</button>
                </div>
            </div>
        `,
        dashboard: `
            <div class="main">
                <div class="header">
                    <img class="logo" src="images/Pongify_logo.png">
                    <div class="test">
                        <a href="#/dashboard" data-page="home" class="active">HOME</a>
                        <a href="#/profile" data-page="profile">PROFILE</a>
                        <a href="#/game" data-page="game">GAME</a>
                        <a id="chat" href="#/chat" data-page="chat">CHAT</a>
                        <button id="signout-btn" type="button">Sign Out</button>
                    </div>
                </div>
                <div class="middle">
                    <div class="paragraph">
                        <h2>Classic Pong Modern Twist.</h2>
                        <p>"Pongify" is a reimagined version of the classic Pong game, bringing a 
                        fresh and engaging multiplayer experience. Compete with friends, join tournaments, 
                        and relive the nostalgia with enhanced graphics and smooth gameplay.</p>
                       <button class="btn btn-outline-info btn-lg start-playing-btn" id="startplay">START !</button>
                    </div>
                    <div class="friend-box">
                        <div class="friend-requests-container">
                            <h2 id="no-friend" style="display: block;">No friend requests found</h2>
                            <div id="friend-requests-list"></div>
                        </div>

                        <!-- Add Friends Button -->
                        <button class="f_img_l" id="add-friends-btn" type="button">Add Friends</button>
                        <!-- Search Bar (Initially Hidden) -->
                        <div id="search-bar-container" style="display: none;">
                            <input class="search_bar" type="text" id="search-bar" placeholder="Search friends...">
                            <div id="user-list-container"></div>
                        </div>
                        
                        <!-- Friends Button -->
                        <button class="f_img_l2" id="friends-btn" type="button">Friends</button>
                        <img class="f_img_last" src="dashboard img/FREINDLIST_041332.png">
                    </div>
                </div>
            </div>
        `,
        profile: `
        <div class="main">
            <div class="header">
                <img class="logo" src="images/Pongify_logo.png">
                <div class="test">
                    <a href="#/dashboard" data-page="home">HOME</a>
                    <a href="#/profile" data-page="profile" class="active">PROFILE</a>
                    <a href="#/game" data-page="game">GAME</a>
                    <a id="chat" href="#/chat" data-page="chat">CHAT</a>
                    <button id="signout-btn" type="button">Sign Out</button>
                </div>
            </div>
            <div class="profile-container">
                <div class="profile-info">
                    <img class="profile-border" src="profile imgs/main_profile_window.png">
                    <img class="p_img" id="profile-img" class="profile-img" src="profile images/luffy_snipper.jpg">
                    <h2 class="p_username" id="profile-username" class="profile-username">Username</h2>
                    <button class="edit_p" id="edit-p-btn" type="button">Edit Profile</button>
                </div>
                <div class="profile-stats">
                    <div class="stats-item">
                        <img class="stats-border wins" src="profile imgs/level_and_wins_window.png" alt="Wins">
                        <div id="wins-count" class="stats-text">Wins: 0</div>
                    </div>
                    <div class="stats-item">
                        <img class="stats-border losses" src="profile imgs/level_and_wins_window.png" alt="Losses">
                        <div id="losses-count" class="stats-text">Losses: 0</div>
                    </div>
                </div>
                <div class="match-history">
                    <img class="match-history-border" src="profile imgs/match_history_window.png" alt="Match History">
                    <div class="match-history-content">
                        <h3>Pong Match History</h3>
                        <div id="match-history-list" class="match-history-list"></div>
                        </div>
                        <div class="match-history-number-tap">
                            <h3>Number Tap Stats</h3>
                            <div id="number-tap-stats" class="number-tap-stats"></div>
                        </div>
                </div>
            </div>
        </div>
    `,
        game: `
    <div class="main">
        <div class="header">
            <img class="logo" src="images/Pongify_logo.png">
            <div class="test">
                <a href="#/dashboard" data-page="home">HOME</a>
                <a href="#/profile" data-page="profile">PROFILE</a>
                <a href="#/game" data-page="game" class="active">GAME</a>
                <a id="chat" href="#/chat" data-page="chat">CHAT</a>
                <button id="signout-btn" type="button">Sign Out</button>
            </div>
        </div>
            <div class="midd">
                <div class="btn">
                    <button type="button" class="local-mode-btn">Play Local Game</button>
                    <img class="f_img" src="dashboard img/full_button.png">
                </div>
                <div class="btn2">
                    <button type="button" class="multiplayer-mode-btn">Play Online Game</button>
                    <img class="f_img" src="dashboard img/full_buton_2.png">
                </div>
                <div class="btn3">
                    <button type="button" class="tournament-btn">Tournament</button>
                    <img class="f_img" src="dashboard img/full_buton_2.png">
                </div>
            </div>
            <div class="btn4">
                <button type="button" class="number-tap-btn">Play Number Tap</button>
            </div>
        </div>
        `,
        game_v2: `
    <div class="main">
        <div class="header">
            <img class="logo" src="images/Pongify_logo.png">
            <div class="test">
                <a href="#/dashboard" data-page="home">HOME</a>
                <a href="#/profile" data-page="profile">PROFILE</a>
                <a href="#/game" data-page="game" class="active">GAME</a>
                <a id="chat" href="#/chat" data-page="chat">CHAT</a>
                <button id="signout-btn" type="button">Sign Out</button>
            </div>
        </div>
        `,
        chat: `
        <div class="main">
            <div class="header">
                <img class="logo" src="images/Pongify_logo.png">
                <div class="test">
                    <a href="#/dashboard" data-page="home">HOME</a>
                    <a href="#/profile" data-page="profile">PROFILE</a>
                    <a href="#/game" data-page="game">GAME</a>
                    <a id="chat" href="#/chat" data-page="chat" class="active">CHAT</a>
                    <button id="signout-btn" type="button">Sign Out</button>
                </div>
            </div>
            <div class="border">
                <div class="app-container">
                    <div class="user-list" id="chat-friend-list">
                        <!-- Friend list will be dynamically populated here -->
                    </div>
                    <div class="chat-panel">
                        <div class="chat-header" id="chat-header">
                            Select a friend to start chatting
                        </div>
                        <div class="chat-messages" id="chat-messages">
                            <!-- Messages will be displayed here -->
                        </div>
                        <div class="chat-input-container">
                            <input type="text" class="chat-input" id="chat-input" placeholder="Type a message...">
                            <div class="btn-container">
                                <button id="emoji-toggle-btn" class="emoji-toggle-btn">
                                    <img class="emoji" src="https://icons.iconarchive.com/icons/designbolts/emoji/512/Emoji-Blank-icon.png" alt="">
                                </button>
                            </div>                    
                            <div id="emojiPicker" class="emoji-picker">
                                <span onclick="addEmoji('😀')" class="emoji">😀</span>
                                <span onclick="addEmoji('😂')" class="emoji">😂</span>
                                <span onclick="addEmoji('❤️')" class="emoji">❤️</span>
                                <span onclick="addEmoji('🎉')" class="emoji">🎉</span>
                                <span onclick="addEmoji('😎')" class="emoji">😎</span>
                                <span onclick="addEmoji('😅')" class="emoji">😅</span>
                                <span onclick="addEmoji('😍')" class="emoji">😍</span>
                                <span onclick="addEmoji('🔥')" class="emoji">🔥</span>
                                <span onclick="addEmoji('🤔')" class="emoji">🤔</span>
                                <span onclick="addEmoji('🙌')" class="emoji">🙌</span>
                                <span onclick="addEmoji('🌟')" class="emoji">🌟</span>
                                <span onclick="addEmoji('🥳')" class="emoji">🥳</span>
                                <span onclick="addEmoji('🍆')" class="emoji">🍆</span>
                                <span onclick="addEmoji('🔥')" class="emoji">🔥</span>
                                <span onclick="addEmoji('💩')" class="emoji">💩</span>
                            </div>
                            <button id="send-btn" class="send-btn">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    notFound: `
        <div class="main">
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <button class="btn-404" onclick="navigateTo('#/dashboard')">Back to Dashboard</button>
        </div>
    `,
    };
    
    let token;
    let user_id;
    let pollingInterval = null;
    
    const hash = window.location.hash;
    console.log("Hash:", hash);
    if (hash.includes('?'))
    {
      const urlParams = new URLSearchParams(hash.split('?')[1]);
      token = urlParams.get('access_token');
      user_id = urlParams.get('user_id');
    
      if (token) {
        localStorage.setItem("authToken", token);
        navigateTo('#/dashboard');
        console.log("Access token from URL:", token);
      }
      if (user_id) {
        localStorage.setItem("user_id", user_id);
        console.log("User ID from URL:", user_id);
      }
    } else {
      token = localStorage.getItem("authToken");
      user_id = localStorage.getItem("user_id");
      console.log("No query parameters found. Using token from localStorage:", token);
    }
    if (token)
    {
        const currentHash = window.location.hash;
        navigateTo(currentHash);
    }

    
    function preloadStylesheet(url) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }
    
    function loadCSS(fileName) {
        const existingLink = document.getElementById('dynamic-css');
        if (existingLink) existingLink.remove();

        const link = document.createElement('link');
        link.id = 'dynamic-css';
        link.rel = 'stylesheet';
        link.href = fileName;
        document.head.appendChild(link);
    }
    
    function navigateTo(route) {
        window.history.pushState({}, '', route);
        renderPage(route);
    }
    
    function setupSignOut() {
        const signOutBtn = document.getElementById("signout-btn");
        if (signOutBtn) {
            signOutBtn.addEventListener("click", () => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user_id");
          localStorage.removeItem("hasRedirected"); 
          token = "";
          user_id = "";
          if (pollingInterval) {
            clearInterval(pollingInterval);
            pollingInterval = null;
          }
          localStorage.clear();
          navigateTo('#/sign-in');
        });
    }
    }
    
    function setupDashboard() {
        const startplaybutton = document.getElementById("startplay");
        if (startplaybutton) {
            startplaybutton.addEventListener('click', () => {
                console.log("Start Playing button clicked!");
                navigateTo('#/game');
            });
        } else {
            console.error("Startplay button not found after rendering dashboard!");
        }
    }

    function setupchat() {
        const startplaybutton = document.getElementById("chat");
        if (startplaybutton) {
            startplaybutton.addEventListener('click', () => {
                console.log("Start Playing button clicked!");
                navigateTo('#/chat');
                fetchAndDisplayFriends();
            });
        } else {
            console.error("Startplay button not found after rendering dashboard!");
        }
    }
    
    async function isAuthenticated() {
        const access_token = localStorage.getItem('authToken');
        if (!access_token) {
            console.log("No auth token found in localStorage.");
            localStorage.removeItem('authToken');
            return false;
        }
    
        try {
            const response = await fetch('https://127.0.0.1:8000/profile/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                console.log("Token validation failed:", response.status);
                localStorage.removeItem('authToken');
                return false;
            }
            return true;
        } catch (error) {
            console.error('Token validation error:', error);
            localStorage.removeItem('authToken');
            return false;
        }
    }

    async function renderPage(route) {
        const app = document.getElementById('app');
        if (currentGame) currentGame.dispose();
        
        app.innerHTML = '<p>Loading...</p>';
        
        const protectedRoutes = ['#/dashboard', '#/profile', '#/game', '#/chat'];
        const publicRoutes = ['#/sign-in', '#/sign-up'];
    
        const authenticated = await isAuthenticated();

        if (pollingInterval && route !== '#/dashboard') {
            clearInterval(pollingInterval);
            pollingInterval = null;
        }
    
        if (protectedRoutes.includes(route)) {
            if (!authenticated) {
                navigateTo('#/sign-in');
                return;
            }
            renderProtectedPage(route);
        } else if (publicRoutes.includes(route)) {
            renderPublicPage(route);
        } else {
            if (authenticated) {
                console.log(`Invalid route ${route}. Showing 404 for authenticated user.`);
                app.innerHTML = pages.notFound;
                loadCSS('style2.css');
            } else {
                console.log(`Invalid route ${route}. Redirecting to sign-in for unauthenticated user.`);
                navigateTo('#/sign-in');
            }
        }
    }
    
    window.navigateTo = navigateTo;

    function renderPublicPage(route) {
        const app = document.getElementById('app');
        switch (route) {
            case '#/sign-in':
                app.innerHTML = pages.signIn;
                loadCSS('style2.css');
                setupSignIn();
                break;
            case '#/sign-up':
                app.innerHTML = pages.signUp;
                loadCSS('sign-up-page.css');
                setupSignUp();
                break;
            default:
                app.innerHTML = pages.signIn;
                loadCSS('style2.css');
                setupSignIn();
                break;
        }
    }
    
    function showNumberTapModal(app) {
        const modal = document.createElement('div');
        modal.id = 'number-tap-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Choose Your Mode</h2>
                <p>Select how you'd like to play Number Tap!</p>
                <button id="multiplayer-btn">Multiplayer</button>
                <button id="singleplayer-btn">Single-Player</button>
                <button id="cancel-btn">Cancel</button>
            </div>
        `;
        document.body.appendChild(modal);
    
        document.getElementById('multiplayer-btn').addEventListener('click', () => {
            app.innerHTML = pages.game_v2;
            setCurrentGame(new NumberTapGame('multiplayer'));
            modal.remove();
        });
    
        document.getElementById('singleplayer-btn').addEventListener('click', () => {
            app.innerHTML = pages.game_v2;
            setCurrentGame(new NumberTapGame('single'));
            modal.remove();
        });
    
        document.getElementById('cancel-btn').addEventListener('click', () => {
            modal.remove();
        });
    }
    function renderProtectedPage(route) {
        const app = document.getElementById('app');
        switch (route) {
            case '#/dashboard':
                app.innerHTML = pages.dashboard;
                loadCSS('dashboard.css');
                initializeHomeFunctionality();
                loadPendingFriendRequests();
                setupDashboard();
                setupSignOut();
                break;
            case '#/profile':
                app.innerHTML = pages.profile;
                loadCSS('profile.css');
                loadProfileInfo();
                initializeProfileEdit();
                setupSignOut();
                break;
            case '#/game':
                app.innerHTML = pages.game;
                loadCSS('styleGame.css');
                const multiplayerBtn = document.querySelector('.multiplayer-mode-btn');
                const localBtn = document.querySelector('.local-mode-btn');
                const tournamentBtn = document.querySelector('.tournament-btn');
                const numberTapBtn = document.querySelector('.number-tap-btn');
    
                if (multiplayerBtn) {
                    multiplayerBtn.addEventListener('click', () => {
                        app.innerHTML = pages.game_v2;
                        setCurrentGame(new PongGame('multiplayer'));
                    });
                }
                if (localBtn) {
                    localBtn.addEventListener('click', () => {
                        app.innerHTML = pages.game_v2;
                        setCurrentGame(new PongGame('local'));
                    });
                }
                if (tournamentBtn) {
                    tournamentBtn.addEventListener('click', () => {
                        app.innerHTML = pages.game_v2;
                        setCurrentGame(new TournamentPongGame());
                    });
                }
                if (numberTapBtn) {
                    numberTapBtn.id = 'number-tap-launch-btn';
                    numberTapBtn.addEventListener('click', () => {
                        showNumberTapModal(app);
                    });
                }
                setupSignOut();
                break;
            case '#/chat':
                app.innerHTML = pages.chat;
                loadCSS('chat.css');
                initializechatFunctionality();
                setupSignOut();
                break;            
        }
    }

    // function renderPage(route) {
    //     const app = document.getElementById('app');
    //     // const contentArea = document.getElementById('content-area');
    //     if (currentGame) currentGame.dispose();
    //     switch (route) {
    //         case '#/sign-in':
    //             // window.location.hash = '#/sign-in';
    //             app.innerHTML = pages.signIn;
    //             loadCSS('style2.css');
    //             setupSignIn();
    //             break;
    //         case '#/sign-up':
    //             // window.location.hash = '#/sign-up';
    //             app.innerHTML = pages.signUp;
    //             loadCSS('sign-up-page.css');
    //             setupSignUp();
    //             break;
    //         case '#/dashboard':
    //             // window.location.hash = '#/dashboard';
    //             app.innerHTML = pages.dashboard;
    //             loadCSS('dashboard.css');
    //             initializeHomeFunctionality();
    //             loadPendingFriendRequests();
    //             setupDashboard();
    //             // loadProfileInfo();
    //             setupSignOut();
    //             break;
    //         case '#/home':
    //             app.innerHTML = pages.home;
    //             break;
    //         case '#/profile':
    //             // window.location.hash = '#/profile';
    //             app.innerHTML = pages.profile;
    //             loadCSS('profile.css');
    //             loadProfileInfo();
    //             initializeProfileEdit();
    //             MatchHistory();
    //             setupSignOut();
    //             break;
    //             case '#/game':
    //                 window.location.hash = '#/game';
    //                 app.innerHTML = pages.game;
    //                 loadCSS('styleGame.css');
    //                 if (currentGame) currentGame.dispose();
    //                 const multiplayerBtn = document.querySelector('.multiplayer-mode-btn');
    //                 const localBtn = document.querySelector('.local-mode-btn');
    //                 const tournamentBtn = document.querySelector('.tournament-btn');
    //                 const numberTapBtn = document.querySelector('.number-tap-btn');
                    
    //                 if (multiplayerBtn) {
    //                     multiplayerBtn.addEventListener('click', () => {
    //                         app.innerHTML = pages.game_v2;
    //                         setCurrentGame(new PongGame('multiplayer'));
    //                     });
    //                 }
    //                 if (localBtn) {
    //                     localBtn.addEventListener('click', () => {
    //                         app.innerHTML = pages.game_v2;
    //                         setCurrentGame(new PongGame('local'));
    //                     });
    //                 }
    //                 if (tournamentBtn) {
    //                     tournamentBtn.addEventListener('click', () => {
    //                         app.innerHTML = pages.game_v2;
    //                         setCurrentGame(new TournamentPongGame());
    //                     });
    //                 }
    //                 if (numberTapBtn) {
    //                     numberTapBtn.addEventListener('click', async () => {
    //                         const access_token = localStorage.getItem('authToken');
    //                         if (!access_token) {
    //                             console.error('No authentication token found. Please log in.');
    //                             alert('You must be logged in to play. Redirecting to sign-in.');
    //                             // navigateTo('#/sign-in');
    //                             return;
    //                         }
                
    //                         const mode = confirm('Play Number Tap in Single-Player or Multiplayer? (Yes for Multiplayer, No for Single-Player)') ? 'multiplayer' : 'single';
    //                         app.innerHTML = pages.game_v2;
    //                         setCurrentGame(new NumberTapGame(mode));
    //                     });
    //                 }
    //                 setupSignOut();
    //                 break;
    //         case '#/chat':
    //             window.location.hash = '#/chat';
    //             app.innerHTML = pages.chat;
    //             loadCSS('chat.css');
    //             initializechatFunctionality();
    //             setupSignOut();
    //             break;
    //         default:
    //             app.innerHTML = pages.signIn;
    //             loadCSS('style2.css');
    //             setupSignIn();
    //             break;
    //         }
    //     }
        
        function setupSignIn() 
        {
        const loginForm = document.getElementById('login-form');
        const goToSignUp = document.getElementById('go-to-sign-up');
        const errorMsg = document.querySelector('.error-msg');
        const btn2 = document.querySelector('.btn2');

        goToSignUp.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('#/sign-up');
        });


        if (btn2) 
        {
            console.log(token);
            btn2.addEventListener('click', async () => {
                try {
                    window.location.href = 'https://127.0.0.1:8000/42_login/';
                    const params = new URLSearchParams(window.location.search);
                    const token = params.get('access_token');
                    if (token) {
                        localStorage.setItem('authToken', token);
                        console.log("Access token stored in localStorage:", token);
                        window.history.replaceState({}, document.title, window.location.pathname);
                    } else {
                        console.log("No access token found in URL.");
                    }
                } catch (error) {
                    console.error('Error during 42 Network login:', error);
                    alert('An error occurred. Please try again.');
                }
            });
        }

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.querySelector('input[placeholder="Username"]').value.trim();
            const password = document.querySelector('input[placeholder="Password"]').value.trim();
            const errorMsg = document.querySelector('.error-msg');
            
            // Clear any previous error message
            errorMsg.style.display = 'none';
            errorMsg.textContent = '';
            
            if (!username || !password) {
                errorMsg.style.display = 'block';
                errorMsg.textContent = 'Username and password are required!';
                return;
            }
            
            try {
                console.log('Sending payload:', { username, password });
                const response = await fetch('https://127.0.0.1:8000/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) 
                {
                    const result = await response.json();
                    console.log("result : ", result);
                    localStorage.setItem('authToken', result.data.access);
                    localStorage.setItem('user_id', result.data.user_id);
                    navigateTo('#/dashboard');
                }
                else 
                {
                    const errorData = await response.json();
                    errorMsg.style.display = 'block';
                    errorMsg.textContent = errorData.error || 'Invalid username or password';
                }
            } catch (error) {
                console.error('Error during login:', error);
                errorMsg.style.display = 'block';
                errorMsg.textContent = 'Something went wrong. Please try again later.';
            }
        });
    }

    function setupSignUp() 
    {
        const signupForm = document.getElementById('signup-form');
        const btn2 = document.querySelector('.btn2');

        if(btn2)
        {
            btn2.addEventListener('click', async () => {
                try {
                    window.location.href = 'https://127.0.0.1:8000/42_login/';
            
                    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
                    const token = urlParams.get('access_token');
                    console.log("Access token from 42 Network:", token); 
                    if (token)
                    {
                        localStorage.setItem('authToken', token);
                        window.history.replaceState({}, document.title, window.location.pathname);
                    }
                    else 
                    {
                        console.log("No access token found in URL.");
                    }
                } catch (error) {
                    console.error('Error during 42 Network login:', error);
                    alert('An error occurred. Please try again.');
                }
            });
        }
        
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                first_name: document.getElementById('first_name').value,
                last_name: document.getElementById('last_name').value
            };
            try {
                const response = await fetch('https://127.0.0.1:8000/register/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    navigateTo('#/sign-in');
                } else {
                    const errorData = await response.json();
                    alert(errorData.error || 'Sign-up failed');
                }
            } catch (error) {
                console.error('Error during sign-up:', error);
                alert('An error occurred. Please try again.');
            }
        });
        
    }
    localStorage.setItem("authToken", token);
    console.log("Token set in localStorage:", localStorage.getItem("authToken"));
    

    function calculateWinsAndLosses(matches) {
        let wins = 0;
        let losses = 0;
        const username = document.getElementById('profile-username').innerText;
    
        matches.forEach(match => {
            const isPlayer1 = match.player1_username === username;
            const userScore = isPlayer1 ? match.score1 : match.score2;
            const opponentScore = isPlayer1 ? match.score2 : match.score1;
    
            if (userScore > opponentScore) {
                wins++;
            } else if (userScore < opponentScore) {
                losses++;
            }
        });
    
        return { wins, losses };
    }
    async function displayMatchHistory() {
        try {
            const access_token = localStorage.getItem('authToken');

            const pongResponse = await fetch('https://127.0.0.1:8000/match-history/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
            });
    
            const numberTapResponse = await fetch('https://127.0.0.1:8000/number-tap-history/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
            });

            const pongData = pongResponse.ok ? await pongResponse.json() : { match_history: [] };
    
            let numberTapData;
            try {
                numberTapData = numberTapResponse.ok ? await numberTapResponse.json() : { data: { match_history: [], stats: { total_games: 0, total_score: 0, average_score: 0, wins: 0, losses: 0 } } };
            } catch (jsonError) {
                console.error('Error parsing Number Tap response:', jsonError);
                numberTapData = { data: { match_history: [], stats: { total_games: 0, total_score: 0, average_score: 0, wins: 0, losses: 0 } } };
            }
    
            console.log("Pong Match History Data:", pongData);
            console.log("Number Tap Match History Data:", numberTapData);
    
            const matchHistoryList = document.getElementById('match-history-list');
            const winsCount = document.getElementById('wins-count');
            const lossesCount = document.getElementById('losses-count');
            const numberTapStats = document.getElementById('number-tap-stats');
    
            if (matchHistoryList && winsCount && lossesCount && numberTapStats) {
                matchHistoryList.innerHTML = '';
                numberTapStats.innerHTML = '';  
    
                const pongMatches = (pongData.match_history || []).map(match => ({ ...match, type: 'online' }));
                if (pongMatches.length > 0) {
                    const { wins, losses } = calculateWinsAndLosses(pongMatches);
                    winsCount.innerText = `Wins: ${wins}`;
                    lossesCount.innerText = `Losses: ${losses}`;
    
                    pongMatches.forEach(match => {
                        const matchDiv = document.createElement('div');
                        matchDiv.classList.add('match-history-item');
                        matchDiv.innerHTML = `
                            <p>${match.player1_username} vs ${match.player2_username} (${match.score1}-${match.score2}) (Online)</p>
                            <p>WINNER: ${match.result}</p>
                            <p>Date: ${new Date(match.created_at).toLocaleString()}</p>
                        `;
                        matchHistoryList.appendChild(matchDiv);
                    });
                } else {
                    matchHistoryList.innerHTML = '<p>No Pong match history found.</p>';
                    winsCount.innerText = 'Wins: 0';
                    lossesCount.innerText = 'Losses: 0';
                }
    
                const ntStats = numberTapData.data.stats || { total_games: 0, total_score: 0, average_score: 0, wins: 0, losses: 0 };
                numberTapStats.innerHTML = `
                    <p>Total Games: ${ntStats.total_games}</p>
                    <p>Total Score: ${ntStats.total_score}</p>
                    <p>Average Score: ${ntStats.average_score}</p>
                    <p>Wins: ${ntStats.wins}</p>
                    <p>Losses: ${ntStats.losses}</p>
                `;
            }
        } catch (error) {
            console.error('Error displaying match history:', error);
            const matchHistoryList = document.getElementById('match-history-list');
            const winsCount = document.getElementById('wins-count');
            const lossesCount = document.getElementById('losses-count');
            if (matchHistoryList) {
                matchHistoryList.innerHTML = '<p>An error occurred. Please try again later.</p>';
            }
            if (winsCount) winsCount.innerText = 'Wins: 0';
            if (lossesCount) lossesCount.innerText = 'Losses: 0';
        }
    }


    async function loadProfileInfo() {
        try {
            const access_token = localStorage.getItem('authToken');
            if (!access_token) {
                console.log("No access token found in localStorage.", {access_token});
                return;
            }
            const response = await fetch('https://127.0.0.1:8000/profile/', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response Headers:', response);
            console.log("GET Response Status:", response.status);
    
            if (response.ok) {
                const result = await response.json();
                console.log("GET Profile Data:", result);
                const profileData = result.data?.attributes || {};
                const avatarUrl = profileData.avatar || 'images/default-avatar.png';
                const username = profileData.username || 'Unknown User';
                console.log("Avatar URL:", avatarUrl);
                console.log("Username:", username);
    
                const profileImg = document.getElementById('profile-img');
                if (avatarUrl.startsWith("https://"))
                {
                    profileImg.src = avatarUrl;
                    document.getElementById('profile-username').innerText = username;
                    profileImg.onload = () => console.log("Image loaded successfully");
                    profileImg.onerror = () => console.error("Image failed to load:", avatarUrl);
                }
                else
                {
                    profileImg.src = `https://127.0.0.1:8000${avatarUrl}?t=${new Date().getTime()}`;
                    profileImg.onload = () => console.log("Image loaded successfully");
                    profileImg.onerror = () => console.error("Image failed to load:", avatarUrl);
                    document.getElementById('profile-username').innerText = username;
                }
                await displayMatchHistory();
            } else {
                console.error("GET Error:", await response.json());
                document.getElementById('profile-img').src = 'images/default-avatar.png';
                document.getElementById('profile-username').innerText = 'Unknown User';
            }
        } catch (error) {
            console.error('Error loading profile info:', error);
            document.getElementById('profile-img').src = 'images/default-avatar.png';
            document.getElementById('profile-username').innerText = 'Unknown User';
        }
    }



    async function initializeHomeFunctionality() {
        const addFriendsButton = document.getElementById("add-friends-btn");
        const friendsButton = document.getElementById("friends-btn");
        const searchBarContainer = document.getElementById("search-bar-container");
        const searchInput = document.getElementById("search-bar");
        const friendRequestsContainer = document.querySelector(".friend-requests-container");
    
        function hideAllExcept(exceptElement) {
            const elementsToHide = [
                searchBarContainer,
                friendRequestsContainer,
                document.getElementById("dynamic-friend-list")
            ];
            elementsToHide.forEach(element => {
                if (element && element !== exceptElement) {
                    if (element.id === "dynamic-friend-list" && element) {
                        element.remove();
                    } else {
                        element.style.display = "none";
                    }
                }
            });
        }
    
        function showPendingRequests() {
            hideAllExcept(friendRequestsContainer);
            friendRequestsContainer.style.display = "block";
            loadPendingFriendRequests();
        }
    
        if (friendRequestsContainer) {
            friendRequestsContainer.style.display = "block";
            loadPendingFriendRequests();
        }
    
        if (addFriendsButton && searchBarContainer) {
            addFriendsButton.addEventListener("click", () => {
                if (searchBarContainer.style.display === "none" || searchBarContainer.style.display === "") {
                    hideAllExcept(searchBarContainer);
                    searchBarContainer.style.display = "block";
                    fetchAndDisplayUsers();
                } else {
                    searchBarContainer.style.display = "none";
                    showPendingRequests();
                }
            });
        }
    
        if (friendsButton) {
            friendsButton.addEventListener("click", () => {
                const existingFriendList = document.getElementById("dynamic-friend-list");
                if (!existingFriendList) {
                    hideAllExcept(null);
                    fetchAndDisplayFriends(friendsButton);
                } else {
                    existingFriendList.remove();
                    showPendingRequests();
                }
            });
        }
    
        if (searchInput) {
            searchInput.addEventListener("keyup", async () => {
                const query = searchInput.value.trim();
                if (!query) {
                    fetchAndDisplayUsers();
                } else {
                    await searchAndDisplayUsers(query);
                }
            });
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
    
    // async function sendFriendRequest(receiverId) {
    //     try {
    //         console.log("Sending friend request to user ID:", receiverId);
    //         console.log("Token:", localStorage.getItem("authToken"));
    //         const response = await fetch(`https://127.0.0.1:8000/friends/send/${receiverId}/`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${localStorage.getItem("authToken")}`
    //             },
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             alert(`Error: ${JSON.stringify(errorData)}`);
    //             alert(`Error: ${errorData.message || "Failed to send friend request"}`);
    //             return;
    //         }

    //         const data = await response.json();
    //         alert(`Success: ${data.message || "Friend request sent successfully!"}`);
    //     } catch (error) {
    //         console.error("Error sending friend request:", error);
    //         alert("An unexpected error occurred.");
    //     }
    // }

    function showPopup(message, isError = false) {
        const popup = document.createElement("div");
        popup.className = "alert-popup";
        const overlay = document.createElement("div");
        overlay.className = "alert-overlay";
    
        popup.innerHTML = `
            <p class="${isError ? 'error' : 'success'}">${message}</p>
            <button class="alert-close">OK</button>
        `;
    
        document.body.appendChild(popup);
        document.body.appendChild(overlay);
    
        // Show with animation
        setTimeout(() => {
            popup.classList.add("active");
            overlay.classList.add("active");
        }, 10);
    
        // Close popup
        const closeBtn = popup.querySelector(".alert-close");
        closeBtn.addEventListener("click", () => {
            popup.classList.remove("active");
            overlay.classList.remove("active");
            setTimeout(() => {
                popup.remove();
                overlay.remove();
            }, 300); // Match transition duration
        });
    
        // Close on overlay click (optional)
        overlay.addEventListener("click", () => {
            popup.classList.remove("active");
            overlay.classList.remove("active");
            setTimeout(() => {
                popup.remove();
                overlay.remove();
            }, 300);
        });
    }

    async function sendFriendRequest(receiverId) {
        try {
            console.log("Sending friend request to user ID:", receiverId);
            console.log("Token:", localStorage.getItem("authToken"));
            const response = await fetch(`https://127.0.0.1:8000/friends/send/${receiverId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                },
            });
    
            // Create popup elements
            const popup = document.createElement("div");
            popup.className = "alert-popup";
            const overlay = document.createElement("div");
            overlay.className = "alert-overlay";
    
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || "Failed to send friend request";
                popup.innerHTML = `
                    <p>Error: ${errorMessage}</p>
                    <button class="alert-close">OK</button>
                `;
                document.body.appendChild(popup);
                document.body.appendChild(overlay);
    
                // Show popup with animation
                setTimeout(() => {
                    popup.classList.add("active");
                    overlay.classList.add("active");
                }, 10);
    
                // Close popup
                popup.querySelector(".alert-close").addEventListener("click", () => {
                    popup.classList.remove("active");
                    overlay.classList.remove("active");
                    setTimeout(() => {
                        popup.remove();
                        overlay.remove();
                    }, 300); // Match CSS transition duration
                });
                return;
            }
    
            const data = await response.json();
            const successMessage = data.message || "Friend request sent successfully!";
            popup.innerHTML = `
                <p>Success: ${successMessage}</p>
                <button class="alert-close">OK</button>
            `;
            document.body.appendChild(popup);
            document.body.appendChild(overlay);
    
            // Show popup with animation
            setTimeout(() => {
                popup.classList.add("active");
                overlay.classList.add("active");
            }, 10);
    
            // Close popup
            popup.querySelector(".alert-close").addEventListener("click", () => {
                popup.classList.remove("active");
                overlay.classList.remove("active");
                setTimeout(() => {
                    popup.remove();
                    overlay.remove();
                }, 300); // Match CSS transition duration
            });
    
        } catch (error) {
            console.error("Error sending friend request:", error);
            const popup = document.createElement("div");
            popup.className = "alert-popup";
            popup.innerHTML = `
                <p>An unexpected error occurred.</p>
                <button class="alert-close">OK</button>
            `;
            const overlay = document.createElement("div");
            overlay.className = "alert-overlay";
            document.body.appendChild(popup);
            document.body.appendChild(overlay);
    
            setTimeout(() => {
                popup.classList.add("active");
                overlay.classList.add("active");
            }, 10);
    
            popup.querySelector(".alert-close").addEventListener("click", () => {
                popup.classList.remove("active");
                overlay.classList.remove("active");
                setTimeout(() => {
                    popup.remove();
                    overlay.remove();
                }, 300);
            });
        }
    }

    async function acceptFriendRequest(requestId) {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`https://127.0.0.1:8000/friends/accept/${requestId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                showPopup("Friend request accepted!");
                loadPendingFriendRequests();
            } else {
                const errorData = await response.json();
                showPopup(errorData.message || "Failed to accept friend request", true);
            }
        } catch (error) {
            console.error("Error accepting friend request:", error);
            showPopup("An error occurred while accepting the friend request.", true);
        }
    }
  
    async function rejectFriendRequest(requestId) {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`https://127.0.0.1:8000/friends/reject/${requestId}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                showPopup("Friend request rejected!");
                loadPendingFriendRequests();
            } else {
                const errorData = await response.json();
                showPopup(errorData.message || "Failed to reject friend request", true);
            }
        } catch (error) {
            console.error("Error rejecting friend request:", error);
            showPopup("An error occurred while rejecting the friend request.", true);
        }
    }
  
    async function loadPendingFriendRequests() {
      try {
        const response = await fetch("https://127.0.0.1:8000/friends/pending/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
      
        if (!response.ok) {
          console.error("Failed to fetch pending friend requests. Status:", response.status);
          return;
        }
      
        const data = await response.json();
        console.log("Pending friend requests API response:", data);
      
        let pendingList = [];
        if (data.data && Array.isArray(data.data)) {
          pendingList = data.data.map(item => Object.assign({}, item.attributes, { id: item.id }));
        } else {
          console.error("Unexpected response format for pending friend requests:", data);
          return;
        }
      
        const noFriendElem = document.getElementById("no-friend");
        const friendRequestsList = document.getElementById("friend-requests-list");
        friendRequestsList.innerHTML = "";
      
        if (pendingList.length === 0) {
            noFriendElem.style.display = "block";
            friendRequestsList.style.display = "none";
        } else {
            noFriendElem.style.display = "none";
            friendRequestsList.style.display = "block";
            pendingList.forEach(request => {
                const requestDiv = document.createElement("div");
                requestDiv.classList.add("friend-request-item");
            
            const avatarImg = document.createElement("img");
            if(request.sender_avatar.startsWith("https://"))
            {
                avatarImg.src = request.sender_avatar || "images/default-avatar.png";
                avatarImg.alt = request.sender_username || "User Avatar";
                avatarImg.classList.add("user-avatar");
            }
            else
            {
                avatarImg.src = `https://127.0.0.1:8000${request.sender_avatar}` || "images/default-avatar.png";
                console.log("avatar 1: " ,avatarImg.src);
                avatarImg.alt = request.sender_username || "User Avatar";
                avatarImg.classList.add("user-avatar");
            }
            const usernameSpan = document.createElement("span");
            usernameSpan.classList.add("username");
            usernameSpan.textContent = request.sender_username || "Unknown";
            
            const acceptButton = document.createElement("button");
            acceptButton.textContent = "Accept";
            acceptButton.classList.add("accept-button");
            acceptButton.addEventListener("click", () => acceptFriendRequest(request.id));
            
            const rejectButton = document.createElement("button");
            rejectButton.textContent = "Reject";
            rejectButton.classList.add("reject-button");
            rejectButton.addEventListener("click", () => rejectFriendRequest(request.id));
            
            requestDiv.appendChild(avatarImg);
            requestDiv.appendChild(usernameSpan);
            requestDiv.appendChild(acceptButton);
            requestDiv.appendChild(rejectButton);
            
            friendRequestsList.appendChild(requestDiv);
          });
        }
      } catch (error) {
        console.error("Error loading pending friend requests:", error);
      }
    }

    // async function fetchAndDisplayFriends(buttonElement) {
    //     try {
    //         const response = await fetch("https://127.0.0.1:8000/friends/list/", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
    //             },
    //         });
    
    //         if (!response.ok) {
    //             console.error("Failed to fetch friend list. Status:", response.status);
    //             return;
    //         }
    
    //         const data = await response.json();
    //         console.log("Friend list API response:", data);
    
    //         let friendList = [];
    //         if (data.data && Array.isArray(data.data)) {
    //             friendList = data.data.map(item => Object.assign({}, item.attributes, { id: item.id }));
    //         } else {
    //             console.error("Unexpected response format for friend list:", data);
    //             return;
    //         }
    
    //         let friendListContainer = document.getElementById("dynamic-friend-list");
    //         if (friendListContainer) {
    //             friendListContainer.remove();
    //         }
    
    //         friendListContainer = document.createElement("div");
    //         friendListContainer.id = "dynamic-friend-list";
    //         friendListContainer.classList.add("friend-list-container");
    
    //         if (friendList.length === 0) {
    //             let noFriendsMessage = document.createElement("h2");
    //             noFriendsMessage.textContent = "No friends found.";
    //             noFriendsMessage.classList.add("no-friends-message");
    //             friendListContainer.appendChild(noFriendsMessage);
    //         } else {
    //             friendList.forEach(friend => {
    //                 const friendDiv = document.createElement("div");
    //                 friendDiv.classList.add("friend-item");
    
    //                 const avatarImg = document.createElement("img");
    //                 if (friend.avatar.startsWith("https://")) {
    //                     avatarImg.src = friend.avatar || "images/default-avatar.png";
    //                 } else {
    //                     avatarImg.src = `https://127.0.0.1:8000${friend.avatar}` || "images/default-avatar.png";
    //                 }
    //                 avatarImg.alt = friend.username || "Friend Avatar";
    //                 avatarImg.classList.add("friend-avatar");
    
    //                 const usernameContainer = document.createElement("span");
    //                 usernameContainer.classList.add("friend-username-container");
    
    //                 const statusDot = document.createElement("span");
    //                 statusDot.classList.add("status-dot");
    //                 statusDot.style.backgroundColor = friend.online_status ? "#28a745" : "#ff0000";
    //                 statusDot.style.width = "10px";
    //                 statusDot.style.height = "10px";
    //                 statusDot.style.borderRadius = "50%";
    //                 statusDot.style.display = "inline-block";
    //                 statusDot.style.marginRight = "5px";
    
    //                 const usernameSpan = document.createElement("span");
    //                 usernameSpan.classList.add("friend-username");
    //                 usernameSpan.textContent = friend.username || "Unknown";
    
    //                 usernameContainer.appendChild(statusDot);
    //                 usernameContainer.appendChild(usernameSpan);
    
    //                 const removeButton = document.createElement("button");
    //                 removeButton.textContent = "Remove";
    //                 removeButton.classList.add("remove-friend-btn");
    //                 removeButton.addEventListener("click", () => removeFriend(friend.username, friendListContainer, buttonElement));
    
    //                 friendDiv.appendChild(avatarImg);
    //                 friendDiv.appendChild(usernameContainer);
    //                 friendDiv.appendChild(removeButton);
    //                 friendListContainer.appendChild(friendDiv);
    //             });
    //         }
    
    //         buttonElement.insertAdjacentElement("afterend", friendListContainer);
    //     } catch (error) {
    //         console.error("Error fetching friend list:", error);
    //     }
    // }

    async function fetchAndDisplayFriends(buttonElement) {
        try {
            const response = await fetch("https://127.0.0.1:8000/friends/list/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
    
            if (!response.ok) {
                console.error("Failed to fetch friend list. Status:", response.status);
                return;
            }
    
            const data = await response.json();
            console.log("Friend list API response:", data);
    
            let friendList = [];
            if (data.data && Array.isArray(data.data)) {
                friendList = data.data.map(item => Object.assign({}, item.attributes, { id: item.id }));
            } else {
                console.error("Unexpected response format for friend list:", data);
                return;
            }
    
            let friendListContainer = document.getElementById("dynamic-friend-list");
            if (friendListContainer) {
                friendListContainer.innerHTML = ""; // Clear existing content
            } else {
                friendListContainer = document.createElement("div");
                friendListContainer.id = "dynamic-friend-list";
                friendListContainer.classList.add("friend-list-container");
    
                // Insert container safely
                if (buttonElement && buttonElement.parentNode) {
                    buttonElement.insertAdjacentElement("afterend", friendListContainer);
                } else {
                    const friendBox = document.querySelector(".friend-box");
                    if (friendBox) {
                        friendBox.appendChild(friendListContainer);
                    } else {
                        console.error("Could not find .friend-box to insert friend list");
                        return;
                    }
                }
            }
    
            if (friendList.length === 0) {
                let noFriendsMessage = document.createElement("h2");
                noFriendsMessage.textContent = "No friends found.";
                noFriendsMessage.classList.add("no-friends-message");
                friendListContainer.appendChild(noFriendsMessage);
            } else {
                renderFriendList(friendList, friendListContainer);
            }
    
            // Start polling for status updates
            startFriendStatusPolling(friendListContainer);
        } catch (error) {
            console.error("Error fetching friend list:", error);
        }
    }
    
    function renderFriendList(friendList, container) {
        container.innerHTML = ''; // Clear existing content
        friendList.forEach(friend => {
            const friendDiv = document.createElement("div");
            friendDiv.classList.add("friend-item");
            friendDiv.dataset.userId = friend.id; // Store user ID for updates
    
            const avatarImg = document.createElement("img");
            if (friend.avatar.startsWith("https://")) {
                avatarImg.src = friend.avatar || "images/default-avatar.png";
            } else {
                avatarImg.src = `https://127.0.0.1:8000${friend.avatar}` || "images/default-avatar.png";
            }
            avatarImg.alt = friend.username || "Friend Avatar";
            avatarImg.classList.add("friend-avatar");
    
            const usernameContainer = document.createElement("span");
            usernameContainer.classList.add("friend-username-container");
    
            const statusDot = document.createElement("span");
            statusDot.classList.add("status-dot");
            statusDot.style.backgroundColor = friend.online_status ? "#28a745" : "#6c757d";
            statusDot.style.width = "10px";
            statusDot.style.height = "10px";
            statusDot.style.borderRadius = "50%";
            statusDot.style.display = "inline-block";
            statusDot.style.marginRight = "5px";
    
            const usernameSpan = document.createElement("span");
            usernameSpan.classList.add("friend-username");
            usernameSpan.textContent = friend.username || "Unknown";
    
            usernameContainer.appendChild(statusDot);
            usernameContainer.appendChild(usernameSpan);
    
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-friend-btn");
            removeButton.addEventListener("click", () => removeFriend(friend.username, container, document.querySelector('.friend-list-btn')));
    
            friendDiv.appendChild(avatarImg);
            friendDiv.appendChild(usernameContainer);
            friendDiv.appendChild(removeButton);
            container.appendChild(friendDiv);
        });
    }
    
    function startFriendStatusPolling(container) {
        // Stop any existing polling
        if (pollingInterval) {
            clearInterval(pollingInterval);
        }
    
        // Poll every 30 seconds
        pollingInterval = setInterval(async () => {
            try {
                const response = await fetch("https://127.0.0.1:8000/friends/list/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
    
                if (!response.ok) {
                    console.error("Polling failed. Status:", response.status);
                    return;
                }
    
                const data = await response.json();
                if (data.data && Array.isArray(data.data)) {
                    const friendList = data.data.map(item => Object.assign({}, item.attributes, { id: item.id }));
                    updateFriendStatuses(friendList, container);
                }
            } catch (error) {
                console.error("Error during friend status polling:", error);
            }
        }, 30000); // 30 seconds
    }
    
    function updateFriendStatuses(friendList, container) {
        friendList.forEach(friend => {
            const friendDiv = container.querySelector(`.friend-item[data-user-id="${friend.id}"]`);
            if (friendDiv) {
                const statusDot = friendDiv.querySelector('.status-dot');
                const newStatusColor = friend.online_status ? "#28a745" : "#6c757d";
                if (statusDot.style.backgroundColor !== newStatusColor) {
                    statusDot.style.backgroundColor = newStatusColor;
                    console.log(`Updated status for ${friend.username} to ${friend.online_status ? 'online' : 'offline'}`);
                }
            }
        });
    }

      async function removeFriend(username, friendListDiv, buttonElement) {
          try {
              const response = await fetch(`https://127.0.0.1:8000/friends/remove/${username}/`, {
                  method: "DELETE",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                  },
              });
  
              if (response.ok) {
                  console.log(`Friend ${username} removed successfully`);
                  friendListDiv.remove(); // Remove current list
                  fetchAndDisplayFriends(buttonElement); // Refresh friend list
                  
              } else {
                  const errorData = await response.json();
                  console.error("Failed to remove friend:", errorData);
                  alert(errorData.error || "Failed to remove friend");
              }
          }
          catch (error) {
              console.error("Error removing friend:", error);
              alert("Error removing friend. Please try again.");
          }
      }

      async function  fetchAndDisplayFriendschat() {
        try {
            const response = await fetch("https://127.0.0.1:8000/friends/list/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
    
            if (!response.ok) {
                console.error("Failed to fetch friend list. Status:", response.status);
                return;
            }
    
            const data = await response.json();
            console.log("Friend list API response:", data);
    
            let friendList = [];
            if (data.data && Array.isArray(data.data)) {
                friendList = data.data.map(item => Object.assign({}, item.attributes, { id: item.id }));
            } else {
                console.error("Unexpected response format for friend list:", data);
                return;
            }
    
            const friendListContainer = document.getElementById("chat-friend-list");
            if (!friendListContainer) {
                console.error("Chat friend list container not found.");
                return;
            }
    
            friendListContainer.innerHTML = ""; // Clear previous content
    
            if (friendList.length === 0) {
                const noFriendsMessage = document.createElement("div");
                noFriendsMessage.classList.add("no-friends");
                noFriendsMessage.textContent = "No friends found.";
                friendListContainer.appendChild(noFriendsMessage);
            } else {
                friendList.forEach(friend => {
                    const friendDiv = document.createElement("div");
                    friendDiv.classList.add("user");
                    friendDiv.setAttribute("data-friend-id", friend.id);
                    friendDiv.setAttribute("data-friend-name", friend.username);
                    friendDiv.addEventListener("click", () => switchConversation(friend.username));
    
                    const iconDiv = document.createElement("div");
                    iconDiv.classList.add("icon");
                    const avatarImg = document.createElement("img");
                    if (friend.avatar.startsWith("https://")) {
                        avatarImg.src = friend.avatar || "images/default-avatar.png";
                    } else {
                        avatarImg.src = `https://127.0.0.1:8000${friend.avatar}` || "images/default-avatar.png";
                    }
                    avatarImg.alt = friend.username || "Friend Avatar";
                    iconDiv.appendChild(avatarImg);
    
                    const nameDiv = document.createElement("div");
                    nameDiv.textContent = friend.username || "Unknown";
    
                    friendDiv.appendChild(iconDiv);
                    friendDiv.appendChild(nameDiv);
                    friendListContainer.appendChild(friendDiv);
                });
            }
        } catch (error) {
            console.error("Error fetching friend list:", error);
        }
    }


    function displayUserSearchResults(users) {
        const resultsContainer = document.getElementById("user-list-container");
        if (!resultsContainer) return;
      
        resultsContainer.innerHTML = ""; // Clear previous results
      
        users.forEach((user) => {
          const userDiv = document.createElement("div");
          userDiv.classList.add("user-row");
      
          // Create avatar image element
          const avatarImg = document.createElement("img");
        //   avatarImg.src = user.avatar || "images/default-avatar.png";
        if (user.avatar.startsWith("https://"))
        {
            avatarImg.src = user.avatar || "images/default-avatar.png";
            avatarImg.alt = user.username || "User Avatar";
            avatarImg.classList.add("user-avatar");
        }
        else
        {
            avatarImg.src = `https://127.0.0.1:8000${user.avatar}` || "images/default-avatar.png";
            console.log("avatar 1: " ,avatarImg.src);
            avatarImg.alt = user.username || "User Avatar";
        //   avatarImg.classList.add("user-avatar");
        }
        
          // Create username element
          const usernameSpan = document.createElement("span");
          usernameSpan.classList.add("username");
          usernameSpan.textContent = user.username || "Unknown";

            // Create Invite Button
          const inviteButton = document.createElement("button");
          inviteButton.textContent = "Invite";
          inviteButton.classList.add("invite-button");
          inviteButton.onclick = () => sendFriendRequest(user.id); // Attach click event
      
        // Append elements to the user row
          userDiv.appendChild(avatarImg);
          userDiv.appendChild(usernameSpan);
          userDiv.appendChild(inviteButton);
      
          // Append the user row to the results container
          resultsContainer.appendChild(userDiv);
        });
      }

    async function fetchAndDisplayUsers() {
        try {
            const response = await fetch("https://127.0.0.1:8000/users/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            }
          });
      
          if (!response.ok) {
            console.error("Failed to fetch users. Status:", response.status);
            return;
          }
      
          const data = await response.json();
          let userList = [];
          if (data.data && Array.isArray(data.data)) {
            // Map each item to include its attributes plus its id
            userList = data.data.map(item => Object.assign({}, item.attributes, { id: item.id }));
          } else {
            console.error("Unexpected response format:", data);
            return;
          }
      
          // Exclude the current user (if user_id is stored)
          const currentUserId = localStorage.getItem("user_id");
          console.log("Current User ID:", currentUserId);
          if (currentUserId) {
            userList = userList.filter(user => parseInt(user.id) !== parseInt(currentUserId));
          }
      
          // Save the full list globally
          allUsers = userList;
          shuffleArray(userList);

          // Display only the first 5 users
          const limitedUsers = userList.slice(0, 6);
          displayUserSearchResults(limitedUsers);
        } catch (error) {
          console.error("Error fetching all users:", error);
        }
      }

      async function searchAndDisplayUsers(query) {
        // If allUsers isn't loaded yet, fetch it first
        if (!allUsers.length) {
          await fetchAndDisplayUsers();
        }
        // Filter allUsers by username (case-insensitive)
        const filteredUsers = allUsers.filter(user =>
          user.username.toLowerCase().includes(query.toLowerCase())
        );
        // Limit the results to 5
        // const limitedFiltered = filteredUsers.slice(0, 5);
        displayUserSearchResults(filteredUsers);
      }

    ////////////////////////////edit profile/////////////////////////////


    function initializeProfileEdit() {
        const editProfileButton = document.getElementById('edit-p-btn');
        if (editProfileButton) {
            editProfileButton.addEventListener('click', openEditProfileModal);
        }
    }
    
    function openEditProfileModal() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'edit-profile-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '1000';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
    
        // Create modal container
        const modal = document.createElement('div');
        modal.id = 'edit-profile-modal';
        modal.style.backgroundColor = '#fff';
        modal.style.padding = '25px';
        modal.style.borderRadius = '12px';
        modal.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        modal.style.width = '350px';
        modal.style.maxWidth = '90%';
        modal.style.fontFamily = "'Poppins', sans-serif";
        modal.style.transform = 'scale(0.9)';
        modal.style.opacity = '0';
        modal.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    
        // Title
        const title = document.createElement('h3');
        title.innerText = 'Edit Profile';
        title.style.margin = '0 0 20px';
        title.style.fontSize = '24px';
        title.style.color = '#333';
        title.style.textAlign = 'center';
    
        // Form container
        const form = document.createElement('form');
        form.id = 'edit-profile-form';
    
        // Username input
        const usernameLabel = document.createElement('label');
        usernameLabel.innerText = 'Username';
        usernameLabel.style.display = 'block';
        usernameLabel.style.marginBottom = '5px';
        usernameLabel.style.fontSize = '14px';
        usernameLabel.style.color = '#555';
    
        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.id = 'edit-username';
        usernameInput.value = document.getElementById('profile-username').innerText || '';
        usernameInput.style.width = '100%';
        usernameInput.style.padding = '10px';
        usernameInput.style.marginBottom = '15px';
        usernameInput.style.border = '1px solid #ddd';
        usernameInput.style.borderRadius = '6px';
        usernameInput.style.fontSize = '16px';
        usernameInput.style.boxSizing = 'border-box';
        usernameInput.style.transition = 'border-color 0.3s ease';
    
        // Avatar preview
        const avatarPreviewLabel = document.createElement('label');
        avatarPreviewLabel.innerText = 'Current Avatar';
        avatarPreviewLabel.style.display = 'block';
        avatarPreviewLabel.style.marginBottom = '10px';
        avatarPreviewLabel.style.fontSize = '14px';
        avatarPreviewLabel.style.color = '#555';
    
        const avatarPreview = document.createElement('img');
        avatarPreview.id = 'avatar-preview';
        avatarPreview.src = document.getElementById('profile-img').src || 'images/default-avatar.png';
        avatarPreview.style.width = '100px';
        avatarPreview.style.height = '100px';
        avatarPreview.style.borderRadius = '50%';
        avatarPreview.style.objectFit = 'cover';
        avatarPreview.style.marginBottom = '15px';
        avatarPreview.style.display = 'block';
        avatarPreview.style.marginLeft = 'auto';
        avatarPreview.style.marginRight = 'auto';
    
        // Avatar file input
        const avatarLabel = document.createElement('label');
        avatarLabel.innerText = 'Upload New Avatar';
        avatarLabel.style.display = 'block';
        avatarLabel.style.marginBottom = '5px';
        avatarLabel.style.fontSize = '14px';
        avatarLabel.style.color = '#555';
    
        const avatarInput = document.createElement('input');
        avatarInput.type = 'file';
        avatarInput.id = 'edit-avatar';
        avatarInput.accept = 'image/*'; // Restrict to images
        avatarInput.style.width = '100%';
        avatarInput.style.padding = '5px';
        avatarInput.style.marginBottom = '20px';
        avatarInput.style.fontSize = '14px';
    
        // Buttons container
        const buttonsDiv = document.createElement('div');
        buttonsDiv.style.display = 'flex';
        buttonsDiv.style.justifyContent = 'space-between';
    
        const saveButton = document.createElement('button');
        saveButton.innerText = 'Save';
        saveButton.type = 'button';
        saveButton.style.padding = '10px 20px';
        saveButton.style.backgroundColor = '#28a745';
        saveButton.style.color = 'white';
        saveButton.style.border = 'none';
        saveButton.style.borderRadius = '6px';
        saveButton.style.cursor = 'pointer';
        saveButton.style.fontSize = '16px';
        saveButton.style.transition = 'background-color 0.3s ease';
    
        const cancelButton = document.createElement('button');
        cancelButton.innerText = 'Cancel';
        cancelButton.type = 'button';
        cancelButton.style.padding = '10px 20px';
        cancelButton.style.backgroundColor = '#dc3545';
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '6px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.fontSize = '16px';
        cancelButton.style.transition = 'background-color 0.3s ease';
    
        // Append elements
        form.appendChild(usernameLabel);
        form.appendChild(usernameInput);
        form.appendChild(avatarPreviewLabel);
        form.appendChild(avatarPreview);
        form.appendChild(avatarLabel);
        form.appendChild(avatarInput);
        buttonsDiv.appendChild(saveButton);
        buttonsDiv.appendChild(cancelButton);
        form.appendChild(buttonsDiv);
        modal.appendChild(title);
        modal.appendChild(form);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    
        // Animation trigger
        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 10);
    
        // Input hover/focus effects
        usernameInput.addEventListener('focus', () => {
            usernameInput.style.borderColor = '#28a745';
        });
        usernameInput.addEventListener('blur', () => {
            usernameInput.style.borderColor = '#ddd';
        });
    
        // Preview avatar when file is selected
        avatarInput.addEventListener('change', () => {
            const file = avatarInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    avatarPreview.src = e.target.result; // Live preview
                };
                reader.readAsDataURL(file);
            }
        });
    
        // Button hover effects
        saveButton.addEventListener('mouseover', () => {
            saveButton.style.backgroundColor = '#218838';
        });
        saveButton.addEventListener('mouseout', () => {
            saveButton.style.backgroundColor = '#28a745';
        });
        cancelButton.addEventListener('mouseover', () => {
            cancelButton.style.backgroundColor = '#c82333';
        });
        cancelButton.addEventListener('mouseout', () => {
            cancelButton.style.backgroundColor = '#dc3545';
        });
    
        // Cancel: Fade out and remove
        cancelButton.addEventListener('click', () => {
            overlay.style.opacity = '0';
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            setTimeout(() => document.body.removeChild(overlay), 300);
        });
    
        // Save: Upload file and update profile
        saveButton.addEventListener('click', async () => {
            const newUsername = usernameInput.value.trim();
            console.log("New username:", newUsername);
            const file = avatarInput.files[0];
        
            if (!newUsername) {
                usernameInput.value = document.getElementById('profile-username').innerText;
                return;
            }
        
            try {
                const token = localStorage.getItem('authToken');
                const formData = new FormData();
                formData.append('username', newUsername); // Match backend field
                if (file) {
                    formData.append('avatar', file);
                }
        
                const response = await fetch('https://127.0.0.1:8000/profile/update/', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });
        
                console.log("Response status:", response.status);
                const result = await response.json();
                console.log("PUT Response Data:", result);
        
                if (response.ok) {
                    // Update username
                    document.getElementById('profile-username').innerText = newUsername;
                    loadProfileInfo();
                    alert("Profile updated successfully!");
                    // Sync with backend
                }
                else
                {
                    console.error("Server error:", result);
                    alert("Failed to update profile: " + JSON.stringify(result));
                }
            } catch (error) {
                console.error("Error updating profile:", error);
                alert("Error updating profile. Please try again.");
            }
        
            overlay.style.opacity = '0';
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            setTimeout(() => document.body.removeChild(overlay), 300);
        });
    }
      /////////////////////////////chat////////////////////////////////////
      
      document.querySelectorAll('.user').forEach(userElem => {
          userElem.addEventListener('click', () => {
              const userId = userElem.getAttribute('data-user-id');
              // Call your switchConversation function with the user ID or name
              switchConversation(userId);
          });
      });


      async function initializechatFunctionality() {
        const sendButton = document.getElementById('send-btn');
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');
        const emojiPicker = document.getElementById('emojiPicker');
        const emojiToggleButton = document.getElementById('emoji-toggle-btn');
        const chatHeader = document.getElementById('chat-header');
    
        let sender;
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error("No auth token found");
            const response = await fetch('https://127.0.0.1:8000/profile/', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error(`Profile fetch failed: ${response.status}`);
            const data = await response.json();
            sender = data.data?.attributes?.username || 'guest';
            console.log("Current user fetched:", sender);
        } catch (error) {
            console.error("Error fetching current user:", error);
            sender = 'guest';
        }
    
        let receiver = null;
        let chatSocket = null;
        let messageQueue = [];
        const conversations = JSON.parse(localStorage.getItem('conversations')) || {};
        // Store blocked users in localStorage
        let blockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || [];
    
        await fetchAndDisplayFriendschat();
        loadChatHistory();
    
        function connectWebSocket() {
            if (!receiver || !sender) {
                console.error("Receiver or sender not set. Cannot connect WebSocket.");
                return;
            }
            const users = [sender, receiver];
            const url = `wss://127.0.0.1:8000/ws/chat/${users[0]}/${users[1]}/`;
            console.log("Attempting to connect to WebSocket:", url);
    
            if (chatSocket && chatSocket.url === url && chatSocket.readyState === WebSocket.OPEN) {
                console.log("WebSocket already connected to this URL.");
                return;
            }
    
            if (chatSocket) {
                chatSocket.close(1000, "New connection starting");
                console.log("Closed previous WebSocket.");
            }
    
            chatSocket = new WebSocket(url);
    
            chatSocket.onopen = function() {
                console.log("WebSocket connected successfully.");
                while (messageQueue.length > 0) {
                    const message = messageQueue.shift();
                    if (!blockedUsers.includes(receiver.toLowerCase())) {
                        chatSocket.send(JSON.stringify({ "message": message }));
                    }
                }
            };
    
            chatSocket.onmessage = function(e) {
                const data = JSON.parse(e.data);
                console.log("Received data:", data);
                if (data.message) {
                    const timestamp = new Date().toLocaleTimeString();
                    const messageSender = data.sender === sender ? 'sender' : 'receiver';
                    // Check if the sender is blocked
                    if (blockedUsers.includes(data.sender.toLowerCase())) {
                        console.log(`Blocked message from ${data.sender} ignored.`);
                        return; // Ignore messages from blocked users
                    }
                    console.log(`Message from ${data.sender} to ${receiver}, displayed as ${messageSender}`);
                    if (!conversations[receiver]) conversations[receiver] = [];
                    const exists = conversations[receiver].some(msg => 
                        msg.text === data.message && msg.time === timestamp && msg.type === messageSender
                    );
                    if (!exists) {
                        conversations[receiver].push({ text: data.message, type: messageSender, time: timestamp });
                        localStorage.setItem('conversations', JSON.stringify(conversations));
                        displayMessage(data.message, messageSender, timestamp, data.sender);
                    }
                }
            };
    
            chatSocket.onerror = function(error) {
                console.error("WebSocket connection failed:", error);
            };
    
            chatSocket.onclose = function(event) {
                console.log("WebSocket closed. Code:", event.code, "Reason:", event.reason);
                if (event.code !== 1000) {
                    setTimeout(connectWebSocket, 2000);
                }
            };
        }
    
        function sendMessage() {
            const userMessage = chatInput.value.trim();
            if (!userMessage || !receiver || !chatSocket) {
                console.warn("Cannot send message. Missing:", { userMessage, receiver, chatSocket });
                return;
            }
    
            // Check if the receiver is blocked
            if (blockedUsers.includes(receiver.toLowerCase())) {
                alert(`You have blocked ${receiver}. You cannot send messages to blocked users.`);
                chatInput.value = '';
                return;
            }
    
            const timestamp = new Date().toLocaleTimeString();
            if (!conversations[receiver]) conversations[receiver] = [];
            conversations[receiver].push({ text: userMessage, type: 'sender', time: timestamp });
            localStorage.setItem('conversations', JSON.stringify(conversations));
            console.log(`Sending message from ${sender} to ${receiver}: ${userMessage}`);
            displayMessage(userMessage, 'sender', timestamp, sender);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
    
            if (chatSocket.readyState === WebSocket.OPEN) {
                chatSocket.send(JSON.stringify({ "message": userMessage }));
            } else {
                messageQueue.push(userMessage);
                console.log("WebSocket not open. Message queued:", userMessage);
            }
        }
    
        function displayMessage(message, senderType, timestamp, senderName) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', `${senderType}-message`);
    
            const senderSpan = document.createElement('span');
            senderSpan.classList.add('message-sender');
            senderSpan.textContent = senderType === 'sender' ? 'You' : senderName;
    
            const messageText = document.createElement('span');
            messageText.classList.add('message-text');
            messageText.textContent = message;
    
            const timeSpan = document.createElement('span');
            timeSpan.classList.add('message-time');
            timeSpan.textContent = timestamp;
    
            messageDiv.appendChild(senderSpan);
            messageDiv.appendChild(messageText);
            messageDiv.appendChild(timeSpan);
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    
        function loadChatHistory() {
            chatMessages.innerHTML = '';
            if (conversations[receiver]) {
                conversations[receiver].forEach(({ text, type, time }) => {
                    const senderName = type === 'sender' ? sender : receiver;
                    // Filter out messages from blocked users
                    if (!blockedUsers.includes(senderName.toLowerCase())) {
                        displayMessage(text, type, time, senderName);
                    }
                });
            }
        }
    
        function switchConversation(newReceiver) {
            if (receiver === newReceiver) return;
            const friendList = Array.from(document.querySelectorAll("#chat-friend-list .user"))
                .map(div => div.getAttribute("data-friend-name"));
            if (!friendList.includes(newReceiver)) {
                console.warn(`${newReceiver} is not a friend. Cannot start chat.`);
                return;
            }
            receiver = newReceiver;
            chatHeader.textContent = `Chat with ${receiver}`;
            connectWebSocket();
            loadChatHistory();
        }
    
        async function getCurrentUsername(token) {
            try {
                const response = await fetch('https://127.0.0.1:8000/profile/', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    return data.data?.attributes?.username || null;
                }
                return null;
            } catch (error) {
                console.error("Error fetching current username:", error);
                return null;
            }
        }
        async function fetchAndDisplayFriendschat() {
            try {
                const response = await fetch("https://127.0.0.1:8000/friends/list/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
        
                if (!response.ok) {
                    console.error("Failed to fetch friend list. Status:", response.status);
                    return;
                }
        
                const data = await response.json();
                console.log("Friend list API response:", data);
        
                let friendList = [];
                if (data.data && Array.isArray(data.data)) {
                    friendList = data.data.map(item => Object.assign({}, item.attributes, { id: item.id }));
                } else {
                    console.error("Unexpected response format for friend list:", data);
                    return;
                }
        
                const friendListContainer = document.getElementById("chat-friend-list");
                if (!friendListContainer) {
                    console.error("Chat friend list container not found.");
                    return;
                }
        
                friendListContainer.innerHTML = ""; // Clear previous content
                let friendsSocket = null;

                const initializeFriendsWebSocket = () => {
                    const token = localStorage.getItem("authToken");
                    if (!token) {
                        console.error("No auth token available.");
                        navigateTo('#/sign-in');
                        return;
                    }

                    friendsSocket = new WebSocket('wss://127.0.0.1:8000/ws/friends/');
                    friendsSocket.onopen = () => {
                        console.log("Friends WebSocket connected");
                        friendsSocket.send(JSON.stringify({
                            action: "authenticate",
                            authToken: token,
                        }));
                    };

                    friendsSocket.onmessage = (event) => {
                        const data = JSON.parse(event.data);
                        switch (data.type) {
                            case "invite_received":
                                if (confirm(`${data.inviter} has invited you to a Pong match. Accept?`)) {
                                    friendsSocket.send(JSON.stringify({
                                        action: "accept_invite",
                                        inviter: data.inviter,
                                    }));
                                }
                                break;
                            case "match_found":
                                startPrivateMatch(data);
                                break;
                            case "invite_sent":
                                console.log(data.message);
                                break;
                            case "waiting":
                                console.log(data.message);
                                break;
                            case "error":
                                console.error(data.message);
                                if (data.message === "Authentication required") {
                                    navigateTo('#/sign-in');
                                }
                                break;
                        }
                    };

                    friendsSocket.onerror = (error) => console.error("Friends WebSocket error:", error);
                    friendsSocket.onclose = (event) => {
                        console.log("Friends WebSocket closed:", event.code, event.reason);
                        if (event.code !== 1000) setTimeout(initializeFriendsWebSocket, 2000);
                    };
                };
                initializeFriendsWebSocket();
                function startPrivateMatch(data) {
                    // navigateTo('#/game');
                    // const app = document.getElementById('app');
                    app.innerHTML = pages.game_v2;
                    setCurrentGame(new PongGame('friends', data.player1_id === localStorage.getItem('user_id') ? data.player2_id : data.player1_id));
                    currentGame.gameGroupName = data.game_group_name;
                    currentGame.player1Id = data.player1_id;
                    currentGame.player2Id = data.player2_id;
                    currentGame.setupFriendsMatchWebSocket();
                }
                if (friendList.length === 0) {
                    const noFriendsMessage = document.createElement("div");
                    noFriendsMessage.classList.add("no-friends");
                    noFriendsMessage.textContent = "No friends found.";
                    friendListContainer.appendChild(noFriendsMessage);
                } else {
                    friendList.forEach(friend => {
                        const friendDiv = document.createElement("div");
                        friendDiv.classList.add("user");
                        friendDiv.setAttribute("data-friend-id", friend.id);
                        friendDiv.setAttribute("data-friend-name", friend.username);
                        friendDiv.addEventListener("click", () => switchConversation(friend.username));
        
                        const iconDiv = document.createElement("div");
                        iconDiv.classList.add("icon");
                        const avatarImg = document.createElement("img");
                        if (friend.avatar.startsWith("https://")) {
                            avatarImg.src = friend.avatar || "images/default-avatar.png";
                        } else {
                            avatarImg.src = `https://127.0.0.1:8000${friend.avatar}` || "images/default-avatar.png";
                        }
                        avatarImg.alt = friend.username || "Friend Avatar";
                        iconDiv.appendChild(avatarImg);
        
                        const nameDiv = document.createElement("div");
                        nameDiv.textContent = friend.username || "Unknown";
        
                        const viewProfileButton = document.createElement("button");
                        viewProfileButton.textContent = "Profile";
                        viewProfileButton.classList.add("view-profile-btn");
                        viewProfileButton.addEventListener("click", (e) => {
                            e.stopPropagation();
                            showFriendProfile(friend.username, friend.id, friend.avatar);
                        });
        
                        const blockButton = document.createElement("button");
                        blockButton.textContent = blockedUsers.includes(friend.username.toLowerCase()) ? "Unblock" : "Block";
                        blockButton.classList.add("block-user-btn");
                        blockButton.addEventListener("click", (e) => {
                            e.stopPropagation();
                            toggleBlockUser(friend.username);
                        });
                        const inviteGameButton = document.createElement("button");
                        inviteGameButton.textContent = "Invite to Game";
                        inviteGameButton.classList.add("invite-game-btn");
                        inviteGameButton.addEventListener("click", (e) => {
                            e.stopPropagation();
                            if (friendsSocket && friendsSocket.readyState === WebSocket.OPEN) {
                                friendsSocket.send(JSON.stringify({
                                    action: "invite_friend",
                                    friend_username: friend.username,
                                }));
                            } else {
                                console.error("Friends WebSocket not connected");
                                alert("Unable to send invite. Please wait or refresh.");
                            }
                        });
                        
                        
                        //     // Display a message in the sender's chat
                        //     const chatMessages = document.getElementById('chat-messages');
                        //     if (chatMessages) {
                        //         displayMessage(`Started game with ${friend.username}! Waiting for them to join...`, 'sender', new Date().toLocaleTimeString(), sender, chatMessages);
                        //     } else {
                        //         console.warn("chatMessages not found for sender, creating placeholder");
                        //         const placeholder = document.createElement('div');
                        //         placeholder.id = 'chat-messages';
                        //         document.querySelector('.chat-panel').appendChild(placeholder); // Adjust selector if needed
                        //         displayMessage(`Started game with ${friend.username}! Waiting for them to join...`, 'sender', new Date().toLocaleTimeString(), sender, placeholder);
                        //     }
        
                        //     // Display an invitation message in the receiver's chat (simulated client-side)
                        //     // displayInviteMessage(sender, friend.username);
                        // });
        
                        friendDiv.appendChild(iconDiv);
                        friendDiv.appendChild(nameDiv);
                        friendDiv.appendChild(viewProfileButton);
                        friendDiv.appendChild(blockButton);
                        // friendDiv.appendChild(inviteGameButton);
                        friendDiv.appendChild(inviteGameButton);
                        friendListContainer.appendChild(friendDiv);
                    });
                }
            } catch (error) {
                console.error("Error fetching friend list:", error);
            }
        }
    
        async function showFriendProfile(username, userId, avatarUrl) {
            try {
                const token = localStorage.getItem('authToken');
                // Fetch friend's basic profile from FriendListView
                const friendResponse = await fetch(`https://127.0.0.1:8000/friends/list/`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
        
                if (!friendResponse.ok) {
                    console.error("Failed to fetch friend list for profile. Status:", friendResponse.status);
                    alert("Failed to load profile. Please try again.");
                    return;
                }
        
                const friendData = await friendResponse.json();
                const friend = friendData.data.find(item => item.attributes.username === username || item.id === userId);
                if (!friend) {
                    console.error("Friend not found in list:", username, userId);
                    alert("Friend profile not found. Please try again.");
                    return;
                }
        
                const profile = friend.attributes || {};
        
                // Fetch the authenticated user's match history
                const matchResponse = await fetch('https://127.0.0.1:8000/match-history/', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
        
                let wins = 0;
                let losses = 0;
        
                if (matchResponse.ok) {
                    const matchData = await matchResponse.json();
                    // Filter matches where the friend is a participant
                    const friendMatches = matchData.match_history.filter(match => 
                        match.player1_username === username || match.player2_username === username
                    );
        
                    if (friendMatches.length > 0) {
                        const stats = calculateWinsAndLosses(friendMatches, username);
                        wins = stats.wins;
                        losses = stats.losses;
                    } else {
                        console.warn(`No matches found involving ${username} in your match history.`);
                    }
                } else {
                    console.warn("Failed to fetch match history. Displaying default values.");
                }
        
                // Create overlay for the profile modal
                const overlay = document.createElement('div');
                overlay.id = 'profile-overlay';
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                overlay.style.display = 'flex';
                overlay.style.alignItems = 'center';
                overlay.style.justifyContent = 'center';
                overlay.style.zIndex = '1001';
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.3s ease';
        
                // Create modal container
                const modal = document.createElement('div');
                modal.id = 'friend-profile-modal';
                modal.style.backgroundColor = '#fff';
                modal.style.padding = '20px';
                modal.style.borderRadius = '12px';
                modal.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                modal.style.width = '300px';
                modal.style.maxWidth = '90%';
                modal.style.fontFamily = "'Poppins', sans-serif";
                modal.style.transform = 'scale(0.9)';
                modal.style.opacity = '0';
                modal.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        
                // Profile content with wins and losses
                const profileContent = `
                    <h3 style="margin: 0 0 15px; font-size: 20px; color: #333; text-align: center;">${profile.username || username}'s Profile</h3>
                    <div style="text-align: center;">
                        <img src="${avatarUrl || profile.avatar || 'images/default-avatar.png'}" alt="${profile.username || username}'s Avatar" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 15px;">
                        <p style="font-size: 16px; color: #555; margin: 0;">Username: ${profile.username || username}</p>
                        <p style="font-size: 16px; color: #888; margin: 5px 0;">Wins: <span id="profile-wins">${wins}</span></p>
                        <p style="font-size: 16px; color: #888; margin: 5px 0;">Losses: <span id="profile-losses">${losses}</span></p>
                        <p style="font-size: 12px; color: #aaa; margin: 5px 0;">(Based on matches against you)</p>
                    </div>
                `;
        
                modal.innerHTML = profileContent;
        
                // Close button
                const closeButton = document.createElement('button');
                closeButton.innerText = 'Close';
                closeButton.style.padding = '8px 16px';
                closeButton.style.backgroundColor = '#dc3545';
                closeButton.style.color = 'white';
                closeButton.style.border = 'none';
                closeButton.style.borderRadius = '6px';
                closeButton.style.cursor = 'pointer';
                closeButton.style.fontSize = '14px';
                closeButton.style.marginTop = '15px';
                closeButton.style.display = 'block';
                closeButton.style.marginLeft = 'auto';
                closeButton.style.marginRight = 'auto';
                closeButton.addEventListener('click', () => {
                    overlay.style.opacity = '0';
                    modal.style.opacity = '0';
                    modal.style.transform = 'scale(0.9)';
                    setTimeout(() => document.body.removeChild(overlay), 300);
                });
        
                modal.appendChild(closeButton);
                overlay.appendChild(modal);
                document.body.appendChild(overlay);
        
                // Animation trigger
                setTimeout(() => {
                    overlay.style.opacity = '1';
                    modal.style.opacity = '1';
                    modal.style.transform = 'scale(1)';
                }, 10);
        
                // Close on overlay click (outside modal)
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        overlay.style.opacity = '0';
                        modal.style.opacity = '0';
                        modal.style.transform = 'scale(0.9)';
                        setTimeout(() => document.body.removeChild(overlay), 300);
                    }
                });
            } catch (error) {
                console.error("Error fetching friend profile:", error);
                alert("Error loading profile. Please try again.");
            }
        }
        
        // Ensure this function is available globally or within scope
        function calculateWinsAndLosses(matches, username) {
            let wins = 0;
            let losses = 0;
        
            matches.forEach(match => {
                const isPlayer1 = match.player1_username === username;
                const userScore = isPlayer1 ? match.score1 : match.score2;
                const opponentScore = isPlayer1 ? match.score2 : match.score1;
        
                if (userScore > opponentScore) {
                    wins++;
                } else if (userScore < opponentScore) {
                    losses++;
                }
            });
        
            return { wins, losses };
        }
    
        async function addEmoji(emoji) {
            chatInput.value += emoji; // Append emoji to input field
            chatInput.focus(); // Keep focus on input
            emojiPicker.style.display = 'none'; // Hide picker after selection
        }

        async function toggleBlockUser(username) {
            try {
                const normalizedUsername = username.toLowerCase();
                const isBlocked = blockedUsers.includes(normalizedUsername);
    
                if (isBlocked) {
                    // Unblock the user
                    blockedUsers = blockedUsers.filter(user => user !== normalizedUsername);
                    console.log(`Unblocked user: ${username}`);
                    alert(`You have unblocked ${username}.`);
                } else {
                    // Block the user
                    blockedUsers.push(normalizedUsername);
                    console.log(`Blocked user: ${username}`);
                    alert(`You have blocked ${username}. They will no longer be able to send or receive messages from you.`);
                }
    
                localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
                // Refresh the friend list to update the block button text
                await fetchAndDisplayFriendschat();
                // If the blocked user is the current receiver, reset the chat
                if (receiver === username) {
                    receiver = null;
                    chatHeader.textContent = "Select a friend to start chatting";
                    chatMessages.innerHTML = "";
                    if (chatSocket) {
                        chatSocket.close(1000, "Blocked user, closing chat");
                        chatSocket = null;
                    }
                }
            } catch (error) {
                console.error("Error toggling block status:", error);
                alert("Error updating block status. Please try again.");
            }
        }

        emojiToggleButton.addEventListener('click', () => {
            emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block';
        });
    
        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
                event.preventDefault();
            }
        });
    
        window.switchConversation = switchConversation;
    
        function makeRequest() {
            const now = Date.now();
            if (now - lastRequestTime > 10000) {
                if (flag === 0) {
                    flag = 1;
                }
                connectWebSocket();
                lastRequestTime = now;
            }
        }
    }

    //////////////////////////edit profile/////////////////////////////
      
    // Load the initial page
    preloadStylesheet('dashboard.css'); // Dashboard CSS
    preloadStylesheet('profile.css'); // Profile page CSS
    preloadStylesheet('assets/bootstrap.min.css'); // Bootstrap CSS
    // preloadStylesheet('styleGame.css'); // Game page CSS (if applicable)
    loadCSS('chat.css'); // Load the dashboard CSS

    const initialRoute = window.location.hash || '#/sign-in';
    renderPage(initialRoute);

    window.addEventListener('popstate', () => {
        renderPage(window.location.hash);
    });

});
