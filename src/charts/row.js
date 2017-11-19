module.exports = (crossFilter, width, height, colors) => {
    const dimension = crossFilter.dimension("dest");
    const group = dimension.group().reduceCount();

    const rowChart = dc.rowChart(".row-chart")
        .height(height/1.5)
        .width(width/2)
        .elasticX(true)
        .cap(20)
        .othersGrouper(false)
        .ordinalColors(colors)
        .measureLabelsOn(true)
        .dimension(dimension)
        .group(group)
        .autoScroll(true);
}