// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages': ['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
    ]);

    // Set chart options
    var options = {
        'title': 'How Much Pizza I Ate Last Night',
        'width': 400,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);


//    power parameters
    var query_gen_today = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1ViyhA5o3uYNNdoHGXtom1ewFaszLRUghpDprJvz9GWY/gviz/tq?sheet=Sheet1&headers=1&range=' + 'A1:C5');
    query_gen_today.send(handleQueryGenResponse);

    var query_peak_power_shortage = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1ViyhA5o3uYNNdoHGXtom1ewFaszLRUghpDprJvz9GWY/gviz/tq?sheet=Sheet1&headers=1&range=' + 'A15:C17');
    query_peak_power_shortage.send(handleQueryPeakPowerShortage);
}

function handleQueryGenResponse(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var data = response.getDataTable();
    console.log(data);
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
    chart.draw(data, {
        'title': 'Power Generation in million units (MU)',
        is3D: true,
        //width: ,
        height: 400
    });
}

function handleQueryPeakPowerShortage(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var data = response.getDataTable();
    console.log(data);
    var chart = new google.visualization.PieChart(document.getElementById('chart_div3'));
    chart.draw(data, {
        'title': 'Peak power shortage',
        is3D: true,
        width: '100%',
        height: '100%',
        pieHole: 0.4,
        slices: {
            1: {offset: 0.2}
        },
        pieSliceText: 'value-and-percentage'
    });
}