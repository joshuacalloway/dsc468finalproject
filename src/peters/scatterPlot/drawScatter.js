import calc_sum from "./rateCompute";
import compute_rate from "./rateCompute";
import * as d3 from 'd3';
let ScatterVis = function (covidjson) {

    var newScatter = {
        dispatch: d3.dispatch('selected'),
        statesClicked: [],
        drawScatter: function (data, canvasRef) {
            let rates = compute_rate(data, covidjson)
            console.log('rates is ', rates)
            let margin = {
                top: 20,
                right: 200,
                bottom: 30,
                left: 50
            }
            let xmax = 0
            let ymax = 0
            let zmax = 0
            let zmin = 100000000;
            for (let i = 0; i < rates.length; i++) {
                let xv = rates[i]['hospital_rate'];
                let yv = rates[i]['death_rate'];
                let zv = rates[i]['confirmed_toll'];
                if (xv > xmax) {
                    xmax = xv
                };
                if (yv > ymax) {
                    ymax = yv
                };
                if (zv > xmax) {
                    zmax = zv
                };
                if (zmin > zv) {
                    zmin = zv
                };
            }
            console.log('xmax is ', xmax)
            d3.select(canvasRef.current).select('#scatterplot').remove();
            let canvas_width = 960;
            let canvas_height = 500;
            let svg = d3.select(canvasRef.current).append('svg').attr('id', 'scatterplot')
            svg.attr("width", canvas_width).attr("height", canvas_height);

            let width = canvas_width - margin.left - margin.right;
            let height = canvas_height - margin.top - margin.bottom;

            var formatPercent = d3.format(".0%");



            let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            //var parseTime = d3.timeParse("%d-%b-%y");

            let x = d3.scaleLinear()
                .domain([0, xmax + 0.05])
                .range([0, width]);

            let y = d3.scaleLinear()
                .domain([0, ymax + 0.05])
                .range([height, 0]);

            let z = d3.scaleSqrt()
                .domain([0, 20000])
                .range([2, 8]);
            let color = d3.scaleOrdinal(d3.schemeCategory10);
            let xAxis = d3.axisBottom(x).tickFormat(formatPercent)
            g.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")
                .attr("fill", "white")
                .attr("x", width)
                .attr("dy", "3em")
                .attr("text-anchor", "end")
                .text("Hospitalized Rate");

            var legend = svg.selectAll('#scatterplot.legend')
                .data(rates)
                .enter()
                .append('g')
                .attr('class', 'legend');

            legend.append('rect')
                .attr('x', canvas_width - 200)
                .attr('y', function (d, i) {
                    return i * 20 + 40;
                })
                .attr('width', 10)
                .attr('height', 10)
                .style('fill', function (d, i) {
                    return color(i);
                });

            legend.append('text')
                .attr('x', canvas_width - 188)
                .attr('y', function (d, i) {
                    return (i * 20) + 49;
                })
                .text(function (d) {
                    return d.state;
                })
                .style('fill', 'white')
                .style('font-size', '10px');
            let yAxis = d3.axisLeft(y).tickFormat(formatPercent)
            g.append("g")
                .call(yAxis)
                .append("text")
                .attr("fill", "white")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Death Rate");

            d3.select(canvasRef.current).select('#scattertooltip').remove();
            let tooltip = d3.select(canvasRef.current).append('div').attr('id', 'scattertooltip').style('opacity', 0)
            let tipMouseover = function (d, i) {
                var co = color(i);
                var html = "<span style='color:" + co + ";'>" + d.state + "</span><br/>" +
                    "<b>" + "death rate:" + formatPercent(d.death_rate) + "</b><br/>" +
                    "<b>" + "hospitalized rate:" + formatPercent(d.hospital_rate) + "</b><br/>" +
                    "<b>" + "Confirmed Cases:" + d.confirmed_toll + "</b><br/>";

                tooltip.html(html)
                    .style('display','block')
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
                    .transition()
                    .duration(200) // ms
                    .style("opacity", .9) // started as 0!

            };


            let tipMouseout = function (d) {
                tooltip.transition()
                    .duration(300) // ms
                    .style("opacity", 0); // don't care about position!
            };

            g.selectAll(".circles")
                .data(rates)
                .enter().append('g')
                .attr("class", "circles")

                .append("circle")

                .attr("cx", function (d) {
                    console.log('hospital rate is ', x(d.hospital_rate));
                    return x(d['hospital_rate']);
                })
                .attr("cy", function (d) {
                    console.log('death rate is ', y(d.death_rate));
                    return y(d.death_rate);
                })
                .attr("r", d => z(d.confirmed_toll))
                .style("fill", (d, i) => color(i))
                .on("mouseover", function (d, i) {
                    d3.select(this)
                        .style("cursor", "pointer")
                    //.style("fill", 'white')
                    tipMouseover(d, i);


                })
                .on("mouseout", function (d, i) {
                    console.log('this is:', this);
                    d3.select(this)
                        .style("cursor", "none")
                        //.style("fill", (d,i)=>color(i))
                        .transition()
                        .duration(100)
                    tipMouseout(d);
                });









            // .on('click', function (d) {
            //         d3.select(this).select('circle')
            //             .attr('fill', 'red');
            //         let notexist = true;
            //         let newdata = [];

            //         for (let i = 0; i < newScatter.data.length; i++) {
            //             let point = newScatter.data[i];
            //             if (point.id !== d.id) {
            //                 newdata.push(point);
            //             } else {
            //                 notexist = false;
            //                 d3.select(this).select('circle')
            //                     .attr('fill', 'green');

            //             }
            //         }
            //         if (notexist) {
            //             newdata.push(d);

            //         }

            //         newScatter.data = newdata;
            //         newScatter.dispatch.call("selected", {}, newScatter.data);

            //     }


            // )

        }


    }
    return newScatter;
}
export default ScatterVis;