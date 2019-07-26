import './style.css';
import paper, { view, Path, Group, Point, Symbol } from 'paper'
import {makeGraph} from './graph.js'

var ROWS = 35
var COLS = 35

function draw(ctx){ 
    var h_space = ctx.width / COLS
    var v_space = ctx.height / ROWS
    var g = ctx.g
    ctx.symbol.place(new Point(h_space/2, v_space/2 ));
    for (var i = 1; i < g.length; i++){
        var to = g[i].label
        var from = g[i].edges[0].node
        var t_col = to  % COLS * h_space + h_space/2
        var t_row = Math.floor(to / ROWS) * v_space + v_space/2

        var f_col = from  % COLS * h_space +  h_space/2
        var f_row = Math.floor(from / ROWS) * v_space + v_space/2

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
    var node_icon = new Path.Circle(new Point(10, 10), 4);
    var symbol = new Symbol(node_icon);
    var links = new Group()
    
 
    var ctx = {
        g: makeGraph(ROWS, COLS),
        width,
        height,
        nodes_drawn: false,
        symbol,
        links
    }

    draw(ctx)

    view.onFrame = function (event) {
        node_icon.fillColor =  "#ffffff"
        if(event.count >= 120 && event.count % 120 == 0){
            node_icon.fillColor =  "#fafafa"
            ctx.g = makeGraph(ROWS, COLS)
            links.removeChildren()
            draw(ctx)
        }
    }
})
//





