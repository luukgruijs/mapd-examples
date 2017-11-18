"use strict"

const count = require("./charts/count");
const row = require("./charts/row");
const bubble = require("./charts/bubble");
const pie = require("./charts/pie");
const bar = require("./charts/bar");
const line = require("./charts/line");
const geochoropleth = require("./charts/geochoropleth");

const createCharts = (crossFilter) => {

    console.log(crossFilter.getColumns());

    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 50;
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 200;
    const colors = ["#22A7F0", "#3ad6cd", "#d4e666"];

    const reduceMultiExpression = [
        {
            expression: "dep_timestamp",
            agg_mode:"min",
            name: "deptime_minimum"
        },
        {
            expression: "dep_timestamp",
            agg_mode:"max",
            name: "deptime_maximum"
        },
        {
            expression: "distance",
            agg_mode:"min",
            name: "distance_minimum"
        },
        {
            expression: "distance",
            agg_mode:"max",
            name: "distance_maximum"
        }
    ];

    crossFilter
        .groupAll()
        .reduceMulti(reduceMultiExpression)
        .valuesAsync(true).then(function(bounds) {

            // call all the charts
            count(crossFilter);
            row(crossFilter, w, h, colors);
            bubble(crossFilter, w, h, colors);
            pie(crossFilter, w, h, colors);
            bar(crossFilter, w, h, colors, bounds);
            geochoropleth(crossFilter, w, h, colors);
            line(crossFilter, w, h, colors, bounds);

            // render all the charts
            dc.renderAllAsync();

        });
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
