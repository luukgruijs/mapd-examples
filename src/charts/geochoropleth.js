module.exports = (crossFilter, width, height, colors) => {

    d3.json('http://dc-js.github.io/dc.js/geo/us-states.json', (states) => {
        const dimension = crossFilter.dimension("dest_state")
        const group = dimension.group().reduceCount();

        const colors = d3.scale.quantize().domain([0, 50000]).range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]);
    
        const geochoroplethChart = dc.geoChoroplethChart('#geochoropleth-chart')
            .width(width)
            .height(height/1)
            .dimension(dimension)
            .group(group)
            .title('Destination state')
            .colorDomain([0, 200])
            .colorCalculator(function (d) { 
                return d ? colors(d) : '#ccc';
            })
            .overlayGeoJson(states.features, "state", function (d) {
                return d.properties.name;
            })
            .valueAccessor(function(kv) {
                return kv.val;
            })
    })
}