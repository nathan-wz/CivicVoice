from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RoleViewSet,
    LocationViewSet,
    UserViewSet,
    IssueViewSet,
    CommentViewSet,
    AnnouncementViewSet,
    CountryListView,
    CityListView,
    CountyListView,
)

router = DefaultRouter()
router.register(r"roles", RoleViewSet)
router.register(r"users", UserViewSet)
router.register(r"issues", IssueViewSet)
router.register(r"announcements", AnnouncementViewSet)
router.register(r"comments", CommentViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("locations/countries/", CountryListView.as_view()),
    path("locations/cities/", CityListView.as_view()),
    path("locations/counties/", CountyListView.as_view()),
]
