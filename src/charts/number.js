module.exports = (crossFilter, height, colors) => {

    const dimension = crossFilter;
    const distanceGroup = dimension.groupAll().reduceSum("distance");
    const countGroup = dimension.groupAll().reduceCount();
    const avgAirtimeGroup = dimension.groupAll().reduceAvg("airtime");
    const avgArrDelayGroup = dimension.groupAll().reduceAvg("arrdelay");

    dc.numberChart(".number-flight-distance")
        .height(height/4)
        .dimension(dimension)
        .group(distanceGroup)
        .colors(colors);
    
    dc.numberChart(".number-flights")
        .height(height/4)
        .dimension(dimension)
        .group(countGroup)
        .colors(colors);
    
    dc.numberChart(".number-avg-airtime")
        .height(height/4)
        .dimension(dimension)
        .group(avgAirtimeGroup)
        .colors(colors);

        dc.numberChart(".number-avg-arrdelay")
        .height(height/4)
        .dimension(dimension)
        .group(avgArrDelayGroup)
        .colors(colors);
}
