from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.auth.models import AbstractUser, Group, Permission


class Role(models.Model):

    name = models.CharField(
        max_length=50,
        unique=True,
        help_text="The name of the role (e.g., 'Admin', 'Citizen')",
    )

    class Meta:
        verbose_name = "Role"
        verbose_name_plural = "Roles"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Location(models.Model):
    country = models.CharField(max_length=100, help_text="The country of the location")
    city = models.CharField(max_length=100, help_text="The city of the location")
    county = models.CharField(
        max_length=100, help_text="The county/region of the location"
    )

    class Meta:
        verbose_name = "Location"
        verbose_name_plural = "Locations"
        unique_together = ("country", "city", "county")
        ordering = ["country", "city", "county"]

    def __str__(self):
        return f"{self.city}, {self.county}, {self.country}"


class User(AbstractUser):

    groups = models.ManyToManyField(
        Group,
        verbose_name=("groups"),
        blank=True,
        help_text=(
            "The groups this user belongs to. A user will get all permissions "
            "granted to each of their groups."
        ),
        related_name="api_user_groups",  # <--- UNIQUE RELATED NAME
        related_query_name="api_user",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=("user permissions"),
        blank=True,
        help_text=("Specific permissions for this user."),
        related_name="api_user_permissions",  # <--- UNIQUE RELATED NAME
        related_query_name="api_user_permission",
    )

    role = models.ForeignKey(
        Role,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users",
        help_text="The role of the user within the platform",
    )
    location = models.ForeignKey(
        Location,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users",
        help_text="The geographical location of the user",
    )
    joined_at = models.DateTimeField(
        auto_now_add=True, help_text="The date and time the user joined"
    )

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["-joined_at"]

    def __str__(self):
        return self.username


class Issue(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="issues",
        help_text="The user who reported this issue",
    )
    title = models.CharField(max_length=255, help_text="A concise title for the issue")
    description = models.TextField(help_text="A detailed description of the issue")
    affected_locations = models.ManyToManyField(
        Location,
        related_name="issues_affected",
        blank=True,
        help_text="Locations affected by this issue",
    )
    category = models.CharField(
        max_length=100,
        help_text="The category of the issue (e.g., 'Infrastructure', 'Environment')",
    )
    created_at = models.DateTimeField(
        auto_now_add=True, help_text="The date and time the issue was created"
    )
    updated_at = models.DateTimeField(
        auto_now=True, help_text="The date and time the issue was last updated"
    )

    STATUS_CHOICES = [
        ("OPEN", "Open"),
        ("IN_PROGRESS", "In Progress"),
        ("RESOLVED", "Resolved"),
        ("CLOSED", "Closed"),
        ("ARCHIVED", "Archived"),
    ]
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="OPEN",
        help_text="The current status of the issue",
    )

    class Meta:
        verbose_name = "Issue"
        verbose_name_plural = "Issues"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    @property
    def vote_count(self):
        upvotes = self.votes.filter(is_upvote=True).count()
        downvotes = self.votes.filter(is_upvote=False).count()
        return upvotes - downvotes


class IssueVote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name="votes")
    is_upvote = models.BooleanField()

    class Meta:
        unique_together = ("user", "issue")  # one vote per user per issue


class Announcement(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="announcements",
        help_text="The user who posted this announcement",
    )
    title = models.CharField(max_length=255, help_text="The title of the announcement")
    description = models.TextField(help_text="The description of the announcement")
    issue_reference = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="The issue that is referenced in this announcement, if any",
    )

    created_at = models.DateTimeField(
        auto_now_add=True, help_text="The date and time the announcement was made"
    )

    class Meta:
        verbose_name = "Announcement"
        verbose_name_plural = "Announcements"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="comments",
        help_text="The user who posted this comment",
    )

    # Generic foriegn key setup
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text="The model type (Issue, Announcement, etc.)",
    )

    object_id = models.PositiveIntegerField(
        null=True, blank=True, help_text="The ID of the related object"
    )
    content_object = GenericForeignKey("content_type", "object_id")

    parent_comment = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="replies",
        help_text="The parent comment if this is a reply, otherwise null",
    )
    content = models.TextField(help_text="The content of the comment")
    created_at = models.DateTimeField(
        auto_now_add=True, help_text="The date and time the comment was created"
    )

    class Meta:
        verbose_name = "Comment"
        verbose_name_plural = "Comments"
        ordering = ["created_at"]

    def __str__(self):
        return (
            f"Comment by {self.user.username} on {self.content_type} '{self.object_id}'"
        )
