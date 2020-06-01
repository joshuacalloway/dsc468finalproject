import * as d3 from 'd3';
import React, {
    useEffect,
    useRef
} from 'react';
import styled from 'styled-components';


const getYmax=function(data){
    let ymax = 0;
    let ymin=100000000000;
        
        
        for (let i = 0; i < data.length; i++) {
            let values = data[i].values;
            for (let j = 0; j < values.length; j++) {
                let v = values[j].value;
                if(v<ymin){
                    ymin=v;
                }
                if (v > ymax) {
                    ymax = v;
                }
            }
            
        }
    return [ymax,ymin];
}


const DrawLine = ({summary, width, height}) => {

    useEffect(() => {
        summary && summary.confirmed && draw(summary, width, height);
    }, [height, summary, width])
    const canvasRef = useRef();

    const draw = (summary, widthParam, heightParam) => {
        let data=summary.confirmed;
        let canvas_width = widthParam;
        let canvas_height = heightParam;
        d3.select(canvasRef.current).select('#lineButton').remove();
        d3.select(canvasRef.current).append('select')
        .attr('id', 'lineButton')
        .style('position','absolute')
        .style("left", "100px")
        .style("top", "500px");
        let allGroup = ["confirmed", "deaths", "hospitalized"];
        d3.select("#lineButton")
            .selectAll('myOptions')
            .data(allGroup)
            .enter()
            .append('option')
            .text(function (d) {
                return d;
            }) // text showed in the menu
            .attr("value", function (d) {
                return d;
            })

        d3.select(canvasRef.current).select('#stateline').remove()
        var svg = d3.select(canvasRef.current).append("svg").attr('id', 'stateline')
        svg.attr('width', canvas_width).attr('height', canvas_height);
        const margin = {
            top: 20,
            right: 120,
            bottom: 30,
            left: 40
        };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // Define the scales and tell D3 how to draw the line
        let parseDate =d3.timeParse('%Y%m%d');

        let color = d3.scaleOrdinal(d3.schemeCategory10);
        let maxlength=0;
        let maxi=0;
        for(let i=0;i<data.length;i++){
            let length=data[i].values.length;
            if(length>maxlength){
                maxi=i;
                maxlength=length;
            }

        }
        let x = d3.scaleTime()
            .domain(d3.extent(data[maxi].values, d => parseDate(d.date)))
            .range([0, width]);
        
        let ymax = 0;
        let open = true;
        let dates = [];
        let dates_content = [];
        for (let i = 0; i < data.length; i++) {
            let values = data[i].values;
            for (let j = 0; j < values.length; j++) {
                let v = values[j].value;
                if (open && i==maxi) {
                    dates.push(parseDate(values[j].date));
                    dates_content.push(values[j].date);
                }
                console.log(v)
                if (v > ymax) {
                    ymax = v;
                }
            }
            open = false;
        }
        let y = d3.scaleLinear()
            .domain([0, ymax])
            .range([height, 0]);


        const line = d3.line().x(d => x(parseDate(d.date))).y(d => y(d.value));

        const chart = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



        // Add the axes and a title
        const xAxis = d3.axisBottom(x).ticks(6);
        let yAxis = d3.axisLeft(y);
        chart.append('g').attr('id','yaxis').call(yAxis);
        chart.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
        //chart.append('text').html('Cases Over Time').attr('x', 200);

        // Load the data and draw a chart

        var legend = svg.selectAll('.legend')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'legend');

        legend.append('rect')
            .attr('x', canvas_width - 100)
            .attr('y', function (d, i) {
                return i * 20 + 40;
            })
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', function (d, i) {
                return color(i);
            });

        legend.append('text')
            .attr('x', canvas_width - 88)
            .attr('y', function (d, i) {
                return (i * 20) + 49;
            })
            .text(function (d) {
                return d.state;
            })
            .style('fill', 'white')
            .style('font-size', '10px');
        d3.select(canvasRef.current).select('#tooltip').remove()
        d3.select(canvasRef.current).append('div').attr('id', 'tooltip')
            .style('position', 'absolute')
            .style('background-color', 'lightgray')
            .style('padding', '5px');



        var lineOpacity = 1;
        var lineStroke = "2px";
        let tipBox;
        let tooltipLine = chart.append('line');
        const tooltip = d3.select('#tooltip');
        chart.selectAll('.lines')
            .data(data).enter().append('g')
            .attr('class', 'lines')
            .attr('id', function (d, i) {
                return 'line-' + i;
            })
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', function (d, i) {
                return color(i)
            })
            .attr('stroke-width', 2)
            .datum(d => d.values)
            .attr('d', line);

        d3.select("#lineButton").on("change", function (d) {
            // recover the option that has been chosen
            var selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
            update(selectedOption)
        })

        // A function that update the chart
        function update(selectedGroup) {

            // Create new data with the selection?
            let lookup={};
            data=summary[selectedGroup]
            let ys=getYmax(data);
            let ymin=ys[1];
            let ymax=ys[0];
            y = d3.scaleLinear()
            .domain([ymin, ymax])
            .range([height, 0]);
            yAxis = d3.axisLeft(y);
            chart.select('#yaxis').remove();
            chart.append('g').attr('id','yaxis').call(yAxis);
            console.log('change data',data)
            // Give these new data to update line
            chart.selectAll('.lines').remove();
            chart.selectAll('.lines')
                .data(data).enter().append('g')
                .attr('class', 'lines')
                .attr('id', function (d, i) {
                    return 'line-' + i;
                })
                .append('path')
                .attr('fill', 'none')
                .attr('stroke', function (d, i) {
                    return color(i)
                })
                .attr('stroke-width', 2)
                .datum(d => d.values)
                .attr('d', line);
        }



        tipBox = chart.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('opacity', 0)
            .on('mousemove', drawTooltip)
            .on('mouseout', removeTooltip);

        function removeTooltip() {
            if (tooltip) tooltip.style('display', 'none');
            if (tooltipLine) tooltipLine.attr('stroke', 'none');
        }
        let bisectDate = d3.bisector(function (d) {
            return d;
        }).left

        function drawTooltip() {
            let coord = d3.mouse(tipBox.node());
            console.log('coord', coord);
            let x0 = x.invert(coord[0]);
            console.log('x0', x0);
            console.log('dates', dates);
            let i = bisectDate(dates, x0, 1);
            console.log('i is ',i)

            let date = dates[i];

            tooltipLine.attr('stroke', 'white')
                .attr('x1', x(date))
                .attr('x2', x(date))
                .attr('y1', 0)
                .attr('y2', height);

            tooltip.html(dates_content[i])
                .style('display', 'block')
                .style('left', (d3.event.pageX + 20) + 'px')
                .style('top', (d3.event.pageY - 20) + 'px')
                .selectAll()
                .data(data).enter()
                .append('div')
                .style('color', (d, i) => color(i))
                .html(d => d.state + ': ' + d.values[i].value);

        }
    }
    return <StyledDiv ref={canvasRef}></StyledDiv>;
}
const StyledDiv = styled.div`    
    background-color: None;
    border:1px solid pink;
    width: 100%;
    height: 100%; 
    
`;


export default DrawLine;