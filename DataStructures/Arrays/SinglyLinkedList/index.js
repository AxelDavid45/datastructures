class Node {
  constructor(key) {
    this.key = key;
    this.next = null;
  }
}

export class SinglyLinkedList {
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
      this.tail.next = newNode;
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

    let current = this.head;

    // traverse to the second last node
    while (current.next.next !== null) {
      current = current.next;
    }

    current.next = null;

    this.tail = current;

    this.size--;
  }

  addAfter(node, key) {
    if (!node) {
      throw new Error("Node cannot be null");
    }
    const newNode = new Node(key);
    newNode.next = node.next;
    node.next = newNode;

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

    if (node === this.head) {
      newNode.next = this.head;
      this.head = newNode;
      this.size++;
      return;
    }

    let before = this.head;

    while (before && before.next !== node) {
      // if node is not found next iteration before will be null
      before = before.next;
    }

    if (!before) {
      throw new Error("Node not found in the list");
    }

    // [1] -> [2] -> [3]
    // append before 3
    // [1] -> [2] -> [newNode] -> [3]
    newNode.next = before.next;
    before.next = newNode;
    this.size++;
  }
}
