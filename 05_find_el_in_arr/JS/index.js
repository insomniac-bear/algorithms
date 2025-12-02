const fs = require('fs');

let fileContent = fs.readFileSync("input.txt", "utf8");

const content = fileContent.toString().replace(/\r/g, '').split('\n');
const query = content.splice(2).map(Number);
const params = content[0].split(' ').map(Number);

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
  
  constructor() {}

  of(arr) {
    this.#size = arr.length;
    let node = new Node(arr[0]);
    this.#head = node;
    for(let i = 1; i < arr.length; i++) {
      node.setNext(new Node(arr[i]));
      node = node.getNext();
    }
  }

  find(val) {
    let it = this.#head;

    if (it.getValue() === val) {
      return 1;
    }

    for (let i = 1; i < this.#size; i++) {
      it = it.getNext();
      if (it.getValue() === val) {
        return i + 1;
      }
    }

    return -1;
  }
}

const arr = content[1].split(' ').map(Number);

const list = new List();
list.of(arr);

for (let i = 0; i < params[1]; i++) {
  res += list.find(query[i]) + '\n';
}


fs.writeFileSync("output.txt", res);