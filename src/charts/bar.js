module.exports = (crossFilter, width, height, colors, bounds) => {

      const dimension = crossFilter.dimension("dep_timestamp");
      const group = dimension.group().reduceAvg('weatherdelay');

      const barChart = dc.barChart('.bar-chart')
        .width(width/2)
        .height(height/2)
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .brushOn(true)
        .dimension(dimension)
        .group(group)
        .binParams({
          timeBin: 'week',
          binBounds: [bounds.deptime_minimum, bounds.deptime_maximum]
        });

        barChart
          .x(d3.time.scale.utc().domain([bounds.deptime_minimum, bounds.deptime_maximum]))
          .yAxis().ticks(2);

        barChart
            .xAxis()
            .scale(barChart.x())
            .tickFormat(dc.utils.customTimeFormat);
}
