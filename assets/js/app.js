// @TODO: YOUR CODE HERE!

// declare the dimensions of our SVG Canvas and image
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import the data using d3.csv
d3.csv("/assets/data/data.csv").then(function(stateData, err) {
    // add quick error handling and print the data to the console
    if (err) throw err;

    //  parse and convert data to numeric

    stateData.forEach(data => {
      data.id = +data.id;
      data.poverty = +data.poverty;
      data.povertyMoe = +data.povertyMoe;
      data.age = +data.age;
      data.ageMoe = +data.ageMoe;
      data.income = +data.income;
      data.incomeMoe = +data.incomeMoe;
      data.healthcare = +data.healthcare;
      data.healthcareLow = +data.healthcareLow;
      data.healthcareHigh = +data.healthcareHigh;
      data.obesity = +data.obesity;
      data.obesityLow = +data.obesityLow;
      data.obesityHigh = +data.obesityHigh;
      data.smokes = +data.smokes;
      data.smokesLow = +data.smokesLow;
      data.smokesHigh = +data.smokesHigh;
    });

    console.log(stateData);

    // Create scale functions for healthcare and poverty
    var xScale = d3.scaleLinear()
      .domain(d3.extent(stateData, d => d.healthcare))
      .range([0, width]);

    var yScale = d3.scaleLinear()
      .domain(d3.extent(stateData, d => d.poverty))
      .range([height,0]);

    // Create axis functions

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    // Append axes to the chart

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create Circles for the scatter plot

    var circlesGroup = chartGroup.selectAll("circle")
      .data(stateData)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.healthcare))
      .attr("cy", d => yScale(d.poverty))
      .attr("r", "10")
      .attr("fill", "cyan")
      .attr("fill-opacity", "0.5")
      .attr("stroke", "black")
      .attr("stroke-width", "1");

})