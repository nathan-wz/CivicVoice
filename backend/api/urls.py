from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RoleViewSet,
    LocationViewSet,
    UserViewSet,
    IssuesViewSet,
    CommentViewSet,
    RegisterUserView,
)

router = DefaultRouter()
router.register(r"roles", RoleViewSet)
router.register(r"locations", LocationViewSet)
router.register(r"users", UserViewSet)
router.register(r"issues", IssuesViewSet)
router.register(r"comments", CommentViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/user/register/", RegisterUserView.as_view(), name="register"),
]
