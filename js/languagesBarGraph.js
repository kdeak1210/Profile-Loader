var buildGraph = function(languages, index) {

  // Get the specific graphs id to target it!
  var graphId = '#graph' + index;
  var labelId = '#label' + index;

  var data = Object.keys(languages).map(key => languages[key]);
  var labels = Object.keys(languages);

  // If there are more than 5 languages, only graph the first 5
  if (data.length > 5) {
    data = data.slice(0, 5);
    labels = labels.slice(0, 5);
  }

  var margin = {top: 0, right: 10, bottom: 0, left: 0}

  var width = 500 - margin.left - margin.right,
      barHeight = 25;

  var x = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, width]);

  var chart = d3.select(graphId)
      .attr("width", width + margin.left + margin.right)
      .attr("height", (barHeight * data.length) + margin.top + margin.bottom)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bar.append("rect")
      .attr("width", x)
      .attr("height", barHeight - 1)
      .attr("transform", "translate(100)");

  bar.append("text")
      .attr("x", 0)
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d + " bytes"; });

      labels.forEach(function(label) {
        $(labelId).append(`<li>${label}</li>`);
      });
}
