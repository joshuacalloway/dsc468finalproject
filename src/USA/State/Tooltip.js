import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import ReactDOM from 'react-dom';

const Tooltip = ({ name, children, location, tooltipsEnabled, isVisible }) => {
    const [node, setNode] = useState(null);

    useEffect(() => {
        setNode(document.getElementById("ZoomApp"));
    }, []);
    if (!node) {
        return null;
    }
    
    return ReactDOM.createPortal(
        <Container
            style={{
                top: location.y,
                left: location.x,
                visibility: isVisible && tooltipsEnabled ? 'visible' : 'hidden',
            }}
        >
            <InnerContainer>{children}</InnerContainer>
        </Container>,
        node
    );
}
export default React.forwardRef(Tooltip);

const Container = styled.div`
  opacity: 1;
  border: 1px solid #cccccc;
  background-color: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  min-width: 7rem;
  position: fixed;
  flex-direction: column;
  font-size: 0.8rem;
  pointer-events: none;
  z-index: 50;

  &.attached {
    position: absolute;
    & .icon--close {
      display: none;
    }
  }
`;

const InnerContainer = styled.div`
  position: relative;
  padding: .1rem .1rem;
`;