import unittest

from flask import Flask
from flask_restful import Api

from repository import data
from resources import *

class TestRepository(unittest.TestCase):
    # Backend CRUD.
    def test_add_to_repo(self):
        data.clear()
        data.insert(Game("Test game 1", "Description 1", 2000))
        data.insert(Game("Test game 2", "Description 2", 2001))
        unittest.TestCase.assertEqual(self, len(data.get_all()), 2)

    def test_remove_from_repo(self):
        data.clear()
        data.insert(Game("Test game 1", "Description 1", 2000))
        data.insert(Game("Test game 2", "Description 2", 2001))
        data.remove(1)
        unittest.TestCase.assertEqual(self, len(data.get_all()), 1)
        unittest.TestCase.assertEqual(self, data.get(1), None)

    def test_update_repo(self):
        data.clear()
        data.insert(Game("Test game 1", "Description 1", 2000))
        data.update(1, Game("Test game 1 updated", "Description 1 updated", 2000))
        game = data.get(1)
        unittest.TestCase.assertEqual(self, game.title, "Test game 1 updated")
        unittest.TestCase.assertEqual(self, game.description, "Description 1 updated")

# Service CRUD tests.
class TestService(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.api = Api(self.app)

        self.api.add_resource(GameListResource, '/games/')
        self.api.add_resource(GameResource, '/game/<id>')

    def test_get_all_games(self):
        self.setUp()
        data.clear()
        with self.app.test_client() as client:
            response = client.get('/games/')
            unittest.TestCase.assertEqual(self, response.status_code, 200)
            unittest.TestCase.assertEqual(self, response.json, [])

    def test_add_game(self):
        self.setUp()
        data.clear()
        with self.app.test_client() as client:
            response = client.post('/games/', json={"title": "Test game", "description": "Description", "release_year": 2000})
            unittest.TestCase.assertEqual(self, response.status_code, 200)
            unittest.TestCase.assertEqual(self, len(data.get_all()), 1)

    def test_get_game(self):
        data.insert(Game("Test game", "Description", 2000))
        with self.app.test_client() as client:
            response = client.get('/game/1')
            unittest.TestCase.assertEqual(self, response.status_code, 200)
            unittest.TestCase.assertEqual(self, response.json, {"id": 1, "title": "Test game", "description": "Description", "release_year": 2000})

    def test_update_game(self):
        data.insert(Game("Test game", "Description", 2000))
        with self.app.test_client() as client:
            response = client.put('/game/1', json={"title": "Test game updated", "description": "Description updated", "release_year": 2000})
            unittest.TestCase.assertEqual(self, response.status_code, 200)
            game = data.get(1)
            unittest.TestCase.assertEqual(self, game.title, "Test game updated")
            unittest.TestCase.assertEqual(self, game.description, "Description updated")

    def test_delete_game(self):
        with self.app.test_client() as client:
            response = client.delete('/game/1')
            unittest.TestCase.assertEqual(self, response.status_code, 200)
            unittest.TestCase.assertEqual(self, len(data.get_all()), 0)

if __name__ == "__main__":
    unittest.main()