from models import *
from memory_repository import *
from preset import init_repository_data

# Data storage.
data = MemoryRepository(Game)
init_repository_data(data)