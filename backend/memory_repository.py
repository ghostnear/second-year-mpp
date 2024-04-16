class MemoryRepository():
    def __init__(self, data_class):
        self.data = []
        self.next_id = 1
        self.data_class = data_class

    def clear(self):
        self.data = []
        self.next_id = 1

    def insert(self, obj):
        obj.id = self.next_id
        self.next_id += 1
        self.data.append(obj)
        return obj
    
    def has(self, id):
        for object in self.data:
            if object.id == id:
                return True
        return False
    
    def get(self, id):
        for object in self.data:
            if object.id == id:
                return object
        return None
    
    def remove(self, id):
        for object in self.data:
            if object.id == id:
                self.data.remove(object)
                return
            
    def update(self, id, newInstance):
        newInstance.id = id
        for object in self.data:
            if object.id == newInstance.id:
                object.deep_copy(newInstance)

    def get_paged(self, size, offset = 0):
        return self.data[offset:offset + size]

    def get_all(self):
        return self.data
    