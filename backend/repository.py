from models import *
from memory_repository import *
from preset import init_memory_repository

# Data storage.
data = MemoryRepository(Game)
init_memory_repository(data)