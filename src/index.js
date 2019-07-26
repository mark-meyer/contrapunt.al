import './style.css';
import paper, { view, Path, Group, Point, Symbol } from 'paper'
import {makeGraph} from './graph.js'

const MAX_ROWS = 35
const MAX_COLS = 35
const REFESH_RATE = 60

function draw(ctx){ 
    var h_space = ctx.width / ctx.cols
    var v_space = ctx.height / ctx.rows
    var g = ctx.g
    if (ctx.nodes_drawn == false){
        ctx.symbol.place(new Point(h_space/2, v_space/2 ));
    }
    for (var i = 1; i < g.length; i++){
        var to = g[i].label
        var from = g[i].edges[0].node
        var t_col = to  % ctx.cols * h_space + h_space/2
        var t_row = Math.floor(to / ctx.cols) * v_space + v_space/2

        var f_col = from  % ctx.cols * h_space +  h_space/2
        var f_row = Math.floor(from / ctx.cols) * v_space + v_space/2

        var p = new Path();
        
        p.add(new Point(t_col, t_row))
        p.add(new Point(f_col, f_row))
        ctx.links.addChild(p)
        if (ctx.nodes_drawn == false){
            ctx.symbol.place(new Point(t_col, t_row ));
        }
    }
    ctx.nodes_drawn = true
}
document.addEventListener("DOMContentLoaded",() => {
    const canvas = document.getElementById("the_canvas");
    paper.setup(canvas)

    paper.project.currentStyle = {
        strokeColor: "#FFD700",
        fillColor: "#ffffff",
        strokeWidth: 1
    }
    var width = paper.project.view.size.width
    var height = paper.project.view.size.height
    console.log(width, height)
    let rows = Math.min(MAX_ROWS, Math.floor(height/25))
    let cols = Math.min(MAX_COLS, Math.floor(width/25))

    var ctx = {
        g: makeGraph(rows, cols),
        width,
        height,
        rows,
        cols,
        nodes_drawn: false,
        symbol:  new Symbol( new Path.Circle(new Point(10, 10), 4)),
        links: new Group()
    }
    draw(ctx)

    view.onFrame = function (event) {
        if(event.count >= REFESH_RATE && event.count % REFESH_RATE == 0){
            ctx.g = makeGraph(ctx.rows, ctx.cols)
            ctx.links.removeChildren()
            draw(ctx)
        }
    }

    view.onResize = function(event) {
            paper.project.activeLayer.removeChildren()
            ctx.links  = new Group()
            ctx.height = paper.project.view.size.height
            ctx.width  = paper.project.view.size.width
            ctx.rows   = Math.min(MAX_ROWS, Math.floor(ctx.height/25)),
            ctx.cols   = Math.min(MAX_COLS, Math.floor(ctx.width/25)),
            ctx.g = makeGraph(ctx.rows, ctx.cols),
            ctx.nodes_drawn = false
            draw(ctx)        
    }
})






