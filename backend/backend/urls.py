from django.urls import include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib import admin
from django.urls import path
from api.views import RegisterUserView, LogoutView

urlpatterns = [
    path("api/", include("api.urls")),
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/user/register/", RegisterUserView.as_view(), name="register"),
    path("api/logout/", LogoutView.as_view(), name="logout"),
]
