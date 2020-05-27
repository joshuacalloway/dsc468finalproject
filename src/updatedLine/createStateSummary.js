const createStateSummary = function (data,states,type) {
    let summary = {};
    for(let i=0;i<states.length;i++){
        let state=states[i];
        summary[state]={};
    }
    for (let i = 0; i < data.length; i++) {

        let data_point = data[i];
        let status=data_point['Status']
        let state=data_point['Province']
        if (status== type && states.includes(state)) {

            let date = data_point['Date'];
            date = date.substring(0, 10);
            if(date in summary[state]){
                summary[state][date]+=data_point['Cases'];
            } else {
                summary[state][date]=data_point['Cases'];
            }

        }
    }
    let result=[];

    for(let i=0;i<states.length;i++){
        let state=states[i];
        let values=summary[state];
        let dates=Object.keys(values);
        let stateSum={}
        stateSum['state']=state;
        stateSum['values']=[];
        for(let i=0;i<dates.length;i++){
            let date=dates[i];
            let value=values[date];
            let temp={}
            temp['date']=date;
            temp['value']=value;
            stateSum['values'].push(temp)

        }
        result.push(stateSum);
    }
    
    return result;
}

export default createStateSummary;

