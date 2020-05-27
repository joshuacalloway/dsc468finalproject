import React, {useState, useEffect} from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip';

const CovidCalendar = ({ data, startDate, endDate }) => {
    const [calendarData, setCalendarData] = useState([])


    useEffect(() => {
        console.log("useEffect in CovidCalendar, data is : ", data)
        if (data) {
            setCalendarData(data)
        }
    }, [data])

    console.log("CovidCalendar, calendarData: ", calendarData)

    return <>
        <StyledCalendar><CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={calendarData}
            classForValue={(value) => value && value.count < 500? 'green' : 'red'}
            tooltipDataAttrs={value => {
                return {
                    'data-tip': `${JSON.stringify(value)} --> ${value.date} has count: ${
                        value.count
                        }`,
                };
            }} />
            </StyledCalendar>

        <ReactTooltip />
    </>

}

export default CovidCalendar

const StyledCalendar = styled.div`
    width:400px;
    height:300px;
    padding-left: 5rem;
    padding-top: 2rem;
    padding-bottom: 5rem;
`