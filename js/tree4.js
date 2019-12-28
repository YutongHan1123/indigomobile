var margin = {top: 60, right: 20, bottom: 20, left: 20},
  width = window.innerWidth - margin.left - margin.right,
  height = window.innerHeight/2.2 - margin.top - margin.bottom;
var svg4 = d3.select("#dog")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv('./data/tree4.csv', function(data) {
  var root4 = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
  root4.sum(function(d) { return +d.value })
  d3.treemap()
    .size([430, height])
    .padding(4)
    (root4)

  svg4
    .selectAll("rect")
    .data(root4.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("fill", "#878787")
      .on("mouseover", function(d) {
             tooltip.transition()
             .duration(200)
             .style("opacity", .9);
             tooltip.html("<p>"+ d.data.name +"</p>" +
           "<P>"+ "Export: "+ d.value + "%" +"</P>")
             .style("left", (d3.event.pageX) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
           })
      .on("mouseout", function(d) {
             tooltip.transition()
             .duration(500)
             .style("opacity", 0);
           });

  // and to add the text labels
  svg4
    .selectAll("text")
    .data(root4.leaves())
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name})
      .attr("font-size", "14px")
      .attr("fill", "white")
      .style("font-family", "'Source Sans Pro', sans-serif");

//title
svg4.append("text")
 .attr("x", window.innerWidth*0.15)
 .attr("y", -window.innerHeight*0.03)
 .text("The Top 5 Exports from USA to the World in 2018")
 .style("font-size", "12px")
 .style("fill", "#878787")
 .style("font-family", "'Fredoka One', cursive")
 .style("font-weight", "lighter")
 .attr("alignment-baseline","middle");
})
