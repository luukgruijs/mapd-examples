"use strict"

const count = require("./charts/count");

const createCharts = (crossFilter) => {

    // call all the charts
    count(crossFilter);


    // render all the charts
    dc.renderAllAsync();
}

const init = () => {
    new MapdCon()
      .protocol("https")
      .host("metis.mapd.com")
      .port("443")
      .dbName("mapd")
      .user("mapd")
      .password("HyperInteractive")
      .connect(function(error, con) {
         crossfilter.crossfilter(con, "flights_donotmodify").then(createCharts)
    });
}

document.addEventListener('DOMContentLoaded', init, false);
