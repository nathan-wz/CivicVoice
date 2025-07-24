from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RoleViewSet,
    LocationViewSet,
    UserViewSet,
    IssueViewSet,
    CommentViewSet,
    AnnouncementViewSet,
)

router = DefaultRouter()
router.register(r"roles", RoleViewSet)
router.register(r"locations", LocationViewSet)
router.register(r"users", UserViewSet)
router.register(r"issues", IssueViewSet)
router.register(r"announcements", AnnouncementViewSet)
router.register(r"comments", CommentViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
