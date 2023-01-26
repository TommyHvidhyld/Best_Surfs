// //select 
// d3.json(url).then(function(data) {
//   let selected = d3.select("#selDataset");
//   let names = data.names ['malibu', 'hermosa beach'];
//   for (let i = 0; i < names.length; i++) {
//       selected.append('option').text(names[i])
//   }
//   console.log(names);
// });


// testing radar chart
var options = {
    series: [{
    name: 'Malibu',
    data: ['80%', '50%', '2%', '3%', '0.4%', '200%'],
  }, {
    name: 'Hermosa Beach',
    data: [20, 30, 40, 80, 20, 80],
  }
],
    chart: {
    height: 350,
    type: 'radar',
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1
    }
  },
  title: {
    text: 'Radar Chart - Multi Series'
  },
  stroke: {
    width: 2
  },
  fill: {
    opacity: 0.1
  },
  markers: {
    size: 0
  },
  xaxis: {
    categories: ['Gust', 'airTemp', 'waterTemp', 'cloudCover', 'waveHeight', 'swellheight' ]
  }
  };

  var chart = new ApexCharts(document.querySelector("#radar-chart"), options);
  chart.render();


// donut chart
var options = {
chart:{
    height: 350,
    type: 'donut',
},
// donut: {
//     size: '65%',
//     background: 'transparent',
//     labels: {
//       show: false,
//       name: {
//         show: true,
//         fontSize: '22px',
//         fontFamily: 'Helvetica, Arial, sans-serif',
//         fontWeight: 600,
//         color: undefined,
//         offsetY: -10,
//         formatter: function (val) {
//           return val
//         }
//         }
//     }
series: [70],
labels: ['Progress'],
}
  
var chart = new ApexCharts(document.querySelector("#donut-chart"), options);
  
chart.render();