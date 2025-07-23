from rest_framework import serializers
from .models import Role, Location, User, Issue, Comment
from django.contrib.auth import get_user_model


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    location = LocationSerializer(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ["id", "username", "email", "role", "location", "joined_at"]


class IssueSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    affected_locations = LocationSerializer(many=True, read_only=True)

    class Meta:
        model = Issue
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    issue = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"
