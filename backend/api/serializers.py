from rest_framework import serializers
from .models import Role, Location, User, Issue, Comment


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
        model = User
        fields = [
            "id",
            "username",
            "password",
            "email",
            "role",
            "location",
            "joined_at",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


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
