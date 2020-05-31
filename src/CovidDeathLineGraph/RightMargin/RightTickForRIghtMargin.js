import React from 'react'

const RightTickForRightMargin = ({value, yfunction}) =>
{
    const formatted = value < 1000 ? value : `${Math.round(value / 1000)}K`

    return (
        <g class="tick" opacity="1" transform={`translate(0,${yfunction(value)})`}>
        <line stroke="currentColor" x2="6"></line><text fill="currentColor" x="9" dy="0.32em">{formatted}</text>
    </g>
    )

}
export default RightTickForRightMargin