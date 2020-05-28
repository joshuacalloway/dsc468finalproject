import React, {
    useEffect,
    useRef
} from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

import createStateSummary from "./updatedLine/createStateSummary";
import DrawLine from "./updatedLine/DrawLine";
import MapVis from "./HexagonMap/drawMap";
import ScatterVis from "./scatterPlot/drawScatter";
import createChangeSummary from "./updatedLine/createChangeSummary";
import DrawPercentLine from "./updatedLine/DrawPercentLine";
function Combined({geojson,covidjson,deaths,recovered}) {

    //call component 
    useEffect(() => {
       Draw(geojson,covidjson,deaths,recovered)
    })

    const canvasRef = useRef();
    
    const Draw = function(geojson,covidjson,deaths,recovered){
        let MC=MapVis(geojson,covidjson,canvasRef);
        MC.DrawMap();
        let SV=ScatterVis(covidjson,deaths,recovered);

        MC.dispatch.on("selected",function(data){
            console.log('passed data is',data)
            let totalStateSummary=createStateSummary(covidjson,data,"confirmed");
            DrawLine(totalStateSummary,canvasRef);
            console.log(totalStateSummary);
            let totalPercentSummary=createChangeSummary(covidjson,data,"confirmed");
            DrawPercentLine(totalPercentSummary,canvasRef)
            
            SV.drawScatter(data,canvasRef);
        });
            

    }

    return <StyledDiv ref={canvasRef}></StyledDiv>;
}
const StyledDiv = styled.div`    
    background-color: None;

    
`;
export default Combined;
