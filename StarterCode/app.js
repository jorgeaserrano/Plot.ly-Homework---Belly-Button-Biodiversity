$(document).ready(function() {
    console.log("Page Loaded");
    getData();

    // event listener
    $("#filter").on("change", function() {
        getData();
    });
});

function getData() {
    let url = "samples.json";

    // AJAX
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            console.log(data);

            let value = $("#filter").val();
            let filtered_data = data.filter(x => x.names === value)[0];

            let obj_values = Object.values(filtered_data);
            let obj_keys = Object.keys(filtered_data);

            // remove the last item
            obj_values.pop();
            obj_keys.pop();

            // make plot
            makePlot(obj_values, obj_keys);
        },
        error: function(data) {
            console.log("YOU BROKE IT!!");
        },
        complete: function(data) {
            console.log("Request finished");
        }
    });
}

// plotly function
function makePlot(obj_values, obj_keys) {
  // pie chart
  var data = [{
      values: obj_values,
      labels: obj_keys,
      type: 'pie'
  }];

  var layout = {
      height: 400,
      width: 500
  };

  Plotly.newPlot('pie', data, layout);
});