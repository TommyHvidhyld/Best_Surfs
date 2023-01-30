
// setting up url from our render file
const url = "https://surf-app.onrender.com/api/v1.0/surf"

// selecting the data for the dropdown
d3.json(url).then(function(data) {
  let selected = d3.select("#selDataset");
  console.log(data)
  for (let i = 0; i < data.length; i++) {
        selected.append('option').text(data[i].spot);
}});


// what we want to do: create a chart when new surf spot is selected
function chartCreate(spots) {
  d3.json(url).then(function(data){
    let spotIndex = data.findIndex(data => data.spot === spots);
    let weather = data[spotIndex];
    let weatherData = [];
    let weatherLabels = [];
    let removeValFrom = [2,3, 4, 5, 6, 7,8,11,13];
    for (const key in weather) {
      {
      weatherLabels.push(key)
      }
    };
    weatherLabels= weatherLabels.filter(function(value, index) {
      return removeValFrom.indexOf(index) == -1;
    });
    for (let [key, value] of Object.entries(weather)) {
      if (key == "air_temp") {
        if (value <= 10.00 || value >= 43.00 ) 
        {
          weatherData.push(1)
        }
        else if (value >= 23.00 && value <= 27.00){
            weatherData.push(5);
          }
        else if (value <= 22.99 && value >= 18.00) {
          weatherData.push(4)
          }
        else if (value <= 17.99 && value >= 14.00){
          weatherData.push(3)
        }
        else if (value <= 13.99 && value >= 10.01){
          weatherData.push(2)
        }
        else{
          weatherData.push(0)
        }
      }
      if (key == "cloud_cover") {
        if (value >= 80.00 ) 
        {
          weatherData.push(1)
        }
        else if (value >= 0.00 && value <= 19.99){
            weatherData.push(5);
          }
        else if (value >= 20.00 && value <= 39.99) {
          weatherData.push(4)
          }
        else if (value <= 59.99 && value >= 40.00){
          weatherData.push(3)
        }
        else if (value <= 79.99 && value >= 60.00){
          weatherData.push(2)
        }
        else{
          weatherData.push(0)
        }
      }
      if (key == "visibility") {
        if (value <= 1.00 ) 
        {
          weatherData.push(1)
        }
        else if (value >= 24.00){
            weatherData.push(5);
          }
        else if (value <= 23.99 && value >= 16.00) {
          weatherData.push(4)
          }
        else if (value <= 15.99 && value >= 10.00){
          weatherData.push(3)
        }
        else if (value <= 9.99 && value >= 2.00){
          weatherData.push(2)
        }
        else{
          weatherData.push(0)
        }
      }
      if (key == "water_temp") {
        if (value <= 10.00 || value >= 30.00 ) 
        {
          weatherData.push(1)
        }
        else if (value >= 22.00 && value <= 26.00){
            weatherData.push(5);
          }
        else if (value <= 21.99 && value >= 18.00) {
          weatherData.push(4)
          }
        else if (value <= 17.99 && value >= 14.00){
          weatherData.push(3)
        }
        else if (value <= 13.99 && value >= 10.01){
          weatherData.push(2)
        }
        else{
          weatherData.push(0)
        }
      }
      if (key == "wave_height") {
        if (value <= 0.59 || value >= 3.01 ) 
        {
          weatherData.push(1)
        }
        else if (value >= 0.6096 && value <= 1.21){
            weatherData.push(5);
          }
        else if (value >= 1.22 && value <= 1.76) {
          weatherData.push(4)
          }
        else if (value >= 1.77 && value <= 2.10){
          weatherData.push(3)
        }
        else if (value <= 2.11 && value >= 3.00){
          weatherData.push(2)
        }
        else{
          weatherData.push(0)
        }
      }
      if (key == "wind_speed") {
        if (value <= 0.99|| value >= 8.33 ) 
        {
          weatherData.push(1)
        }
        else if (value >= 1.00 && value <= 2.00){
            weatherData.push(5);
          }
        else if (value >= 2.01 && value <= 4.01) {
          weatherData.push(4)
          }
        else if (value >= 4.00 && value <= 6.01){
          weatherData.push(3)
        }
        else if (value <= 8.32 && value >= 6.02){
          weatherData.push(2)
        }
        else{
          weatherData.push(0)
        }
      }
    };
    let sum = 0;
    weatherData.forEach(item => {
        sum += item;
    });
  console.log(sum);
  // calling in the name of the surf locale (spots) and data normalized (weatherData) into the radar chart  
  Highcharts.chart('container', {

    chart: {
      polar: true,
      type: 'line'
    },
  
  
    title: {
      text: `${spots}: Surf Radar Chart`,
      x: 0
    },
  
    pane: {
      size: '80%'
    },
  
    xAxis: {
      categories: weatherLabels,
      tickmarkPlacement: 'on',
      lineWidth: 0
    },
  
    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0
    },
  
    // tooltip: {
    //   shared: true,
    //   pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
    // },
  
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },
  
    series: [{
      name: `${spots} Score`,
      data: weatherData,
      pointPlacement: 'on'
    }],
  
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
          pane: {
            size: '70%'
          }
        }
      }]
    }
  
  });


  

//   let radarOptions = {
//       series: [{
//       name: spots,
//       data: weatherData,
//     }
//   ],
//       chart: {
//       height: 500,
//       type: 'radar',
//       dropShadow: {
//         enabled: true,
//         blur: 0,
//         left: 1,
//         top: 1
//       }
//     },
//     plotOptions: {
//       radar: {
//         size: 180,
//         polygons: {
//           strokeColors: '#9bc7d5',
//           fill: {
//             colors: ['#e56d73', '#fff']
//           }
//         }
//       }
//     },
//     title: {
//       text: `${spots}: Location Rating`,
//     },
//     stroke: {
//       width: 3,
//       colors: ['#20b2aa']
//     },
//     fill: {
//       opacity: 0.50,
//       colors: ['#20b2aa']
//     },
//     markers: {
//       size: 1,
//       colors: ["#ffffff"]
//     },
//     xaxis: {
//       categories: weatherLabels,
//       labels:{
//       style: {
//         fontSize: '15px'
//       }
//     }
//   }
// };
//   var radarChart = new ApexCharts(document.querySelector("#radar-chart"), radarOptions);
//   radarChart.render();
    
// creating the donut chart to give a rating of the normalized scores for ideal surfing spots
// Highcharts.chart('container2', {
//   colors: ['#01BAF2', '#71BF45', '#FAA74B', '#B37CD2'],
//   chart: {
//       type: 'pie'
//   },
//   title: {
//       text: 'Air composition'
//   },
  // tooltip: {
  //     valueSuffix: '%'
  // },
//   plotOptions: {
//       pie: {
//           allowPointSelect: true,
//           cursor: 'pointer',
//           dataLabels: {
//               enabled: true,
//               format: '{point.name}: {y}'
//           },
//           showInLegend: true
//       }
//   },
//   series: [{
//       name: `${spot} Total Rating`,
//       colorByPoint: true,
//       innerSize: '75%',
//       data: [{
//           name: 'Nitrogen',
//           y: 78
//       }, {
//           name: 'Oxygen',
//           y: 20.9
//       }, {
//           name: 'Other gases',
//           y: 1.1
//       }]
//   }]
// });




  let donutOptions = {
    series: weatherData,
    labels: weatherLabels,
    chart: {
      type: 'donut',
      width: 600,
      animations: {
        enabled: true,
        easing: 'linear',
        speed: 8000
    },
    },
    dataLabels: {
      formatter: (val, { seriesIndex, w }) => w.config.series[seriesIndex],
      style: {
        fontSize: 30,
        fontFamily: "Helvetica",
        fontWeight: "bold"
      }},
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: '',
              formatter: () => `${spots} Surf Score: 
                                ${sum}/30`
            },
            fontSize: '300px',
            fontFamily: "Helvetica"
          }
        }
      }
    },
    colors:["#0fc4d0", "#9be7cb", "#00aa99", "#E48080", "#ffdd54", "#0D96BA"]
  };
  var donutChart = new ApexCharts(document.querySelector("#donut-chart"), donutOptions)
  donutChart.render();
  return weather;
  })};

// this activates when someone selects a spot from the dropdown
function optionChanged(spots) {
    chartCreate(spots);
};

//initializing charts right off the bat so it is there when page loads
function init() {
  d3.json(url).then(function (data) {
      chartCreate(data[0].spot);
  })
};
init();
