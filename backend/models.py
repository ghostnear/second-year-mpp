from flask_restful import reqparse

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
    
gameParser = reqparse.RequestParser()
gameParser.add_argument('title', type=str)
gameParser.add_argument('description', type=str)
gameParser.add_argument('release_year', type=int)