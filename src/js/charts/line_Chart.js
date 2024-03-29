// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Area Chart Example

let dateTimes = [];
let temps = [];

setTimeout(() => {
  
  initTempChart();
}, 100);

let tempChart;
function initTempChart() {

  let device = 0;

  if(process_Name == "Reposo" || process_Name == "Fermentacion") device = 1;
  
  $.ajax(
    '../php/getTemperatures.php?device=' + device,
    {
        success: function(data) {
          
          let json = JSON.parse(data);

          if (json.nodata == 1) {

            dateTimes.push(new Date);
            temps.push(0);
          } else {

            let dateTimesNotFormated = json.dateTimes;
            dateTimesNotFormated.forEach(element => dateTimes.push(new Date(element)));
            temps = json.temps;
            //dateTimes = json.dateTimes;
            //console.log(dateTimes);
          }

          drawChart(dateTimes, temps);
        },
        error: function() {
          alert('There was some error performing the AJAX call!');
        }
      }
    );
    
    

}

function drawChart(labels, data) {  

  var temperaturesChart = $("#temperaturesChart");
  tempChart = new Chart(temperaturesChart, {
    type: 'line',
    data: {
      labels: labels.map(item => item),
      datasets: [{
        label: "Temperaturas",
        lineTension: 0.3,
        backgroundColor: "rgba(227, 158, 72, 0.05)",
        borderColor: "rgba(227, 158, 72, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(227, 158, 72, 1)",
        pointBorderColor: "rgba(227, 158, 72, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(227, 158, 72, 1)",
        pointHoverBorderColor: "rgba(227, 158, 72, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: data,
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxRotation: 0, 
            minRotation: 0,
            maxTicksLimit: 7,
            callback: function(value, index, values) {
              //let date = new Date(value);

              return value.toDateString();
            }
          }
        }],
        yAxes: [{
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return number_format(value) + ' Cº';
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            //var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return "Temperatura " +  number_format(tooltipItem.yLabel) + ' Cº';
          }
        }
      }
    }
  });
}

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}

function removeData(chart) {
  
  while (chart.segments.length) {
    chart.removeData();
  };
  chart.update();
}