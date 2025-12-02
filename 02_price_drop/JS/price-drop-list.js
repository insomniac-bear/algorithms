const fs = require('fs');

let fileContent = fs.readFileSync("input.txt", "utf8");

const content = fileContent.toString().replace(/\r/g, '').split('\n');
let res = '';

class Node {
  #value = null;
  #index = null;
  #next = null;

  constructor(value) {
    this.#value = value;
  }

  getValue() {
    return this.#value;
  }

  getIndex() {
    return this.#index;
  }

  setIndex(index) {
    this.#index = index;
  }

  getNext() {
    return this.#next;
  }

  setNext(node) {
    this.#next = node;
  }
}

class List {
  #head = null;
  #min = null;
  #minIndex = null;
  #max = null;
  #maxIndex = null;
  #size = 0;
  
  add(node) {
    this.#size++;
    node.setIndex(this.#size);

    if (this.#head === null) {
      this.#head = node;
    } else {
      let currNode = this.#head;

      for (let i = 1; i <= this.#size; i++) {
        if (this.#min !== null && this.max !== null) {
          const currDiff = currNode.getValue() - node.getValue();

          if (currDiff < this.#min) {
            this.#min = currDiff;
            this.#minIndex = `${currNode.getIndex()} ${node.getIndex()}`;
          }

          if (currDiff > this.#max) {
            this.#max = currDiff;
            this.#maxIndex = `${currNode.getIndex()} ${node.getIndex()}`;
          }

        } else {
          this.#min = currNode.getValue() - node.getValue();
          this.#minIndex = `${currNode.getIndex()} ${node.getIndex()}`;
          this.#max = currNode.getValue() - node.getValue();
          this.#maxIndex = `${currNode.getIndex()} ${node.getIndex()}`;
        }

        currNode = currNode.getNext() !== null ? currNode.getNext() : currNode;
      }

      currNode.setNext(node);
    }
  }

  getMinIndex() {
    return this.#minIndex;
  }

  getMaxIndex() {
    return this.#maxIndex;
  }
}

const a = content[1].split(' ');
const list = new List();

for (let i = 0; i < a.length; i++) {
  const node = new Node(Number(a[i]));
  list.add(node);
}

res += list.getMinIndex() + '\n' + list.getMaxIndex();

fs.writeFileSync("output.txt", res);
