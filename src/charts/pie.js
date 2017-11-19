module.exports = (crossFilter, width, height, colors) => {

    const dimension = crossFilter.dimension("plane_manufacturer");
    const group = dimension.group().reduceCount();

    const pieChart = dc.pieChart('.pie-chart')
        .width(width/2)
        .height(height/1.5)
        .dimension(dimension)
        .group(group)
        .cap(7)
        .innerRadius(50);
}