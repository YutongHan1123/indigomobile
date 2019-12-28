var margin01 = {top: 80, right: 20, bottom: 20, left: 20},
  width = window.innerWidth - margin01.left - margin01.right,
  height = window.innerHeight/2.2 - margin01.top - margin01.bottom;

// append the svg object to the body of the page
var svg = d3.select("#dog")
            .append("svg")
            .attr("width", width + margin01.left + margin01.right)
            .attr("height", height + margin01.top + margin01.bottom)
            .append("g")
            .attr("transform", "translate(" + margin01.left + "," + margin01.top + ")");

//Tooltip
var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

d3.csv('./data/tree.csv', function(data) {

  // stratify the data: reformatting for d3.js
  var root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
  root.sum(function(d) { return +d.value })   // Compute the numeric value for each entity

  // Then d3.treemap computes the position of each element of the hierarchy
  // The coordinates are added to the root object above
  d3.treemap()
    .size([width, height])
    .padding(4)
    (root)

console.log(root.leaves())


  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("fill", "#daeff6")
      .on("mouseover", function(d) {
             tooltip.transition()
             .duration(200)
             .style("opacity", .9);
             tooltip.html("<p>"+ d.data.name +"</p>" +
           "<P>"+ "Export: " + d.value*100 + "%"+"</P>")
             .style("left", (d3.event.pageX) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
           })
      .on("mouseout", function(d) {
             tooltip.transition()
             .duration(500)
             .style("opacity", 0);
           });

//and to add the text labels
svg.selectAll("text")
   .data(root.leaves())
   .enter()
   .append("text")
   .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
   .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
   .text(function(d){ return d.data.name})
   .attr("font-size", "14px")
   .attr("fill", "#205e8a")
   .style("position", "relative")
   .style("font-family", "'Source Sans Pro', sans-serif");

//title
svg.append("text")
 .attr("x", window.innerWidth*0.15)
 .attr("y", -window.innerHeight*0.03)
 .text("The Top 5 Exports from China to the World in 1962")
 .style("font-size", "18px")
 .style("fill", "#205e8a")
 .style("font-family", "'Mansalva', cursive")
 .style("font-weight", "lighter")
 .attr("alignment-baseline","middle");
})
