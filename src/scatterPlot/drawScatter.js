import calc_sum from "./rateCompute";
import compute_rate from "./rateCompute";
import * as d3 from 'd3';
let ScatterVis = function (confirm, death, recovered) {
    
    var newScatter = {
        dispatch: d3.dispatch('selected'),
        statesClicked: [],
        drawScatter: function (data, canvasRef) {
            let rates = compute_rate(data, confirm, death, recovered)
            console.log('rates is ',rates)
            let margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            }
            let xmax = 0
            let ymax = 0
            let zmax = 0
            let zmin = 100000000;
            for (let i = 0; i < rates.length; i++) {
                let xv = rates[i]['recover_rate'];
                let yv = rates[i]['death_rate'];
                let zv = rates[i]['confirmed_toll'];
                if (xv > xmax) {xmax = xv};
                if (yv > ymax) {ymax = yv};
                if (zv > xmax) {zmax = zv};
                if (zmin > zv) {zmin = zv};
            }
            console.log('xmax is ',xmax)
            d3.select(canvasRef.current).select('#scatterplot').remove();

            let svg=d3.select(canvasRef.current).append('svg').attr('id','scatterplot')
            svg.attr("width", 960).attr("height", 500);

            let width = 960 - margin.left - margin.right;
            let height = 500 - margin.top - margin.bottom;
            

           
            let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            //var parseTime = d3.timeParse("%d-%b-%y");

            let x = d3.scaleLinear()
                .domain([0, xmax+5])
                .range([0, width]);

            let y = d3.scaleLinear()
                .domain([0,ymax+5])
                .range([0, height]);

            let z = d3.scaleSqrt()
                .domain([zmin, zmax])
                .range([4, 10]);
            let color = d3.scaleOrdinal(d3.schemeCategory10);
                
            g.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))



            g.append("g")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Y");

            g.selectAll(".circles")
                .data(rates)
                .enter().append('g')
                .attr("class", "circles")

                .append("circle")

                .attr("cx", function (d) {
                    console.log('recover rate is ',x(d.recover_rate));
                    return x(d['recover_rate']);
                })
                .attr("cy", function (d) {
                    console.log('death rate is ',y(d.death_rate));
                    return y(d.death_rate);
                })
                .attr("r", d =>z(d.confirmed_toll))
                .style("fill", (d,i)=>color(i))
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("cursor", "pointer")
                        .style("fill", 'white')
                        .append("text")
                        .attr("class", "text")
                        .text(`${d.state}`)
                        .attr("x", d => x(d.recover_rate))
                        .attr("y", d => y(d.death_rate) - 5);
                        
                })
                .on("mouseout", function (d) {
                    console.log('this is:', this);
                    d3.select(this)
                        .style("cursor", "none")
                        .style("fill", (d,i)=>color(i))
                        .transition()
                        .duration(100)
                        .selectAll(".text").remove();
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