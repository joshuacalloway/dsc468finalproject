import React, {
    useEffect,
    useRef
} from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import createStateSummary from "./updatedLine/createStateSummary";
import DrawLine from "./updatedLine/DrawLine";
import DrawMap from "./HexagonMap/drawMap";
import DrawScatter from "./scatterPlot/drawScatter";
import createChangeSummary from "./updatedLine/createChangeSummary";
import DrawPercentLine from "./updatedLine/DrawPercentLine";
function Combined({ covidjson, width, height, geojson }) {

    //call component 
    useEffect(() => {
        console.log("covidjson is ", covidjson)
        covidjson && Draw(geojson, covidjson)
    }, [covidjson, geojson])

    const canvasRef = useRef();

    const Draw = function (geojson, data) {
        DrawMap(geojson, data);
        
        

        let states=['California','Iowa','Illinois'];

        
        let totalStateSummary = createStateSummary(data, states, "positiveIncrease");
        let tataldeathSummary = createStateSummary(data, states, "deathIncrease");
        let totalhospitalSummary = createStateSummary(data, states, "hospitalizedIncrease");
        let summary = {};
        summary['confirmed'] = totalStateSummary;
        summary['deaths'] = tataldeathSummary;
        summary['hospitalized'] = totalhospitalSummary;
        console.log('passed data is', data)

        DrawLine(summary);

        let totalPercentSummary = createChangeSummary(data, states, "positiveIncrease");
        let PercentdeathSummary = createChangeSummary(data, states, "deathIncrease");
        let PercenthospitalSummary = createChangeSummary(data, states, "hospitalizedIncrease");
        let psummary = {};
        psummary['confirmed'] = totalPercentSummary;
        psummary['deaths'] = PercentdeathSummary;
        psummary['hospitalized'] = PercenthospitalSummary;

        DrawPercentLine(psummary)

        DrawScatter(data,states);
        


    }

    return <StyledDiv ref={canvasRef}></StyledDiv>;
}
const StyledDiv = styled.div`    
    background-color: None;
    border:1px solid pink;
    width: 100%;
    height: 100%; 
    
`;
export default Combined;
