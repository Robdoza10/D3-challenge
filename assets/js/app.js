// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 500;
var margin = {top:20, right:40, bottom: 60, left: 100};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create a SVG wrapper
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var chart = svg.append("g");

d3.select("#scatter").append("div").attr("class","tooltip").style("opacity",0);

d3.csv('assets/data/data.csv')
.then(function(healthData) {

    // if (err) throw err;

    healthData.forEach(function(data) {
        data.age = +data.age;
        data.income = +data.income;
    });

    
    var yLinearScale = d3.scaleLinear().range([height,0]);
    var xLinearScale = d3.scaleLinear().range([0,width]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //scale

    xLinearScale.domain([7,d3.max(healthData, function(data) {
            return +data.age;
        }),
    ]);
    yLinearScale.domain([0, d3.max(healthData, function(data) {
        return +data.income;
        }),
    ]);


   
    chart
        .selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx",function(data, index){
            return xLinearScale(data.age);
        })
        .attr("cy",function(data, index){
            return yLinearScale(data.income);
        })
        .attr("r", "20")
        .attr("stroke", "black")
        .attr("opacity", 0.75)
        .attr("fill", "red")
        .attr("class", "stateCirlce")
        .on("mouseover", function(data ) {
           console.log(data);
        })
        .on("mouseout", function(data, index) {
            });
    
    chart
        .append("g")
        .attr('transform', `translate(0, ${height})`)
        .call(bottomAxis);

    chart.append("g").call(leftAxis);

    svg.selectAll(".dot")
    .data(healthData)
    .enter()
    .append("text")
    .text(function(data){return data.abbr;})
    .attr("x", function(data){
        return xLinearScale(data.age);
    })
    .attr("y", function(data) {
        return yLinearScale(data.income);
    })
    .attr("font-size","10px")
    .attr("fill","blue")
    .style("text-anchor","middle");
    
    chart
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - height / 2)
        .attr("dy","1em")
        .attr("class", "axisText")
        .text("Income");

    chart
        .append("text")
        .attr("transform","translate(" + width / 2 + " , " + (height + margin.top + 30) + ")",)
        .attr("class", "axisText")
        .text("Age");
})
.catch(function(err) {
	console.log('there was an error', err)
})