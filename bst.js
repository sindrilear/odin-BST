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
    let valueIsCurrentNode = false;

    if (currentNode.root === value) {
      valueIsCurrentNode = true;
      deleteNode = currentNode;
    } else if (currentNode.root > value) {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }

    // Traverse Tree
    while (currentNode !== null && valueIsCurrentNode === false) {
      if (currentNode.root === value) {
        deleteNode = currentNode;
        break;
      }
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
      // Find lowest node is right subtree
      let IOS = this.findIOS(currentNode);
      // Replace root of deleted node with IOS and delete the IOS node
      let value = IOS.root;
      this.delete(value);
      currentNode.root = value;
    }
  }

  findIOS(node) {
    let currentNode = node.right;
    while (currentNode.left != null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode !== null) {
      if (currentNode.root === value) {
        return currentNode;
      } else if (currentNode.root > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return "Node not found"
  }

  levelOrderForEach(callback) {
    if (!callback) {
      console.log("ERROR No callback arguement")
      return;
    }

    let currentNode = this.root;
    let queue = [];
    queue.push(currentNode);

    while (currentNode !== undefined) {
      if (currentNode.left != null) {
        queue.push(currentNode.left)
      };

      if(currentNode.right != null) {
        queue.push(currentNode.right)
      };

      callback(currentNode);
      queue.shift();
      currentNode = queue[0];
    }
  }

  preOrderForEach(callback, node = this.root) {

    if (node === null) return;
    
    callback(node);

    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);

  }

  inOrderForEach(callback, node = this.root) {

    if (node === null) return;

    this.inOrderForEach(callback, node.left);
    callback(node);
    this.inOrderForEach(callback, node.right);

  }

  postOrderForEach(callback, node = this.root) {

    if (node === null) return;

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node);

  }

  height(node) {
    let currentNode = null;
    let leftside = 0;
    let rightside = 0;

    if (node.left != null) {
      currentNode = node.left;
      leftside = this.calcSide(currentNode)
    };

    if (node.right != null) {
      currentNode = node.right;
      rightside = this.calcSide(currentNode);
    }

    if (leftside > rightside) {
      return leftside;
    } else {
      return rightside;
    }
  }
  
  calcSide(currentNode) {

    let prevNode = currentNode;

    let side = 0;
    let left = 1;
    let right = 1;

    while (currentNode.left != null) {
      currentNode = currentNode.left;
      left++;
    }

    currentNode = prevNode;

    while (currentNode.right != null) {
      currentNode = currentNode.right;
      right++;
    }

    if (left > right) {
      side = left;
    } else {
      side = right;
    }

    return side;
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
test.insert(6347);
test.insert(6348);
prettyPrint(test.root);
test.delete(67);
prettyPrint(test.root);
// console.log(test.find(6345));

// test.levelOrderForEach(node => {
//   console.log(node.root);
// });

// test.preOrderForEach(node => {
//   console.log(node.root);
// })

// test.inOrderForEach(node => {
//   console.log(node.root);
// })

// test.postOrderForEach(node => {
//   console.log(node.root);
// })

console.log(test.height(test.root));