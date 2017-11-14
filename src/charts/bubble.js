module.exports = (crossFilter, width, height, colors) => {
    const dimension = crossFilter.dimension("carrier_name");
    
    const reduceMultiExpression1 = [{
        expression: "depdelay",
        agg_mode:"avg",
        name: "x"
      },
      {
        expression: "arrdelay",
        agg_mode:"avg",
        name: "y"
      },
      {
        expression: "*",
        agg_mode:"count",
        name: "size"
      }];

      const group = dimension.group().reduce(reduceMultiExpression1).order("size");

      const popupHeader = [
        { type: "dimension", label: 'carrier_name' },
        { type: "measure", label: 'depdelay', alias: 'x' },
        { type: "measure", label: 'arrdelay', alias: 'y' },
      ];

      const bubbleChart = dc.bubbleChart('.bubble-chart')
        .width(width/2)
        .height(height/1.5)
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .cap(15)
        .othersGrouper(false)
        .keyAccessor(function (d) {
            return d.x;
        })
        .valueAccessor(function (d) {
            return d.y;
        })
        .radiusValueAccessor(function (d) {
            return d.size;
        })
        .colorAccessor(function(d) {
            return d.key0;
        })
        .maxBubbleRelativeSize(0.04)
        .transitionDuration(500)
        .xAxisLabel('Departure Delay')
        .yAxisLabel('Arrival Delay')
        .setPopupHeader(popupHeader)
        .elasticX(true)
        .elasticY(true)
        .xAxisPadding('15%')
        .yAxisPadding('15%')
        .ordinalColors(colors)
        .dimension(dimension)
        .group(group);

        const setScales = function(chart, type){
            chart.on(type, function(chart) {
              chart.x(d3.scale.linear().domain(d3.extent(chart.data(), chart.keyAccessor())));
              chart.xAxis().scale(chart.x()).tickFormat(d3.format(".2s"))
              chart.y(d3.scale.linear().domain(d3.extent(chart.data(), chart.valueAccessor())));
              chart.r(d3.scale.linear().domain(d3.extent(chart.data(), chart.radiusValueAccessor())));
            });
        }
    
        setScales(bubbleChart, "preRender");
        setScales(bubbleChart, "preRedraw");
}