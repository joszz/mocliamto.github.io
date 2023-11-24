const margin = {top: 20, right: 30, bottom: 50, left: 50},
    width = 550 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

function createBarChart(data, elementId, xValue, yValue) {
    const svg = d3.select("#" + elementId)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const processedData = data
        .sort((a, b) => new Date(a.datum) - new Date(b.datum))
        .map(d => ({date: new Date(d[xValue]), value: d[yValue]}));

    // X as
    const x = d3.scaleBand()
        .range([0, width])
        .domain(processedData.map(d => d.date))
        .padding(0.1);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%d-%m-%Y")))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Y as
    const y = d3.scaleLinear()
        .domain([0, d3.max(processedData, d => d.value)])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("bars")
        .data(processedData)
        .enter()
        .append("rect")
        .attr("x", d => x(d.date))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", "rgb(246,187,200)");
}

function createLineChart(data, elementId, xValue, yValue) {

    const svg = d3.select("#" + elementId)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const processedData = data
        .sort((a, b) => new Date(a.datum) - new Date(b.datum))
        .map(d => ({date: new Date(d[xValue]), value: d[yValue]}));

    // X as
    const x = d3.scaleTime()
        // .domain(d3.extent(processedData, d => d.date))
        .domain(d3.extent(data, d => new Date(d[xValue])))
        .range([0, width]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%d-%m-%Y")))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Y as
    const y = d3.scaleLinear()
        // .domain([0, d3.max(processedData, d => d.value)])
        .domain([0, d3.max(data, d => d[yValue])])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("path")
        .datum(processedData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value))
        );

    svg.selectAll("dot")
        .data(processedData)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 3)
        .attr("fill", "steelblue");
}

d3.json('../../assets/epilepsy.json').then(function (data) {

    createBarChart(data.Aanvalsregistratie, 'seizureChart', 'datum', 'aantal');
    createLineChart(data.Medicatie, 'medicationChart', 'datum', 'dosis');
    createLineChart(data.PDD_DDD, 'pddChart', 'datum', 'PDD_DDD_waarde');
    createLineChart(data.Labuitslagen_en_ketonen, 'labResultsChart', 'datum', 'ketonen_mmol_l');

}).catch(error => {
    console.error("Error fetching the data: ", error);
});