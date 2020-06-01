

import createStateSummary from "./updatedLine/createStateSummary";
import createChangeSummary from "./updatedLine/createChangeSummary";
const states=['California','Iowa','Illinois'];

const computeSummaryForCombined = (geojson, covidjson) => {
    let totalStateSummary = createStateSummary(covidjson, states, "positiveIncrease");
    let tataldeathSummary = createStateSummary(covidjson, states, "deathIncrease");
    let totalhospitalSummary = createStateSummary(covidjson, states, "hospitalizedIncrease");
    let summary = {};
    summary['confirmed'] = totalStateSummary;
    summary['deaths'] = tataldeathSummary;
    summary['hospitalized'] = totalhospitalSummary;
    console.log('passed data is', covidjson)


    let totalPercentSummary = createChangeSummary(covidjson, states, "positiveIncrease");
    let PercentdeathSummary = createChangeSummary(covidjson, states, "deathIncrease");
    let PercenthospitalSummary = createChangeSummary(covidjson, states, "hospitalizedIncrease");
    let psummary = {};
    psummary['confirmed'] = totalPercentSummary;
    psummary['deaths'] = PercentdeathSummary;
    psummary['hospitalized'] = PercenthospitalSummary;

    return psummary
}

export default computeSummaryForCombined;