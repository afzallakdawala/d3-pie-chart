function pie_chart_init() {

  var pie = d3.layout.pie().value(function(d) { return d["datapoint"];});  

  var outerRadius = piechart.width / 2;
  var innerRadius = generate_donut();

  var arc  = generate_arc(outerRadius, innerRadius);
  var svg  = generate_svg();
  var arcs = generate_arcs(pie, svg, outerRadius, innerRadius);

  generate_colors(arcs, arc);
  generate_text(arcs, arc);

}

function generate_donut() {
  
  if (piechart.donut.create) {
    return piechart.width / piechart.donut.radius;
  }else {
    return 0;
  }

}

function generate_arc(outerRadius, innerRadius) {
  return d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
}

function generate_svg() {
  return  d3.select("#"+piechart.div_id)
            .append("svg")
            .attr("width", piechart.width)
            .attr("height", piechart.height);
}

function generate_arcs(pie, svg, outerRadius, innerRadius) {

  return  svg.selectAll("g.arc")
          .data(pie(piechart.data))
          .enter()
          .append("g")
          .attr("class", "arc")
          .attr("transform", "translate(" + outerRadius +
                ", " + outerRadius + ")");
}

function generate_colors(arcs, arc) {

  if (piechart.automated_color) {
    var color = d3.scale.category10();
  }

  var data = piechart.data;
  return arcs.append("path")
        .attr("fill", function(d, i) {

                        if (piechart.automated_color) {
                          return color(i);    
                        }else {
                          return d.data["color"];
                        }

                      
    }).transition()
      .delay(function(d, i) {
              return i * 100;
              })
      .duration(1300)
    .attr("d", arc)        

;

}

function generate_text(arcs, arc) {
  var data = piechart.data;
  return arcs.append("text")
          .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr("text-anchor", "middle")
          .text(function(d) {
            return d.data["name"] ;
          })
          
          .attr("class", "tool")
          .attr("tooltip", function(d) {

            return d.data["tooltip"]; })
          ;
}