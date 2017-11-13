module.exports = (crossFilter) => {
    var countGroup = crossFilter.groupAll();
    var countWidget = dc.countWidget(".data-count")
        .dimension(crossFilter)
        .group(countGroup);
}
