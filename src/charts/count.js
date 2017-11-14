module.exports = (crossFilter) => {
    const group = crossFilter.groupAll();
    const countWidget = dc.countWidget(".data-count")
        .dimension(crossFilter)
        .group(group);
}
