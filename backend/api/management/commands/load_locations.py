import json
import os
from django.core.management.base import BaseCommand
from api.models import Country, County, City  # Update with your app name


class Command(BaseCommand):
    help = "Loads location data from JSON file"

    def handle(self, *args, **kwargs):
        # Construct the path to the JSON file
        base_dir = os.path.dirname(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        )
        data_path = os.path.join(base_dir, "data", "east_africa_locations.json")

        with open(data_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        for country_name, cities in data.items():
            country, _ = Country.objects.get_or_create(name=country_name)
            for city_name, counties in cities.items():
                city, _ = City.objects.get_or_create(name=city_name, country=country)
                for county_name in counties:
                    County.objects.get_or_create(name=county_name, city=city)

        self.stdout.write(self.style.SUCCESS("Location data loaded from JSON."))
