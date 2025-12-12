const fs = require('fs');

let fileContent = fs.readFileSync("input.txt", "utf8");

const content = fileContent.toString().replace(/\r/g, '').split('\n');
const nums = content[1].split(' ').map(Number);
let res = '';

class Node {
  #value;
  #next = null;

  constructor(value) {
    this.#value = value;
  }

  getValue() {
    return this.#value;
  }

  setValue(value) {
    this.#value = value;
  }

  getNext() {
    return this.#next;
  }

  setNext(next) {
    this.#next = next;
  }
}

class List {
  #head = null;
  #size = 0;
  #currentMin = null;
  
  constructor() {}
  
  add(node) {
    if (this.#head === null) {
      this.#head = node;
      this.#currentMin = node.getValue();
    } else {
      node.setNext(this.#head);
      this.#head = node;
      this.#currentMin = this.#currentMin > node.getValue() ? node.getValue() : this.#currentMin;
    }
    this.#size++;
    return this.#currentMin;
  }
}

const list = new List();

nums.forEach(num => {
  const node = new Node(num);
  const min = list.add(node);
  res += min + ' ';
});



fs.writeFileSync("output.txt", res);