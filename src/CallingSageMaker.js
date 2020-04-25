import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// this calls SageMaker
// https://aws.amazon.com/blogs/machine-learning/call-an-amazon-sagemaker-model-endpoint-using-amazon-api-gateway-and-aws-lambda/
const CallingSageMaker = () => {
    const [sageMakerResult, setSageMakerResult] = useState(null);

     // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        callSageMaker()
    });
    const url = "https://32glz6r6nb.execute-api.us-east-2.amazonaws.com/dev/predictbreastcancer";
    const data = {"data":"13.49,22.3,86.91,561.0,0.08752,0.07697999999999999,0.047510000000000004,0.033839999999999995,0.1809,0.057179999999999995,0.2338,1.3530000000000002,1.735,20.2,0.004455,0.013819999999999999,0.02095,0.01184,0.01641,0.001956,15.15,31.82,99.0,698.8,0.1162,0.1711,0.2282,0.1282,0.2871,0.06917000000000001"}

    const callSageMaker = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                const { errorMessage, errorType } = data;
                if (errorMessage) {
                    setSageMakerResult(errorMessage)
                    console.log(errorType)
                } else {
                    setSageMakerResult(data)
                }
            });
    }
    return <StyledDiv>
        <h1>Calling aws Sagemaker url {url}</h1>
        <div>with data {JSON.stringify(data)}</div>
        <div className="blinking">
            SageMaker Result: {sageMakerResult}
        </div>
    </StyledDiv>;
}

const StyledDiv = styled.div`    
    .blinking{
        animation:blinkingText 1.2s infinite;
    }
    @keyframes blinkingText{
        0%{     color: green;    }
        49%{    color: red; }
        60%{    color: transparent; }
        99%{    color: transparent;  }
        100%{   color: white;    }
    }
`
export default CallingSageMaker