class Node {
  constructor(key) {
    this.key = key;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  empty() {
    return this.head === null;
  }

  length() {
    return this.size;
  }

  topFront() {
    if (this.empty()) {
      return null;
    }

    return this.head.key;
  }

  topBack() {
    if (this.empty()) {
      return null;
    }

    return this.tail.key;
  }

  pushFront(key) {
    const newNode = new Node(key);
    newNode.next = this.head;
    this.head = newNode;

    if (newNode.next != null) {
      newNode.next.prev = newNode;
    }

    if (this.tail === null) {
      this.tail = newNode;
    }

    this.size++;
  }

  popFront() {
    if (this.empty()) {
      throw new Error("List is empty");
    }

    const value = this.head.key;

    this.head = this.head.next;
    this.head.prev = null;

    if (this.head === null) {
      this.tail = null;
    }

    this.size--;
    return value;
  }

  pushBack(key) {
    const newNode = new Node(key);
    // empty list case
    if (this.tail === null) {
      this.head = this.tail = newNode;
    } else {
      // tail points to last node, change next from lastNode
      newNode.prev = this.tail;
      this.tail.next = newNode;
      newNode.next = null;
      // update tail to new node
      this.tail = newNode;
    }
    this.size++;
  }

  popBack() {
    if (this.empty()) {
      throw new Error("List is empty");
    }

    if (this.head === this.tail) {
      this.head = this.tail = null;
      this.size--;
      return;
    }

    this.tail = this.tail.prev;
    this.tail.next = null;

    this.size--;
  }

  addAfter(node, key) {
    if (!node) {
      throw new Error("Node cannot be null");
    }

    const newNode = new Node(key);

    newNode.next = node.next;
    newNode.prev = node;
    node.next = newNode;

    if (newNode.next != null) {
      newNode.next.prev = newNode;
    }

    if (node === this.tail) {
      this.tail = newNode;
    }

    this.size++;
  }

  addBefore(node, key) {
    if (!node) {
      throw new Error("Node cannot be null");
    }

    const newNode = new Node(key);
    newNode.next = node;

    const oldPrev = node.prev;
    newNode.prev = oldPrev;
    node.prev = newNode;

    if (oldPrev != null) {
      oldPrev.next = newNode;
    }

    if (node === this.head) {
      this.head = node;
    }

    this.size++;
  }

  /**
   * Searches for a node with the specified key in the singly linked list.
   * @param {*} key - The key to search for in the list.
   * @returns {boolean} Returns true if a node with the given key is found; otherwise, returns undefined.
   */
  find(key) {
    let current = this.head;

    while (current) {
      if (current.key === key) {
        return true;
      }

      current = current.next;
    }

    return false;
  }

  findNode(key) {
    let current = this.head;

    while (current) {
      if (current.key === key) {
        return current;
      }

      current = current.next;
    }

    return false;
  }

  erase(key) {
    let current = this.head;
    let previous = this.head;
    while (current) {
      if (current.key === key) {
      }
      previous = current;
      current = current.next;
    }
  }
}
