class MemoryRepository():
    def __init__(self, data_class):
        self.data = []
        self.next_id = 1
        self.data_class = data_class

    def insert(self, obj):
        obj.id = self.next_id
        self.next_id += 1
        self.data.append(obj)
        return obj
    
    def get_paged(self, size, offset = 0):
        return self.data[offset:offset + size]

    def get_all(self):
        return self.data
    