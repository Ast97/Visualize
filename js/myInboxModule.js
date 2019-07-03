var jsonData = [];
var pages=[];
var values1=[];
var values2=[];
var valueLen;
var data = new Array(2);
data[0];data[1];
var jsonFile;
var attributesName, attributesMeasurement;
var moduleName = "Admin/ITF-Admin-Run-";
var fileType = ".json";
var timeStamp = "";


$(".dropdown-menu a").click(function(){
  $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
});

for(var i = 0; i < 2; i++){
  var iframe = document.createElement('iframe');
  iframe.id = 'json_'.concat((i+1).toString());
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  iframe.src = moduleName.concat((i+1).toString(), fileType);
  console.log(iframe.src);
  var j=iframe.id
  doSetTimeout(i,j);
}

function doSetTimeout(i,j){
    setTimeout(function(){
        txt=JSON.parse(document.getElementById(j).contentDocument.body.firstChild.innerHTML);
        jsonData.push(txt);
        pages= Object.keys(jsonData[0]);
        values1=Object.values(jsonData[0]);
        if(i>0)
        values2=Object.values(jsonData[1]);
        valueLen=values1.length;
        console.log(valueLen);
    },1000);
  }



$("#errorPct").click(function() {
  data[0]=[];data[1]=[];
  for(var i=0;i<valueLen;i++){
    data[0].push(values1[i].errorPct);
    data[1].push(values2[i].errorPct);
  }
    attributesName = "Error Percentage";
    attributesMeasurement = "Percentage (%)";
});

$("#meanResTime").click(function() {
  data[0]=[];data[1]=[];
  for(var i=0;i<valueLen;i++){
    data[0].push(values1[i].meanResTime);
    data[1].push(values2[i].meanResTime);
  }
  attributesName = "Mean Response Time";
  attributesMeasurement = "Milliseconds (ms)";
});

$("#minResTime").click(function() {
  data[0]=[];data[1]=[];
  for(var i=0;i<valueLen;i++){
    data[0].push(values1[i].minResTime);
    data[1].push(values2[i].minResTime);
  }
    attributesName = "Minimum Response Time";
    attributesMeasurement = "Milliseconds (ms)";
});

$("#maxResTime").click(function() {
  data[0]=[];data[1]=[];
  for(var i=0;i<valueLen;i++){
    data[0].push(values1[i].maxResTime);
    data[1].push(values2[i].maxResTime);
  }
    attributesName = "Maximum Response Time";
    attributesMeasurement = "Milliseconds (ms)";
});

$("#throughput").click(function() {
  data[0]=[];data[1]=[];
  for(var i=0;i<valueLen;i++){
    data[0].push(values1[i].throughput);
    data[1].push(values2[i].throughput);
  }
    attributesName = "Throughput";
    attributesMeasurement = " ";
});

$("#receivedKBytesPerSec").click(function() {
  data[0]=[];data[1]=[];
  for(var i=0;i<valueLen;i++){
    data[0].push(values1[i].receivedKBytesPerSec);
    data[1].push(values2[i].receivedKBytesPerSec);
  }
    attributesName = "Received KB/Sec";
    attributesMeasurement = "KiloBytes/sec";
});

$("#sentKBytesPerSec").click(function() {
  data[0]=[];data[1]=[];
  for(var i=0;i<valueLen;i++){
    data[0].push(values1[i].sentKBytesPerSec);
    data[1].push(values2[i].sentKBytesPerSec);
  }
    attributesName = "Sent KB/Sec";
    attributesMeasurement = "KiloBytes/sec";
});


$("#visualizeButton").click(function() {
    // Create the chart
    Highcharts.chart('container', {
  chart: {
    type: 'column',
  },
  title: {
    text: attributesName
  },
  xAxis: {
    categories: pages,
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: attributesMeasurement
    },
    plotLines: [{
    color: 'red',
    dashStyle: 'solid',
    value: 3000,
    width: 1
  }]
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} '+attributesMeasurement+'</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series:
  [{
    name: 'Run 1',
    data: data[0]

  }, {
    name: 'Run 2',
    data: data[1]

  }]
});
});
