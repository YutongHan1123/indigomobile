dataset = {
    "children": [
        {"Name":"California","Count":4283666},
        {"Name":"Florida","Count":152696},
        {"Name":"South Carolina","Count":2583},
        {"Name":"New York","Count":600},
        // {"Name":"Milk","Count":1894},
        // {"Name":"Chicken Salad","Count":1809},
        // {"Name":"Vanilla Ice Cream","Count":1713},
        // {"Name":"Cocoa","Count":1636},
        // {"Name":"Lettuce Salad","Count":1566},
        // {"Name":"Lobster Salad","Count":1511},
        // {"Name":"Chocolate","Count":1489},
        // {"Name":"Apple Pie","Count":1487},
        // {"Name":"Orange Juice","Count":1423},
        // {"Name":"American Cheese","Count":1372},
        // {"Name":"Green Peas","Count":1341},
        // {"Name":"Assorted Cakes","Count":1331},
        // {"Name":"French Fried Potatoes","Count":1328},
        // {"Name":"Potato Salad","Count":1306},
        // {"Name":"Baked Potatoes","Count":1293},
        // {"Name":"Roquefort","Count":1273},
        // {"Name":"Stewed Prunes","Count":1268}
      ]
};

var diameter = 300;
var color = d3.scaleOrdinal(d3.schemeCategory20);

var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#rabbit")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var nodes = d3.hierarchy(dataset)
    .sum(function(d) { return d.Count; });

var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
        return  !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.append("title")
    .text(function(d) {
        return d.Name + ": " + d.Count;
    });

node.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d,i) {
        return color(i);
    });

node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Name.substring(0, d.r);
    })
    .attr("font-family", "'Fredoka One', cursive")
    .attr("font-size", "20px")
    .attr("fill", "#205e8a");

node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Count;
    })
    .attr("font-family",  "'Fredoka One', cursive")
    .attr("font-size", "10px")
    .attr("fill", "#205e8a");

d3.select(self.frameElement)
    .style("height", diameter + "px");
