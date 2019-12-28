var margin = {top: 0, right: 30, bottom: 20, left: 25};
var width2 = window.innerWidth - margin.left - margin.right; // Use the window's width
var height = window.innerHeight/2 - margin.top - margin.bottom; // Use the window's height

var parseTime = d3.timeParse("%Y")
   bisectDate = d3.bisector(function(d) { return d.year; }).left;

d3.csv("./data/totalexport.csv", function(data) {
   data.forEach(function(d){
     d.year02 = +d.year;
     d.year2 = parseTime(d.year);
     d.china = +d.china/1000000000;
     d.usa = +d.usa/1000000000;
   })

var n = 21;

var xScale3 = d3.scaleTime()
.domain(d3.extent(data, function(d) { return d.year2; }))
.range([0, width2]);

var yScale3 = d3.scaleLinear()
.domain([0, d3.max(data, function(d) {return d.china;})])
.range([height, 0]);

var line6 = d3.line()
    .defined(function(d) { return d.china != 0; })
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale3(d.year2); })
    .y(function(d) { return yScale3(d.china); });

var line7 = d3.line()
    .defined(function(d) { return d.usa != 0; })
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale3(d.year2); })
    .y(function(d) { return yScale3(d.usa); });

var svg2 = d3.select("#cat")
        .append("svg")
        .attr("width", width2 + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

//axis
svg2.append("g")
   .attr("transform", "translate(0," + height + ")")
   .attr("class", "axisgrey")
   .call(d3.axisBottom(xScale3)
    .ticks(6));
svg2.append("g")
   .attr("class", "axisgrey")
   .call(d3.axisLeft(yScale3)
    .ticks(6));

svg2.append("path")
.datum(data)
.attr("class", "data-line6")
.attr("d", line6);

svg2.append("path")
.datum(data)
.attr("class", "data-line7")
.attr("d", line7);

//add dot
var fixeddot3 = svg2.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 2)
    .attr("fill", "#205e8a");

fixeddot3.attr("cx", function (d) {
      if (d.china > 0) {
        return xScale3(d.year2);
      }
    })
    .attr("cy", function (d) {
      if (d.china > 0) {
        return yScale3(d.china);
      }
    })
    .on("mouseover", function (d) {
        div.transition()
            .duration(200)
            .style("opacity", .9);
        div.html("<p>Year:" + d.year02 + "</p> <p>Total:" + d.china + "</p>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
           div.transition()
           .duration(500)
           .style("opacity", 0);
         });

//add legend
// var dotlegend2 = svg.select("#cow")
//                   .append("circle")
//                   .attr("cx",200)
//                   .attr("cy",160)
//                   .attr("r", 6)
//                   .style("fill", "#3fc5f0");
svg2.append("text")
   .attr("x", window.innerWidth*0.6)
   .attr("y", window.innerHeight*0.1)
   .text("China")
   .style("font-size", "8px")
   .style("fill", "#205e8a")
   .style("font-family", "'Fredoka One', cursive")
   .style("font-weight", "lighter")
   .attr("alignment-baseline","middle");

svg2.append("text")
  .attr("x", window.innerWidth*0.45)
  .attr("y", window.innerHeight*0.25)
  .text("USA")
  .style("font-size", "8px")
  .style("fill", "#878787")
  .style("font-family", "'Fredoka One', cursive")
  .style("font-weight", "lighter")
  .attr("alignment-baseline","middle");


//title
svg2.append("text")
  .attr("x", window.innerWidth*0.2)
  .attr("y", window.innerHeight*0.01)
  .text("The Exports of China and USA to the World")
  .style("font-size", "12px")
  .style("fill", "#205e8a")
  .style("font-family", "'Fredoka One', cursive")
  .style("font-weight", "lighter")
  .attr("alignment-baseline","middle");

//Unit
svg2.append("text")
   .attr("x", 10)
   .attr("y", 10)
   .text("Unit: Billion Dollar")
   .style("font-size", "8px")
   .style("font-family", "'Fredoka One', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#878787")
   .attr("alignment-baseline","middle");


//typical year
// const annotations2 = [{
//           note: { label: "2008 Financial Crisis", wrap: 120 },
//           subject: {
//             y1: margin.top*18 ,
//             y2: height + margin.bottom
//           },
//           y: margin.top*18,
//           data: { x: "2008"} //position the x based on an x scale
//         }]

// const type = d3.annotationCustomType(
//           d3.annotationXYThreshold,
//           {"note":{
//               "lineType":"none",
//               "orientation": "top",
//               "align":"middle"}
//           }
//         )
//
//         const makeAnnotations = d3.annotation()
//           .type(type)
//           //Gives you access to any data objects in the annotations array
//           .accessors({
//             x: function(d){ return xScale3(new Date(d.x))},
//             y: function(d){ return yScale3(d.y) }
//           })
//           .annotations(annotations2)
//           .textWrap(40)
//
//         d3.select("svg2")
//           .append("g")
//           .attr("class", "annotation-group")
//           .call(makeAnnotations)
//           .style("font-family", "'Fredoka One', cursive")
//           .style("font-weight", "lighter");
 })
