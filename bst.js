class TreeNode {
  constructor(root) {
    this.root = root;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const uniqueArray = [...new Set(array)];
    uniqueArray.sort((a, b) => a - b);
    console.log(uniqueArray);
    this.root = this.buildTree(uniqueArray, 0, uniqueArray.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);

    const root = new TreeNode(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  insert(value) {
    let currentNode = this.root;

    if (currentNode.root > value) {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }

    while (currentNode !== null) {
      if (currentNode.root > value) {
        if (currentNode.left === null) {
          const newNode = new TreeNode(value);
          currentNode.left = newNode;
          return console.log("Inserted Node");
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          const newNode = new TreeNode(value);
          currentNode.right = newNode;
          return console.log("Inserted Node");
        }
        currentNode = currentNode.right;
      }
    }
  }

  delete(value) {
    let currentNode = this.root;
    let prevNode = currentNode;
    let deleteNode = null;
    let direction = null;
    let isTrue = false;

    if (currentNode.root === value) {
      isTrue = true;
      deleteNode = currentNode;
    } else if (currentNode.root > value) {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }

    // Traverse Tree
    while (currentNode !== null && isTrue === false) {
      // Traverse left
      if (currentNode.root > value) {
        // Found Value on left
        if (currentNode.left.root === value) {
          // Node to delete
          deleteNode = currentNode.left;
          direction = "left";
          break;
        }
        currentNode = currentNode.left;
        // Traverse right
      } else {
        // Found Value on right
        if (currentNode.right.root === value) {
          // Node to delete
          deleteNode = currentNode.right;
          direction = "right";
          break;
        }
        currentNode = currentNode.right;
      }
      prevNode = currentNode;
    }

    // Node has no children
    if (deleteNode.right === null && deleteNode.left === null) {
      // Node to delete is right child of previous Node
      if (direction === "right") {
        currentNode.right = null;
        // Node to delete is left child of previous Node
      } else {
        currentNode.left = null;
      }
      return console.log("Deleted Node with no children");
      // Node has at least one child
    } else if (deleteNode.left === null || deleteNode.right === null) {
      if (deleteNode.right !== null) {
        // Replace node with right or left child of deleted Node
        let child = deleteNode.right;
        if (direction === "right") {
          currentNode.right = child;
        } else {
          currentNode.left = child;
        }
        return console.log("Deleted Node Node with one child");
      } else {
        let child = deleteNode.left;
        if (direction === "right") {
          currentNode.right = child;
        } else {
          currentNode.left = child;
        }
        return console.log("Deleted Node with one child");
      }
      // Node has two children
    } else {
      let IOS = this.findIOS(currentNode);
      console.log(IOS);
    }
  }

  findIOS(node) {
    let currentNode = node.right;
    while (currentNode.left != null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.root}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
test.insert(6346);
prettyPrint(test.root);
test.delete(8);
prettyPrint(test.root);
