import random
from flask_restful import reqparse
from faker import Faker

fakeGameGenerator = Faker()

class Game:
    def __init__(self, title, description, release_year):
        self.id = None                  # This is not set by the user, should be set at insertion.
        self.title = title
        self.description = description
        self.release_year = release_year

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "release_year": self.release_year
        }
    
    def deep_copy(self, other):
        self.id = other.id
        self.title = other.title
        self.description = other.description
        self.release_year = other.release_year

    def generate_fake():
        return Game(
            title=fakeGameGenerator.name(),
            description=fakeGameGenerator.text(),
            release_year=random.randint(1970, 2023)
        )
    
gameParser = reqparse.RequestParser()
gameParser.add_argument('title', type=str)
gameParser.add_argument('description', type=str)
gameParser.add_argument('release_year', type=int)