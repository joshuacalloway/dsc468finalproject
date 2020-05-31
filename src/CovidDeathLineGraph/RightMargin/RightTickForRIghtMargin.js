import React from 'react'

const RightTickForRightMargin = ({value, yfunction, currentDeathNumbers}) =>
{
    const formatted = value < 1000 ? value : `${Math.round(value / 1000)}K`

    const opacity = Math.abs(currentDeathNumbers - value) < 3000? 0 : 1;

    return (
        <g className="tick" opacity={opacity} transform={`translate(0,${yfunction(value)})`}>
        <line stroke="currentColor" x2="6"></line><text fill="currentColor" x="9" dy="0.32em">{formatted}</text>
    </g>
    )

}
export default RightTickForRightMargin