class Node {
	constructor(data) {
		this.data = data
		this.left = null
		this.right = null
	}
}

class Tree {
	constructor(arr) {
		this.arr = arr
		this.root = buildTree(this.arr)
	}
}

function buildTree(arr) {
	// Sort the array & Remove duplicates
	let newArr = arr
		.sort((a, b) => a - b)
		.filter(
			(elem, index, arr) => index == arr.length - 1 || arr[index + 1] != elem
		)

	return sortedArrayToBST(newArr)
}

function sortedArrayToBST(arr) {
	return sortedArrayToBSTRecur(arr, 0, arr.length - 1)
}

function sortedArrayToBSTRecur(arr, start, end) {
	if (start > end) return null

	// Find the middle element
	let mid = start + Math.floor((end - start) / 2)

	// Create root node
	let root = new Node(arr[mid])

	// Create left subtree
	root.left = sortedArrayToBSTRecur(arr, start, mid - 1)

	// Create right subtree
	root.right = sortedArrayToBSTRecur(arr, mid + 1, end)

	return root
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
	}
}

// A utility function to insert a new
// node with the given data
function insert(root, data) {
	if (root === null) return new Node(data)

	// Duplicates not allowed
	if (root.data === data) return root

	if (data < root.data) root.left = insert(root.left, data)
	else if (data > root.data) root.right = insert(root.right, data)

	return root
}

function delIterative(root, data) {
	let curr = root
	let prev = null

	// Check if the data is actually present in the BST
	// The variable prev points to the parent of the data
	// to be deleted
	while (curr !== null && curr.data !== data) {
		prev = curr

		if (data < curr.data) {
			curr = curr.left
		} else {
			curr = curr.right
		}
	}

	// data not present
	if (curr === null) return root

	// Check if the node to be deleted has at most one child
	if (curr.left === null || curr.right === null) {
		let newCurr = curr.left === null ? curr.right : curr.left

		// Check if the node to be deleted is the root
		if (prev === null) return newCurr

		// Check if the node to be deleted is prev's left or
		// right child and then replace this with newCurr
		if (curr === prev.left) {
			prev.left = newCurr
		} else {
			prev.right = newCurr
		}
	} else {
		// Node to be deleted has two children
		let p = null
		let temp = curr.right

		while (temp.left !== null) {
			p = temp
			temp = temp.left
		}

		if (p !== null) p.left = temp.right
		else curr.right = temp.right

		curr.data = temp.data
	}

	return root
}

function find(root, value) {
	while (root !== null) {
		if (value < root.data) {
			root = root.left
		} else if (value > root.data) {
			root = root.right
		} else {
			return root
		}
	}
	return root
}

function levelOrder(root, callback) {
	if (!callback) throw new Error("Please provide a callback function")

	// Initialize a queue
	const queue = [root]
	let current = root

	while (queue.length > 0) {
		current = queue.shift() // First In First Out
		// Execute callback function passing in current item from queue
		callback(current)
		// Add next nodes to queue
		if (current.left) queue.push(current.left)
		if (current.right) queue.push(current.right)
	}
}

function inorder(root) {
	if (root !== null) {
		inorder(root.left)
		console.log(root.data + " ")
		inorder(root.right)
	}
}

// Driver function
function driver() {
	const bsTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
	let root = new Node(50)
	root = insert(root, 30)
	root = insert(root, 20)
	root = insert(root, 40)
	root = insert(root, 70)
	root = insert(root, 60)
	root = insert(root, 80)
	// prettyPrint(bsTree.root)
	// prettyPrint(root)

	const newRoot = delIterative(root, 50)
	// prettyPrint(newRoot)

	// console.log(find(newRoot, 30))
	levelOrder(newRoot, (current) => {
		console.log(current)
	})
}

driver()
