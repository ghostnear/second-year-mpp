import random
from flask_restful import reqparse
from flask_sqlalchemy import SQLAlchemy
from faker import Faker

db = SQLAlchemy()

fakeGameGenerator = Faker()

class Game(db.Model):
    __tablename__ = 'db_game'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    year = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "release_year": self.year
        }
    
    def deep_copy(self, other):
        self.id = other.id
        self.title = other.title
        self.description = other.description
        self.release_year = other.year

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