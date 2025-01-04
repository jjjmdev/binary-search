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

const bsTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
prettyPrint(bsTree.root)
