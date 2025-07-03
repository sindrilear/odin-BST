class TreeNode {
    constructor (root) {
        this.root = root;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor (array) {
        const uniqueArray = [...new Set(array)];
        uniqueArray.sort((a, b) => a -b);
        console.log(uniqueArray);
        this.root = this.buildTree(uniqueArray, 0, uniqueArray.length-1);
    }

    buildTree(array, start , end) {
        if (start > end) {
            return null
        };

        let mid = Math.floor((start + end) / 2);

        const root = new TreeNode(array[mid]);
        root.left = this.buildTree(array, start, mid-1);
        root.right = this.buildTree(array, mid+1, end);
        
        return root;
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.root}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(test.root);