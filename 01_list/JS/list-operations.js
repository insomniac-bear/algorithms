const fs = require('fs');

let fileContent = fs.readFileSync("input.txt", "utf8");

class Node {
  #value = null;
  #next = null;

  constructor(value) {
    this.#value = value;
  }

  getValue() {
    return this.#value;
  }

  setNext(node) {
      this.#next = node;
  }

  getNext() {
      return this.#next;
  }
}

class List {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  addHead(newNode) {
    if (this.size === 0) {
      this.head = newNode;
    } else {
      newNode.setNext(this.head);
      this.head = newNode;
    }
  }

  removeHead() {
    this.head = this.head.getNext();
  }

  addNode(pos, el) {
    const newNode = new Node(el);

    if (pos === 0) {
      this.addHead(newNode);
    } else {
      const currentNode = this.getNode(pos);
      newNode.setNext(currentNode.getNext());
      currentNode.setNext(newNode);
    }
    this.size++;
  }
  
  getNode(pos) {
    let currentNode = this.head;
    for (let i = 1; i < pos; i++) {
      currentNode = currentNode.getNext();
    }

    return currentNode;
  }

  removeNode(pos) {
    if (pos === 1) {
      this.removeHead();
    } else {
      const removingNode = this.getNode(pos);
      const prevNode = this.getNode(pos - 1);
      prevNode.setNext(removingNode.getNext());
    }

    this.size--;
  }
}

const content = fileContent.toString().replace(/\r/g, '').split('\n');
let res = '';
const queryCount = content[0];
const list = new List();

for (let i = 1; i <= queryCount; i++) {
  const query = content[i].split(' ').map(it => Number(it));
  switch (query[0]) {
    case 1:
      list.addNode(query[1], query[2]);
      break;
    case 2:
      res += list.getNode(query[1]).getValue() + '\n';
      break;
    case 3:
      list.removeNode(query[1]);
      break;
    default:
      throw new Error('Invalid first param');
  }
}

fs.writeFileSync("output.txt", res);