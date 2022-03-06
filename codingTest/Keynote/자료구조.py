

# === [linked list]====

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class SingleLinkedList:
    def __init__(self):
        dummy = Node('dummy')
        self.head = dummy
        self.tail = dummy

        self.current = None
        self.before = None
        self.size = 0

    def append(self, data):
        new_node = Node(data)
        if self.size == 0:
            self.head.next = new_node
        self.tail.next, self.tail = new_node, new_node
        self.size += 1

    def getAll(self):
        num = 0
        datas = []
        node = self.head
        while num < self.size:
            node = node.next
            datas.append(node.data)
            num += 1
        return datas

    def getByIndex(self, idx):
        if idx > self.size:
            return -1
        num = 0
        node = self.head
        while num < idx:
            node = node.next
            num += 1
        return node.data

    def insertByIdx(self, idx, data):
        new_node = Node(data)
        if idx > self.size or idx < 1:
            return -1
        num = 0
        node = self.head
        while num < idx-1:
            node = node.next
            num += 1
        next_node = node.next
        node.next = new_node
        new_node.next = next_node
        self.size += 1
        return 1

    def deleteByIdx(self, idx):
        if idx > self.size or idx < 1:
            return -1
        num = 0
        pre_node = self.head
        while num < idx-1:
            pre_node = pre_node.next
            num += 1
        next_node = pre_node.next
        next_node = next_node.next
        pre_node.next = next_node
        self.size -= 1
        return 1
