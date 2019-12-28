dataset2 = {
    "children": [
        {"Name":"Olives","Count":4319},
        {"Name":"Tea","Count":4159},
        {"Name":"Mashed Potatoes","Count":2583},
        {"Name":"Boiled Potatoes","Count":2074},
        {"Name":"Milk","Count":1894},
        {"Name":"Chicken Salad","Count":1809},
        {"Name":"Vanilla Ice Cream","Count":1713},
        {"Name":"Cocoa","Count":1636},
        {"Name":"Lettuce Salad","Count":1566},
        {"Name":"Lobster Salad","Count":1511},
        {"Name":"Chocolate","Count":1489},
        {"Name":"Apple Pie","Count":1487},
        {"Name":"Orange Juice","Count":1423},
        {"Name":"American Cheese","Count":1372},
        {"Name":"Green Peas","Count":1341},
        {"Name":"Assorted Cakes","Count":1331},
        {"Name":"French Fried Potatoes","Count":1328},
        {"Name":"Potato Salad","Count":1306},
        {"Name":"Baked Potatoes","Count":1293},
        {"Name":"Roquefort","Count":1273},
        {"Name":"Stewed Prunes","Count":1268}
      ]
};

var diameter2 = 600;
var color = d3.scaleOrdinal(d3.schemeCategory20);

var bubble2 = d3.pack(dataset2)
    .size([diameter2, diameter2])
    .padding(1.5);

var svg2 = d3.select("#rabbit")
    .append("svg2")
    .attr("width", diameter2)
    .attr("height", diameter2)
    .attr("class", "bubble2");

var nodes2 = d3.hierarchy(dataset2)
    .sum(function(d) { return d.Count; });

var node2 = svg2.selectAll(".node")
    .data(bubble2(nodes2).descendants())
    .enter()
    .filter(function(d){
        return  !d.children
    })
    .append("g")
    .attr("class", "node2")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node2.append("title")
    .text(function(d) {
        return d.Name + ": " + d.Count;
    });

node2.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d,i) {
        return color(i);
    });

node2.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Name.substring(0, d.r / 3);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

node2.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Count;
    })
    .attr("font-family",  "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

d3.select(self.frameElement)
    .style("height", diameter2 + "px");
