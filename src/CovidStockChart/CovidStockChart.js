import React from 'react'
import SparklineSvg from 'sparkline-svg';

const CovidStockChart = ({
    decimals = 4,
    desc = 'A line graph representation of a value\'s change over time.',
    fill = 'transparent',
    height = '100%',
    preserveAspectRatio = 'none',
    stroke = 'currentColor',
    strokeWidth = '1%',
    title = 'Sparkline',
    values,
    viewBoxHeight = 100,
    viewBoxWidth = 100,
    width = '100%',
}) => {
    const sparkline = new SparklineSvg(values);
    sparkline.setDecimals(decimals);
    sparkline.setViewBoxHeight(viewBoxHeight);
    sparkline.setViewBoxWidth(viewBoxWidth);
    
    return (
        <svg
            height={height}
            preserveAspectRatio={preserveAspectRatio}
            version="1.1"
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            x="0px"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            y="0px"
            width={width}
        >
            <title>{title}</title>
            <desc>{desc}</desc>
            // Do not render any path if there are no values.
        values.length > 0 &&
            <>
                {

                    // Do not render a fill path if the fill color is transparent.
                    fill !== 'transparent' &&
                    <path
                        d={
                            sparkline.d +
                            ` L ${viewBoxWidth},${viewBoxHeight}` +
                            ` L 0,${viewBoxHeight} Z`
                        }
                        fill={fill}
                        stroke="transparent"
                        strokeWidth="0"
                    />
                }
                <path
                    d={sparkline.d}
                    fill="transparent"
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                />
            </>
        </svg>
    );
}

export default CovidStockChart

