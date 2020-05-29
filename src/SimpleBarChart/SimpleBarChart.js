import React, { useRef } from 'react';
import styled from 'styled-components';
import Bar from './Bar'

const SimpleBarChart = ({ data, tooltipsEnabled }) => {
    const svgRef = useRef(null)
    const chartRef = useRef(null)

    return (
        <StyledDiv ref={chartRef}>
            <svg ref={svgRef} id="bar" width="800" height="200">
                <g>
                    {data.map((item, index) =>
                        <Bar value={item.value} label={item.label} position={index} tooltipsEnabled={tooltipsEnabled} />
                    )}
                </g>
            </svg>
        </StyledDiv>
    );
}

export default SimpleBarChart;

// bar.css
const StyledDiv = styled.div`
.barlabel {
    font: 10px sans-serif;
    fill: lightgrey;
  }
  
  .bar {
    fill: steelblue;
  }
`