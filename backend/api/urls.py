from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RoleViewSet,
    LocationViewSet,
    UserViewSet,
    IssuesViewSet,
    CommentViewSet,
)

router = DefaultRouter()
router.register(r"roles", RoleViewSet)
router.register(r"locations", LocationViewSet)
router.register(r"users", UserViewSet)
router.register(r"issues", IssuesViewSet)
router.register(r"comments", CommentViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
