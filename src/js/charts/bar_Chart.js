// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var bar_Chart = document.getElementById("gravityChart");
var mybarChart = new Chart(bar_Chart, {
  type: 'bar',
  data: {
    labels: ["Inicial", "Actual", "Final"],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#e39e48', '#474744', '#ecc08a'],
      hoverBackgroundColor: ['#e39e48', '#474744', '#ecc08a'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          min: 1000,
          max: 1100
        }
      }]
    },
    tooltips: {
      backgroundColor: "rgb(255, 255, 255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});

function updateBarChart(gravity) {
  
  mybarChart.data.datasets[0].data[1] = gravity;
  mybarChart.update();
}

function getGravityData() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '../php/getGravity.php',
      success: function(data) {

        let json = JSON.parse(data);

        let object = {
          "gravedad_Inicial": parseInt(json.gravedad_Inicial),
          "gravedad_Final": parseInt(json.gravedad_Final)
        }
        resolve(object) // Resolve promise and go to then()
      },
      error: function(err) {
        reject(err) // Reject the promise and go to catch()
      }
    });
  });
}

function initGravityChart() {

  if(gv.id_Receta != 0) {
    
    getGravityData().then(function(data) {loadValuesInChart(data)});
  }
}

function loadValuesInChart(data) {

  mybarChart.data.datasets[0].data[0] = data.gravedad_Inicial;
  mybarChart.data.datasets[0].data[2] = data.gravedad_Final;
  mybarChart.update();
}