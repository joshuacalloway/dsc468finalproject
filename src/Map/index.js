import React from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'
import statesData from './us-states'

function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`;

class Map extends React.Component {
    componentDidMount() {
        this.map = L.map('map', {
            center: [51.505, -0.09],
            zoom: 13,
            zoomControl: false
        }).setView([37.8, -96], 4)

        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
            detectRetina: true,
            id: 'mapbox/light-v9',
            maxZoom: 20,
            maxNativeZoom: 17,
            tileSize: 512,
            zoomOffset: -1
            
        }).addTo(this.map)
    

        L.geoJson(statesData, {
            style: style,

        }).addTo(this.map)
    };

    render(){
            return (<Wrapper width='1280px' height='720px' id='map' />)
        }
    }


export default Map