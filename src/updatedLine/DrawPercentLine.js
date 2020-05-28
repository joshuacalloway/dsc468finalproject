
import * as d3 from 'd3';



const DrawPercentLine = (data,canvasRef) => {

    
   
    
    //const canvasRef = useRef();

    const drawLine = data => {

        let canvas_width = 800;
        let canvas_height = 400;
        d3.select(canvasRef.current).select('#percentline').remove()
       
        var svg = d3.select(canvasRef.current).append("svg").attr('id','percentline')
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
        let parseDate = d3.timeParse('%Y-%m-%d');
        let formatPercent = d3.format(".0%");
        let color = d3.scaleOrdinal(d3.schemeCategory10);
        const x = d3.scaleTime()
            .domain(d3.extent(data[0].values, d => parseDate(d.date)))
            .range([0, width]);

        let ymax = 0;
        let ymin=100;
        let open = true;
        let dates = [];
        let dates_content = [];
        for (let i = 0; i < data.length; i++) {
            let values = data[i].values;
            for (let j = 0; j < values.length; j++) {
                let v = values[j].value;
                if (open) {
                    dates.push(parseDate(values[j].date));
                    dates_content.push(values[j].date);
                }
                console.log(v)
                if (v > ymax) {
                    ymax = v;
                }
                if(v<ymin){
                    ymin=v;
                }
            }
            open = false;
        }
        const y = d3.scaleLinear()
            .domain([ymin, ymax])
            .range([height, 0]);


        const line = d3.line().x(d => x(parseDate(d.date))).y(d => y(d.value));

        const chart = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



        // Add the axes and a title
        const xAxis = d3.axisBottom(x).ticks(6);
        const yAxis = d3.axisLeft(y).tickFormat(formatPercent);
        chart.append('g').call(yAxis);
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
            .style('fill','white')
            .style('font-size','10px');
        d3.select(canvasRef.current).select('#percenttooltip').remove()
        d3.select(canvasRef.current).append('div').attr('id', 'percenttooltip')
            .style('position', 'absolute')
            .style('background-color', 'lightgray')
            .style('padding', '5px');

        var lineOpacity = 1;
        var lineStroke = "2px";
        let tipBox;
        let tooltipLine = chart.append('line');
        const tooltip = d3.select('#percenttooltip');
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
            let date = dates[i];

            tooltipLine.attr('stroke', 'black')
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
                .html(d => d.state + ': ' + formatPercent(d.values[i].value));
            
        }
        //d3.select(canvasRef.current).select('#stateline').remove()
    }
    drawLine(data);
    
}

 
export default DrawPercentLine;
