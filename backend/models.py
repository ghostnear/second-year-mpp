import random
from typing import List
from flask_restful import reqparse
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, relationship, mapped_column
from faker import Faker

db = SQLAlchemy()

fakeGameGenerator = Faker()

class Game(db.Model):
    __tablename__ = 'db_game'
    id: Mapped[int] = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    favourited_by: Mapped[List["User"]] = relationship()

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
        self.year = other.year

    def generate_fake():
        return Game(
            title=fakeGameGenerator.name(),
            description=fakeGameGenerator.text(),
            year=random.randint(1970, 2023)
        )

class User(db.Model):
    __tablename__ = 'db_user'
    id: Mapped[int] = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    password = db.Column(db.String, nullable=False)
    favourite_game_id: Mapped[int] = mapped_column(ForeignKey("db_game.id"), nullable=True)
    favourite_game: Mapped["Game"] = relationship(back_populates="favourited_by")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "favourite_game": self.favourite_game.serialize() if self.favourite_game is not None else None
        }
    
    def deep_copy(self, other):
        self.id = other.id
        self.name = other.name
        self.password = other.password
        self.favourite_game_id = other.favourite_game_id
        self.favourite_game = other.favourite_game

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

userParser = reqparse.RequestParser()
userParser.add_argument('name', type=str)
userParser.add_argument('password', type=str)
userParser.add_argument('favourite_game', type=int, default=None, required=False)