module.exports = (crossFilter, width, height, colors, bounds) => {

    const dimension = crossFilter.dimension("dep_timestamp");
    const group = dimension.group().reduceAvg('distance');

    const lineChart = dc.lineChart('.line-chart')
        .width(width/2)
        .height(height/1.5)
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .brushOn(true)
        .yAxisLabel('Average distance')
        .dimension(dimension)
        .group(group)
        .binParams({
            timeBin: 'week',
            binBounds: [bounds.deptime_minimum, bounds.deptime_maximum]
        });

    /* Set the x and y axis formatting with standard d3 functions */

    lineChart
        .x(d3.time.scale.utc().domain([bounds.deptime_minimum, bounds.deptime_maximum]))
        .yAxis().ticks(2);

    lineChart
        .xAxis()
        .scale(lineChart.x())
        .tickFormat(dc.utils.customTimeFormat);

}
