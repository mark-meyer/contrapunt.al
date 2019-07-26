const Heap = require('jheap')

function makeGraph(rows, cols) {
    let h = new Heap((a,b) => a.sort_weight < b.sort_weight) 
    let g = []
    for (let i = 0; i < rows * cols; i++){
        g[i] = {label: i, edges: [], sort_weight:Number.MAX_SAFE_INTEGER}
        h.insert(g[i])
    }

    // Random weight edges on connected graph
    for (let i = 0; i < rows * cols; i++){
        if (i % cols < (cols - 1)) {
            let edge_weight = Math.random()
            g[i].edges.push({node: i+1, weight: edge_weight})
            g[i+1].edges.push({node: i, weight: edge_weight})
        }
        if (i + cols <  rows * cols){
            let edge_weight = Math.random()
            g[i].edges.push({node:i+cols, weight: Math.random()})
            g[i+cols].edges.push({node:i, weight: Math.random()})   
        }
    }
    // MST
    let newNode = h.pop()
    let visited = new Set()

    while(true) {
        visited.add(newNode.label)
        newNode.edges.forEach(e => {  
            if (e.weight >= g[e.node].sort_weight || visited.has(e.node) ) return
            g[e.node].sort_weight = e.weight
            g[e.node].best_edge = {node: newNode.label}
        })
        newNode.edges = newNode.best_edge ? [newNode.best_edge] : []
        h.heapify()
        newNode = h.pop()
        if (!newNode) break
    }
    return g
}

export {makeGraph}
