var margin1 = {top: 20, right: 350, bottom: 20, left: 35};
var width1 = window.innerWidth - margin1.left - margin1.right;
var height = window.innerHeight/2 - margin1.top - margin1.bottom;

var parseTime = d3.timeParse("%Y")
   bisectDate = d3.bisector(function(d) { return d.year; }).left;

var svg = d3.select("#cow")
       .append("svg")
       .attr("width", width1 + margin1.left + margin1.right)
       .attr("height", height + margin1.top + margin1.bottom)
       .append("g")
       .attr('id', 'new')
       .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

let color = 'steelblue';
const roughSvg = document.getElementById('new');

const rc = rough.svg(roughSvg, {
      options: {
      fill: color,
      stroke: color,
      strokeWidth: 1,
      roughness: 1.4,
      bowing: 1,
      fillStyle: 'cross-hatch'
      }
    });
// rough.strokeWidth = 2;
// rough.fill = "rgba(255,0,0,0.2)";

d3.csv("./data/export1867.csv", function(data) {
   data.forEach(function(d){
     d.year1 = +d.year;
     d.year = parseTime(d.year);
     d.cotton = +d.cotton/1000000;
     d.wool = +d.wool/1000000;
     d.silkc = +d.silkc/1000000;
   })


var n = 21;

var xScale = d3.scaleTime()
.domain(d3.extent(data, function(d) { return d.year; }))
.range([0, width1]);

var yScale = d3.scaleLinear()
.domain([0, d3.max(data, function(d) {return d.cotton;})])
.range([height, 0]);

const dataConfig = {
      heightMultiplier: 0.75,
      yAxis: {accessor: 'pay', title: 'Inkomst&nbsp;kr', ticks: 6 },
      xAxis: {accessor: 'year', title: 'År'},
      circle: {accessor: 'experience', title: 'Ålder', steps:3, maxSize: 30},
      sortAttribute: 'year',
      sortDirection: 'descending',
    }

let node = rc.line(xScale(d.year),yScale(d.cotton),
          {
            roughness: 2,
            stroke: '#a11014'
          });
bar = roughSvg.appendChild(node);
     bar.setAttribute('class', 'bar');
     bar.setAttribute('cotton', d.cotton);

var line = d3.line()
    .defined(function(d) { return d.cotton != 0; })
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale(d.year); })
    .y(function(d) { return yScale(d.cotton); });

var line2 = d3.line()
    .defined(function(d) { return d.silkc != 0; })
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale(d.year); })
    .y(function(d) { return yScale(d.silkc); });

var line3 = d3.line()
    .defined(function(d) { return d.wool != 0; })
    .curve(d3.curveCardinal)
    .x(function(d) { return xScale(d.year); })
    .y(function(d) { return yScale(d.wool); });

var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

//axis
svg.append("g")
   .attr("transform", "translate(0," + height + ")")
   .attr("class", "axisgrey")
   .call(d3.axisBottom(xScale)
           .ticks(15));
svg.append("g")
   .attr("class", "axisgrey")
   .call(d3.axisLeft(yScale));

svg.append("path")
.datum(data)
.attr("class", "data-line")
.attr("d", line);

svg.append("path")
.datum(data)
.attr("class", "data-line2")
.attr("d", line2);

svg.append("path")
.datum(data)
.attr("class", "data-line3")
.attr("d", line3);

//add dot

data.forEach((d,i)=>{
     let node = rc.circle()
     let bar = roughSvg.appendChild(node);
     bar.setAttribute('class', 'bar');
   })

var fixeddot = svg.selectAll("g.bar")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 3)
    .attr("fill", "#205e8a");

fixeddot.attr("cx", function (d) {
      if (d.cotton > 0) {
        return xScale(d.year);
      }
    })
    .attr("cy", function (d) {
      if (d.cotton > 0) {
        return yScale(d.cotton);
      }
    })
    .on("mouseover", function (d) {
        div.transition()
            .duration(200)
            .style("opacity", .9);
        div.html("<p>Year:" + d.year1 + "</p> <p>Cotton:" + d.cotton + "</p>")
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
svg.append("text")
   .attr("x", window.innerWidth*0.578)
   .attr("y", window.innerHeight*0.2)
   .text("Cotton")
   .style("font-size", "20px")
   .style("font-family", "'Fredoka One', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#205e8a")
   .attr("alignment-baseline","middle");

svg.append("text")
  .attr("x", window.innerWidth*0.53)
  .attr("y", window.innerHeight*0.32)
  .text("Wool")
  .style("font-size", "20px")
  .style("font-family", "'Fredoka One', cursive")
  .style("font-weight", "lighter")
  .style("fill", "#878787")
  .attr("alignment-baseline","middle");

svg.append("text")
  .attr("x", window.innerWidth*0.7)
  .attr("y", window.innerHeight*0.33)
  .text("Silk")
  .style("font-size", "20px")
  .style("font-family", "'Fredoka One', cursive")
  .style("font-weight", "lighter")
  .style("fill", "#878787")
  .attr("alignment-baseline","middle");


//title
svg.append("text")
  .attr("x", window.innerWidth*0.14)
  .attr("y", window.innerHeight*0.01)
  .text("Total Exports of Cotton, Wool and Silk from China to the World")
  .style("font-size", "25px")
  .style("font-family", "'Fredoka One', cursive")
  .style("font-weight", "lighter")
  .style("fill", "#205e8a")
  .attr("alignment-baseline","middle");

//Unit
svg.append("text")
   .attr("x", 10)
   .attr("y", 10)
   .text("Unit: Million Dollar")
   .style("font-size", "12px")
   .style("font-family", "'Fredoka One', cursive")
   .style("font-weight", "lighter")
   .style("fill", "#878787")
   .attr("alignment-baseline","middle");


 //typical year
 const annotations = [{
            note: { label: "Sino-Japanese War", wrap: 120 },
            subject: {
              y1: margin1.top*13 ,
              y2: height + margin1.bottom
            },
            y: margin1.top*13,
            data: { x: "1896"} //position the x based on an x scale
          },
          {
            note: { label: "Russo-Japanese War", wrap: 120 },
            subject: {
              y1: margin1.top*8,
              y2: height + margin1.bottom
            },
            y: margin1.top*8,
            data: { x: "1906"}
          },
          {
            note: { label: "Xinhai Revolution", wrap: 120},
            subject: {
              y1: margin1.top*7,
              y2: height + margin1.bottom
            },
            y: margin1.top*7,
            data: { x: "1913"}
          },
          {
            note: { label: "May 4th Movement", wrap: 150},
            subject: {
              y1: margin1.top*4,
              y2: height + margin1.bottom
            },
            y: margin1.top*4,
            data: { x: "1921"}
          }

          ]

const type = d3.annotationCustomType(
            d3.annotationXYThreshold,
            {"note":{
                "lineType":"none",
                "orientation": "top",
                "align":"middle"}
            }
          )

          const makeAnnotations = d3.annotation()
            .type(type)
            //Gives you access to any data objects in the annotations array
            .accessors({
              x: function(d){ return xScale(new Date(d.x))},
              y: function(d){ return yScale(d.y) }
            })
            .annotations(annotations)
            .textWrap(40)

          d3.select("svg")
            .append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations)
            .style("font-family", "'Fredoka One', cursive")
            .style("font-weight", "lighter");
 })
