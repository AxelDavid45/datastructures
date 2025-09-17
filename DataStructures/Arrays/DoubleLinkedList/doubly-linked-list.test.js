import { describe, it, expect } from "vitest";
import { DoublyLinkedList } from "./index";

function traverseForward(list) {
  const result = [];
  let current = list.head;
  while (current) {
    result.push(current.key);
    current = current.next;
  }
  return result;
}

function traverseBackward(list) {
  const result = [];
  let current = list.tail;
  while (current) {
    result.push(current.key);
    current = current.prev;
  }
  return result;
}

describe("DoublyLinkedList", () => {
  it("should start empty", () => {
    const list = new DoublyLinkedList();
    expect(list.empty()).toBe(true);
    expect(list.length()).toBe(0);
    expect(list.topFront()).toBeNull();
    expect(list.topBack()).toBeNull();
  });

  it("pushFront should add elements to the front", () => {
    const list = new DoublyLinkedList();
    list.pushFront(10);
    list.pushFront(20);
    expect(list.topFront()).toBe(20);
    expect(list.topBack()).toBe(10);
    expect(list.length()).toBe(2);
  });

  it("pushBack should add elements to the back", () => {
    const list = new DoublyLinkedList();
    list.pushBack(5);
    list.pushBack(15);
    expect(list.topFront()).toBe(5);
    expect(list.topBack()).toBe(15);
    expect(list.length()).toBe(2);
  });

  it("popFront should remove from the front", () => {
    const list = new DoublyLinkedList();
    list.pushBack(1);
    list.pushBack(2);
    const val = list.popFront();
    expect(val).toBe(1);
    expect(list.topFront()).toBe(2);
    expect(list.length()).toBe(1);
  });

  it("popBack should remove from the back", () => {
    const list = new DoublyLinkedList();
    list.pushBack(1);
    list.pushBack(2);
    list.popBack();
    expect(list.topBack()).toBe(1);
    expect(list.length()).toBe(1);
  });

  it("popFront on empty should throw", () => {
    const list = new DoublyLinkedList();
    expect(() => list.popFront()).toThrow("List is empty");
  });

  it("popBack on empty should throw", () => {
    const list = new DoublyLinkedList();
    expect(() => list.popBack()).toThrow("List is empty");
  });

  it("should find existing keys", () => {
    const list = new DoublyLinkedList();
    list.pushBack("a");
    list.pushBack("b");
    expect(list.find("a")).toBe(true);
    expect(list.find("b")).toBe(true);
    expect(list.find("c")).toBe(false);
  });

  it("addAfter should insert correctly", () => {
    const list = new DoublyLinkedList();
    list.pushBack(1);
    list.pushBack(2);
    const node = list.head; // node with key 1
    list.addAfter(node, 1.5);
    expect(list.find(1.5)).toBe(true);
    expect(list.length()).toBe(3);
    expect(list.head.next.key).toBe(1.5);
  });

  it("addBefore should insert correctly", () => {
    const list = new DoublyLinkedList();
    list.pushBack(1);
    list.pushBack(2);
    const node = list.tail; // node with key 2
    list.addBefore(node, 3);
    expect(list.find(3)).toBe(true);
    expect(list.length()).toBe(3);
    expect(list.head.next.key).toBe(3);
  });

  it("addAfter should throw if node is null", () => {
    const list = new DoublyLinkedList();
    expect(() => list.addAfter(null, 100)).toThrow("Node cannot be null");
  });

  it("addBefore should throw if node is null", () => {
    const list = new DoublyLinkedList();
    expect(() => list.addBefore(null, 200)).toThrow("Node cannot be null");
  });

  it("should handle single element correctly", () => {
    const list = new DoublyLinkedList();
    list.pushBack(99);
    expect(list.topFront()).toBe(99);
    expect(list.topBack()).toBe(99);
    list.popBack();
    expect(list.empty()).toBe(true);
  });

  it("should keep correct order forward and backward", () => {
    const list = new DoublyLinkedList();

    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    const n = list.findNode(3)
    list.addBefore(n, 2.5)
    list.pushFront(0);

    // expected forward order
    expect(traverseForward(list)).toEqual([0, 1, 2, 2.5, 3]);

    // expected backward order
    expect(traverseBackward(list)).toEqual([3, 2.5, 2, 1, 0]);

    // now remove some elements
    list.popFront(); // removes 0
    list.popBack(); // removes 3
    list.popBack() // removes 2.5
    expect(traverseForward(list)).toEqual([1, 2]);
    expect(traverseBackward(list)).toEqual([2, 1]);
  });
});
