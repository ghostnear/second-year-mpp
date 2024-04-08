from flask import Flask, jsonify
from flask_restful import Api, Resource, request
from memory_repository import *
from models import *
from preset import init_memory_repository
from config import *

app = Flask(__name__)
api = Api(app)

# Data storage.
data = MemoryRepository(Game)
init_memory_repository(data)

# This is the resource that will be used to get multiple games.
class GameListResource(Resource):
	def post(self):
		args = gameParser.parse_args()
		return jsonify(data.insert(Game(args['title'], args['description'], args['release_year'])).serialize())

	# Paged get.
	def get(self):
		# Get page size from request.
		pageSize = int(request.args["pageSize"]) if "pageSize" in request.args else DEFAULT_PAGE_SIZE
		pageSize = min(MAX_PAGE_SIZE, pageSize)

		# Get page offset from request.
		pageOffset = int(request.args["pageOffset"]) if "pageOffset" in request.args else 0

		return jsonify([e.serialize() for e in data.get_paged(size=pageSize, offset=pageOffset)])

api.add_resource(GameListResource, '/games')

# App wrapper.
if __name__ == '__main__':
    app.run(debug=True, port=5000)