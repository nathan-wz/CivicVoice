# tests.py
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Role, Country, City, County, User, Issue, Comment, Announcement

UserModel = get_user_model()


class SetupMixin(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.role = Role.objects.create(name="Citizen")
        self.country = Country.objects.create(name="Kenya")
        self.city = City.objects.create(name="Nairobi", country=self.country)
        self.county = County.objects.create(name="Westlands", city=self.city)
        self.user = UserModel.objects.create_user(
            username="testuser",
            password="password123",
            email="test@example.com",
            role=self.role,
            country=self.country,
            city=self.city,
            county=self.county,
        )
        self.client.force_authenticate(user=self.user)


class ModelTestCase(SetupMixin):
    def test_role_str(self):
        self.assertEqual(str(self.role), "Citizen")

    def test_country_str(self):
        self.assertEqual(str(self.country), "Kenya")

    def test_city_str(self):
        self.assertEqual(str(self.city), "Nairobi")

    def test_county_str(self):
        self.assertEqual(str(self.county), "Westlands")

    def test_user_str(self):
        self.assertEqual(str(self.user), "testuser")


class UserAPITestCase(SetupMixin):
    def test_user_creation(self):
        url = reverse("user-list")
        data = {
            "username": "newuser",
            "password": "pass1234",
            "email": "new@example.com",
            "role": self.role.id,
            "country_id": self.country.id,
            "city_id": self.city.id,
            "county_id": self.county.id,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserModel.objects.count(), 2)
        self.assertEqual(
            UserModel.objects.get(username="newuser").email, "new@example.com"
        )


class IssueAPITestCase(SetupMixin):
    def test_create_issue(self):
        url = reverse("issue-list")
        data = {
            "title": "Pothole on road",
            "description": "There is a huge pothole on the main street",
            "category": "Infrastructure",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Issue.objects.count(), 1)
        self.assertEqual(Issue.objects.get().title, "Pothole on road")


class CommentAPITestCase(SetupMixin):
    def test_create_comment_on_issue(self):
        issue = Issue.objects.create(
            user=self.user,
            title="Broken streetlight",
            description="Streetlight not working",
            category="Infrastructure",
        )
        url = reverse("comment-list")
        data = {
            "model": "issue",
            "object_id": issue.id,
            "content": "I also noticed this issue",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 1)
        self.assertEqual(Comment.objects.get().content, "I also noticed this issue")


class AnnouncementAPITestCase(SetupMixin):
    def test_create_announcement(self):
        url = reverse("announcement-list")
        data = {
            "title": "Water Supply Interruption",
            "description": "There will be no water supply tomorrow",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Announcement.objects.count(), 1)
        self.assertEqual(Announcement.objects.get().title, "Water Supply Interruption")
