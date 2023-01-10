import merge_sort from "./mergeSort.js";

class Node {
  constructor(key) {
    this._key = key;
    this._left = null;
    this._right = null;
  }

  get key() {
    return this._key;
  }

  set key(value) {
    this._key = value;
  }

  get left() {
    return this._left;
  }

  set left(value) {
    this._left = value;
  }

  get right() {
    return this._right;
  }

  set right(value) {
    this._right = value;
  }
}

class Tree {
  constructor(arr) {
    const sortedArr = merge_sort([...new Set(arr)]);
    this._root = this._buildTree(sortedArr, 0, sortedArr.length - 1);
  }

  _buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }

    const mid = parseInt((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = this._buildTree(arr, start, mid - 1);
    node.right = this._buildTree(arr, mid + 1, end);

    return node;
  }

  insert(key, root = this._root) {
    if (root == null) {
      root = new Node(key);
    } else {
      if (key < root.key) {
        root.left = this.insert(key, root.left);
      } else if (key > root.key) {
        root.right = this.insert(key, root.right);
      }
    }

    return root;
  }

  delete(key, root = this._root) {
    if (root != null) {
      if (key < root.key) {
        root.left = this.delete(key, root.left);
      } else if (key > root.key) {
        root.right = this.delete(key, root.right);
      } else {
        if (root.left == null) {
          return root.right;
        } else if (root.right == null) {
          return root.left;
        }

        root.key = this._minValue(root.right);
        root.right = this.delete(root.key, root.right);
      }
    }

    return root;
  }

  _minValue(root) {
    let minv = root.key;

    while (root.left != null) {
      minv = root.left.key;
      root = root.left;
    }

    return minv;
  }

  find(key, root = this._root) {
    if (root != null) {
      if (root.key === key) {
        return root;
      } else if (root.key > key) {
        return this.find(key, root.left);
      } else {
        return this.find(key, root.right);
      }
    }

    return root;
  }

  inorder(fn, node = this._root, result = []) {
    if (node != null) {
      this.inorder(fn, node.left, result);
      fn ? fn(node) : result.push(node.key);
      this.inorder(fn, node.right, result);
    }

    return result;
  }

  preorder(fn, node = this._root, result = []) {
    if (node != null) {
      fn ? fn(node) : result.push(node.key);
      this.preorder(fn, node.left, result);
      this.preorder(fn, node.right, result);
    }

    return result;
  }

  postorder(fn, node = this._root, result = []) {
    if (node != null) {
      this.postorder(fn, node.left, result);
      this.postorder(fn, node.right, result);
      fn ? fn(node) : result.push(node.key);
    }
  }

  height(node) {
    if (node == null) {
      return 0;
    } else {
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  levelOrder(fn) {
    const h = this.height(this._root);
    const result = [];
    for (let i = 1; i <= h; i++) {
      this._processCurrentLevel(fn, this._root, i, result);
    }

    return result;
  }

  _processCurrentLevel(fn, node, level, result) {
    if (node == null) {
      return;
    } else if (level === 1) {
      fn ? fn(node) : result.push(node.key);
    } else if (level > 1) {
      this._processCurrentLevel(fn, node.left, level - 1, result);
      this._processCurrentLevel(fn, node.right, level - 1, result);
    }
  }

  depth(key, root = this._root) {
    if (root == null) {
      return -1;
    }

    let distance = -1;

    if (
      root.key === key ||
      (distance = this.depth(key, root.left)) >= 0 ||
      (distance = this.depth(key, root.right)) >= 0
    ) {
      return distance + 1;
    }
  }

  isBalanced(root = this._root) {
    if (root == null) {
      return true;
    }

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right)
    ) {
      return true;
    }

    return false;
  }

  rebalance() {
    if (this.isBalanced()) {
      return;
    }

    const newArr = merge_sort([...new Set(this.inorder())]);
    this._root = this._buildTree(newArr, 0, newArr.length - 1);
  }

  prettyPrint(node = this._root, prefix = "", isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.key}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint();
console.log("is balanced:", tree.isBalanced());
tree.insert(123);
tree.insert(122);
tree.insert(111);
tree.prettyPrint();
console.log("is balanced:", tree.isBalanced());
tree.rebalance();
tree.prettyPrint();
console.log("is balanced:", tree.isBalanced());
console.log("inorder", tree.inorder());
console.log("preorder", tree.preorder());
console.log("level order", tree.levelOrder());
