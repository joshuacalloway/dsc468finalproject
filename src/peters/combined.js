import React, {
    useEffect,
    useRef
} from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import axios from 'axios';
import createStateSummary from "./updatedLine/createStateSummary";
import DrawLine from "./updatedLine/DrawLine";
import MapVis from "./HexagonMap/drawMap";
import ScatterVis from "./scatterPlot/drawScatter";
import createChangeSummary from "./updatedLine/createChangeSummary";
import DrawPercentLine from "./updatedLine/DrawPercentLine";
function Combined({geojson,covidjson,deaths,recovered}) {

    //call component 
    useEffect(() => {
        const link='https://covidtracking.com/api/v1/states/daily.json';
        axios.get(link)
        .then(response => {
            Draw(geojson,response.data)
        }, error => {
            console.log(error);});
       
    },[geojson])

    const canvasRef = useRef();

    const Draw = function(geojson,data){
        let MC=MapVis(geojson,data,canvasRef);
        MC.DrawMap();
        let SV=ScatterVis(data);
        
        
        
        MC.dispatch.on("selected",function(states){
            let totalStateSummary=createStateSummary(data,states,"positiveIncrease");
            let tataldeathSummary=createStateSummary(data,states,"deathIncrease");
            let totalhospitalSummary=createStateSummary(data,states,"hospitalizedIncrease");
            let summary={};
            summary['confirmed']=totalStateSummary;
            summary['deaths']=tataldeathSummary;
            summary['hospitalized']=totalhospitalSummary;
            console.log('passed data is',data)
            
            DrawLine(summary,canvasRef);
            
            let totalPercentSummary=createChangeSummary(data,states,"positiveIncrease");
            let PercentdeathSummary=createChangeSummary(data,states,"deathIncrease");
            let PercenthospitalSummary=createChangeSummary(data,states,"hospitalizedIncrease");
            let psummary={};
            psummary['confirmed']=totalPercentSummary;
            psummary['deaths']=PercentdeathSummary;
            psummary['hospitalized']=PercenthospitalSummary;
            
            DrawPercentLine(psummary,canvasRef)
            
            SV.drawScatter(states,canvasRef);
        });
            

    }

    return <StyledDiv ref={canvasRef}></StyledDiv>;
}
const StyledDiv = styled.div`    
    background-color: None;

    
`;
export default Combined;
