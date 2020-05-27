import React, {
    useEffect,
    useRef
} from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

import createStateSummary from "./updatedLine/createStateSummary";
import DrawLine from "./updatedLine/DrawLine";
import MapVis from "./HexagonMap/drawMap";

function Combined({geojson,covidjson}) {

    //call component 
    useEffect(() => {
       Draw(geojson,covidjson)
    })

    const canvasRef = useRef();

    const Draw = function(geojson,covidjson){
        let MC=MapVis(geojson,covidjson,canvasRef);
        MC.DrawMap();

        MC.dispatch.on("selected",function(data){
            console.log('passed data is',data)
            let totalStateSummary=createStateSummary(covidjson,data,"confirmed");
            DrawLine(totalStateSummary,canvasRef);});
    }

    return <StyledDiv ref={canvasRef}></StyledDiv>;
}
const StyledDiv = styled.div`    
    background-color: None;

    
`;
export default Combined;
