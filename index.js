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
	let results = []
	// Initialize a queue
	const queue = [root]
	let current = root

	while (queue.length > 0) {
		current = queue.shift() // First In First Out
		// Execute callback function passing in current item from queue
		if (callback) callback(current)
		// Add next nodes to queue
		results.push(current.data)
		if (current.left) queue.push(current.left)
		if (current.right) queue.push(current.right)
	}

	return results
}

function inorder(root, callback) {
	const results = []
	if (root === null) return null

	// Initialize a stack
	const stack = []
	let current = root

	while (current !== null || stack.length > 0) {
		// Add root to stack & get things moving
		if (current !== null) {
			stack.push(current)
			current = current.left
		} else {
			// Handling top element of the stack
			current = stack.pop()
			results.push(current.data)
			// If a callback was provided, call it here
			if (callback) callback(current)

			current = current.right
		}
	}

	return results
}

function preorder(root, callback) {
	const results = []
	if (root === null) return null

	// Initialize a stack
	const stack = [root]

	while (stack.length > 0) {
		// Handle top element of the stack
		const current = stack.pop()
		if (callback) callback(current)

		// Add its data to results
		results.push(current.data)

		// Add right child to stack
		if (current.right) stack.push(current.right)
		// Add left child to stack
		if (current.left) stack.push(current.left)
	}

	return results
}

function postorder(root, callback) {
	const results = []
	if (root === null) return null

	// Initialize a stack
	const stack = [root]

	while (stack.length > 0) {
		// Handle top element of the stack
		const current = stack.pop()
		if (callback) callback(current)
		results.unshift(current.data)

		// Add left child to stack
		if (current.left) stack.push(current.left)
		// Add right child to stack
		if (current.right) stack.push(current.right)
	}

	return results
}

function height(node) {
	if (node === null) return -1

	const left = height(node.left) + 1
	const right = height(node.right) + 1

	return Math.max(left, right)
}

function depth(node, { root }) {
	if (node === null || node === root.data) return 0

	let count = 0
	let current = root

	while (current !== null && current.data !== node) {
		count++
		if (current.data > node) {
			current = current.left
		} else if (current.data < node) {
			current = current.right
		}
	}

	if (!current) return null
	return count
}

function isBalanced(root) {
	const leftHeight = height(root.left)
	const rightHeight = height(root.right)
	const diff = Math.abs(leftHeight - rightHeight)
	return diff < 2 ? true : false
}

function rebalance(tree) {
	if (isBalanced(tree.root)) return // Already balanced

	const dataArray = levelOrder(tree.root)
	tree.root = buildTree(dataArray)

	return tree.root
}

// Driver function
function driver() {
	const bsTree = new Tree([50])
	let root = bsTree.root
	root = insert(root, 30)
	root = insert(root, 20)
	root = insert(root, 40)
	root = insert(root, 70)
	root = insert(root, 60)
	root = insert(root, 80)
	prettyPrint(bsTree.root)

	// const newRoot = delIterative(root, 50)
	// prettyPrint(newRoot)

	// console.log(find(newRoot, 30))
	console.log("Balanced? ", isBalanced(bsTree.root))
	console.log(
		"Level Order ",
		levelOrder(root, (data) => {
			return data
		})
	)
	console.log("Inorder ", inorder(root))
	console.log("Preorder ", preorder(root))
	console.log("Postorder ", postorder(root))
	console.log("Height ", height(root))
	console.log("Depth ", depth(70, bsTree))
	root = insert(root, 81)
	root = insert(root, 82)
	root = insert(root, 83)
	root = insert(root, 84)
	prettyPrint(bsTree.root)
	console.log("Balanced? ", isBalanced(bsTree.root))
	console.log("Rebalance")
	rebalance(bsTree)
	prettyPrint(bsTree.root)
	console.log("Balanced? ", isBalanced(bsTree.root))
	console.log(
		"Level Order ",
		levelOrder(root, (data) => {
			return data
		})
	)
	console.log("Inorder ", inorder(root))
	console.log("Preorder ", preorder(root))
	console.log("Postorder ", postorder(root))
	console.log("Height ", height(root))
	console.log("Depth ", depth(70, bsTree))
}

driver()
