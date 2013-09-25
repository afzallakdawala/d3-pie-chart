function chart_init() {

  var json_data = dummy_data();
  var chart_width = 800;
  var chart_height = 600;
  var total_records = json_data.length;
  var min_value = 0;
  var max_value = 100;  

  var svg = generate_svg(chart_width, chart_height);  

  var yScale = generate_y_scale(max_value, min_value, chart_height, total_records);

  var yAxis =  generate_y_axis(yScale);

  generate_bars(svg, json_data, chart_width,chart_height, yScale);


  svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + 40 + ",0)")
  .call(yAxis);


}

function generate_svg(chart_width, chart_height) {

  return d3.select("body")
        .append("svg")
        .attr("width", chart_width)
        .attr("height", chart_height);
}

function generate_bars(svg, json_data, chart_width, chart_height, yScale) {
  return svg.selectAll("rect")
          .data(json_data)
          .enter()
          .append("rect")
          .attr("x", function(d, i) {return i * (chart_width / json_data.length);})
          .attr("y", function(d,i) {return chart_height - (d) ;})
          .attr("width", 20)

          .attr("height", function(d, i) {return i * (chart_height / json_data.length);})
          .attr("fill", "teal");
}

function generate_y_scale(max_value, min_value, chart_height, total_records) {

  return d3.scale.ordinal()
        .domain([0, max_value])
        .rangeRoundBands([0, chart_height], 0.5);

}

function generate_y_axis(yScale) {
  
  return  d3.svg.axis()
          .scale(yScale)
          .orient("left");


          
}

function dummy_data() {
  return [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                     11, 12, 15, 20, 18, 17, 16, 18, 23, 25
                    ];
}