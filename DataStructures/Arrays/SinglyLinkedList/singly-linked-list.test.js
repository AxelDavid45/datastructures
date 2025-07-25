import { describe, test, expect, beforeEach } from "vitest";
import { SinglyLinkedList } from "./index.js";

describe("SinglyLinkedList", () => {
  let list;

  beforeEach(() => {
    list = new SinglyLinkedList();
  });

  // Initial state test
  test("should start empty", () => {
    expect(list.empty()).toBe(true);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  // Tests for pushFront
  describe("pushFront", () => {
    test("should add a node to an empty list", () => {
      list.pushFront("A");
      expect(list.head.key).toBe("A");
      expect(list.tail.key).toBe("A");
      expect(list.empty()).toBe(false);
    });

    test("should add a node to the front of a non-empty list", () => {
      list.pushFront("B");
      list.pushFront("A");
      expect(list.head.key).toBe("A");
      expect(list.tail.key).toBe("B");
      expect(list.head.next.key).toBe("B");
    });
  });

  // Tests for popFront
  describe("popFront", () => {
    test("should throw an error on an empty list", () => {
      expect(() => list.popFront()).toThrow("List is empty");
    });

    test("should empty the list if it has only one element", () => {
      list.pushFront("A");
      list.popFront();
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.empty()).toBe(true);
    });

    test("should remove the first element from a list with multiple nodes", () => {
      list.pushFront("C");
      list.pushFront("B");
      list.pushFront("A");
      list.popFront();
      expect(list.head.key).toBe("B");
      expect(list.head.next.key).toBe("C");
    });
  });

  // Tests for pushBack
  describe("pushBack", () => {
    test("should add a node to an empty list", () => {
      list.pushBack("A");
      expect(list.head.key).toBe("A");
      expect(list.tail.key).toBe("A");
    });

    test("should add a node to the end of a non-empty list", () => {
      list.pushBack("A");
      list.pushBack("B");
      expect(list.head.key).toBe("A");
      expect(list.tail.key).toBe("B");
      expect(list.head.next.key).toBe("B");
    });
  });

  // Tests for popBack
  describe("popBack", () => {
    test("should throw an error on an empty list", () => {
      expect(() => list.popBack()).toThrow("List is empty");
    });

    test("should empty the list if it has only one element", () => {
      list.pushBack("A");
      list.popBack();
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    test("should remove the last element from a list with multiple nodes", () => {
      list.pushBack("A");
      list.pushBack("B");
      list.pushBack("C");
      list.popBack();
      expect(list.tail.key).toBe("B");
      expect(list.head.next.key).toBe("B");
      expect(list.head.next.next).toBeNull();
    });
  });

  // Tests for addAfter
  describe("addAfter", () => {
    test("should insert a node after the head", () => {
      list.pushBack("A");
      list.pushBack("C");
      const nodeA = list.head;
      list.addAfter(nodeA, "B"); // A -> B -> C
      expect(list.head.next.key).toBe("B");
      expect(list.head.next.next.key).toBe("C");
    });

    test("should insert a node after the tail and update the tail", () => {
      list.pushBack("A");
      list.pushBack("B");
      const nodeB = list.tail;
      list.addAfter(nodeB, "C"); // A -> B -> C
      expect(list.tail.key).toBe("C");
      expect(nodeB.next.key).toBe("C");
    });
  });

  // Tests for addBefore
  describe("addBefore", () => {
    test("should insert a node before the head and update the head", () => {
      list.pushBack("B");
      const nodeB = list.head;
      list.addBefore(nodeB, "A"); // A -> B
      expect(list.head.key).toBe("A");
      expect(list.head.next.key).toBe("B");
    });

    test("should insert a node before an intermediate node", () => {
      list.pushBack("A");
      list.pushBack("C");
      const nodeC = list.tail;
      list.addBefore(nodeC, "B"); // A -> B -> C
      expect(list.head.next.key).toBe("B");
      expect(list.head.next.next.key).toBe("C");
      expect(list.tail.key).toBe("C"); // Tail should not change
    });

    test("should throw an error if the node is not found in the list", () => {
      list.pushBack("A");
      const fakeNode = { key: "B", next: null };
      expect(() => list.addBefore(fakeNode, "X")).toThrow(
        "Node not found in the list"
      );
    });
  });

  describe("size", () => {
    test("should return the correct size of the list", () => {
      expect(list.length()).toBe(0);
      list.pushBack("A");
      expect(list.length()).toBe(1);
      list.pushBack("B");
      expect(list.length()).toBe(2);
      list.popFront();
      expect(list.length()).toBe(1);
      list.popBack();
      expect(list.length()).toBe(0);
    });
  });

  describe("topFront", () => {
    test("should return the key of the front node", () => {
      list.pushFront("A");
      expect(list.topFront()).toBe("A");
      list.pushFront("B");
      expect(list.topFront()).toBe("B");
    });

    test("should throw an error if the list is empty", () => {
      expect(list.topFront()).toBeNull();
    });
  });

  describe("topBack", () => {
    test("should return the key of the back node", () => {
      list.pushBack("A");
      expect(list.topBack()).toBe("A");
      list.pushBack("B");
      expect(list.topBack()).toBe("B");
    });

    test("should return null if the list is empty", () => {
      expect(list.topBack()).toBeNull();
    });
  });

  describe("find", () => {
    test("should return true if the key exists in the list", () => {
      list.pushBack("A");
      list.pushBack("X");
      list.pushBack("B");
      expect(list.find("X")).toBe(true);
      expect(list.find("B")).toBe(true);
    });

    test("should return false if the key does not exist in the list", () => {
      list.pushBack("A");
      list.pushBack("B");
      expect(list.find("C")).toBe(false);
    });
  });
});
