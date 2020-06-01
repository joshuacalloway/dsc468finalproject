import React, {
    useEffect,
} from 'react';
import styled from 'styled-components';
import DrawMap from "./HexagonMap/DrawMap";

const Combined = ({ covidjson, width, height, geojson, summary }) => {

    useEffect(() => {
        console.log("DrawMap covidjson is ", covidjson)
    }, [covidjson, geojson])

    return (
        <>
            <DrawMap geojson={geojson} covidjson={covidjson} />
        </>
    )
}
const StyledDiv = styled.div`    
    background-color: None;
    border:1px solid pink;
    width: 100%;
    height: 100%; 
    
`;
export default Combined;
