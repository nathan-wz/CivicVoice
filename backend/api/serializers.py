from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from .models import Role, Location, User, Issue, Comment, Announcement


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
        fields = [
            "id",
            "user",
            "title",
            "description",
            "category",
            "status",
            "created_at",
            "updated_at",
            "vote_count",
            "affected_locations",
        ]


class AnnouncementSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Announcement
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    model = serializers.CharField(write_only=True, required=False)
    object_id = serializers.IntegerField(required=False)
    user = serializers.StringRelatedField(read_only=True)
    parent_comment = serializers.PrimaryKeyRelatedField(
        queryset=Comment.objects.all(), required=False, allow_null=True
    )
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            "id",
            "user",
            "content",
            "created_at",
            "object_id",
            "model",
            "parent_comment",
            "replies",
        ]

    def validate(self, data):
        parent_comment = data.get("parent_comment", None)

        # If this is a reply, skip object/model validation
        if parent_comment:
            data["content_type"] = parent_comment.content_type
            data["object_id"] = parent_comment.object_id
            return data

        # For top-level comments
        model_name = data.get("model")
        obj_id = data.get("object_id")

        if not model_name:
            raise serializers.ValidationError({"model": "This field is required."})

        model_class = {"issue": Issue, "announcement": Announcement}.get(
            model_name.lower()
        )
        if not model_class:
            raise serializers.ValidationError({"model": "Invalid model name."})

        try:
            content_type = ContentType.objects.get_for_model(model_class)
            model_class.objects.get(pk=obj_id)
        except ContentType.DoesNotExist:
            raise serializers.ValidationError({"model": "Could not find model."})
        except model_class.DoesNotExist:
            raise serializers.ValidationError(
                {
                    "object_id": f"{model_class.__name__} with id {obj_id} does not exist."
                }
            )

        data["content_type"] = content_type
        return data

    def create(self, validated_data):
        validated_data.pop("model", None)  # Remove model after validating
        return super().create(validated_data)

    def get_replies(self, obj):
        replies = obj.replies.all().order_by("created_at")
        return CommentSerializer(replies, many=True, context=self.context).data
