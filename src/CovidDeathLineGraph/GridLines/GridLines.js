import React from 'react'
import HorizontalGridLine from './HorizontalGridLine'
import ShadeHorizontal from './ShadeHorizontal'

const GridLines = ({yfunction, width, height, marginTop, marginLeft, marginRight}) => {

    return (
        <>
            <g>
                <ShadeHorizontal from={0} to={20000} yfunction={yfunction} width={width} marginLeft={marginLeft} marginRight={marginRight}/>
                <HorizontalGridLine value={10000} yfunction={yfunction} width={width} marginLeft={marginLeft} marginRight={marginRight}/>
                <HorizontalGridLine value={30000} yfunction={yfunction} width={width} marginLeft={marginLeft} marginRight={marginRight}/>
                <HorizontalGridLine value={50000} yfunction={yfunction} width={width} marginLeft={marginLeft} marginRight={marginRight}/>
                <ShadeHorizontal from={40000} to={60000} yfunction={yfunction} width={width} marginLeft={marginLeft} marginRight={marginRight}/>

                <HorizontalGridLine value={70000} yfunction={yfunction} width={width} marginLeft={marginLeft} marginRight={marginRight}/>
                <HorizontalGridLine value={90000} yfunction={yfunction} width={width} marginLeft={marginLeft} marginRight={marginRight}/>
                <ShadeHorizontal from={80000} to={100000} yfunction={yfunction} width={width} marginLeft={marginLeft} marginRight={marginRight}/>

            </g>
        </>
    )
}

export default GridLines