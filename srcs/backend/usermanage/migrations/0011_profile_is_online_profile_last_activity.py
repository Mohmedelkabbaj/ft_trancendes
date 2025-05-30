# Generated by Django 4.2 on 2025-03-06 23:58

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('usermanage', '0010_alter_profile_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='is_online',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='profile',
            name='last_activity',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
