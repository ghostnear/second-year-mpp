from flask import Flask
from flask_restful import Api
from resources import *

app = Flask(__name__)
api = Api(app)

api.add_resource(GameListResource, '/games/')
api.add_resource(GameResource, '/game/<id>')

# App wrapper.
if __name__ == '__main__':
    app.run(debug=True, port=5000)