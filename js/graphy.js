var jsonData = []; //  Stores parsed data for runs
var pages = [];
var values1 = []; //  Data of first run
var values2 = []; //  Data of second run
var valueLen;
var data = new Array(2);
data[0];
data[1];
var attributesName, attributesMeasurement;
var moduleName = mod.toString() + "/ITF-" + mod.toString() + "-Run-";
var fileType = ".json";
var timeStamp = [];
var fileSource = [];

$(document).ready(function(){
    $('.sidenav').sidenav();
});

$(document).ready(function(){
    $('.collapsible').collapsible();
});

function columnChart() {
    // Creating the chart for two runs
    Highcharts.chart('container', {
        chart: {
            type: 'column'
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
                '<td style="padding:0"><b>{point.y:.1f} ' + attributesMeasurement + '</b></td></tr>',
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
        series: [{
            name: 'Run ' + Object.keys(map)[0] +':' + timeStamp[0],
            data: data[0],
            color: '#3CAEA3'

        }, {
            name: 'Run ' + Object.keys(map)[1] + ':' + timeStamp[1],
            data: data[1],
            color: 'black'

        }]
    });
};

function columnChartSingle() {
    // Creating the chart for single run
    Highcharts.chart('container', {
        chart: {
            type: 'column'
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
                '<td style="padding:0"><b>{point.y:.1f} ' + attributesMeasurement + '</b></td></tr>',
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
        series: [{
            name: 'Run ' + Object.keys(map)[0] + ':' + timeStamp[0],
            data: data[0],
            color: '#3CAEA3'

        }]
    });
};

$(".dropdown-menu a").click(function() {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
});

//Creating the li elements for file selection
for (var i = 1; i < 6; i++)
    addItem(i);

function addItem(i) {
    var ul = document.getElementById("list"); //ul
    var li = document.createElement('li'); //li
    li.className = "item";
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.value = "value";
    checkbox.id = i;
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode("ITF-" + mod.toString() + "-Run-" + i.toString()));
    ul.appendChild(li);
}
// var input = $( "input:checkbox" )
//   .wrap( "<span></span>" )
//   .parent()
//   .css({
//     opacity: 1
//   });

var map = {}; //JS json object to store the checkboxes clicked
var li = document.querySelectorAll('.item');
for (var i = 0; i < li.length; i++) {
    li[i].addEventListener('click', function(event) {
        //  If checkbox 'checked', set 'checked' to false
        if ($(this).find('input').is(':checked')){
            $(this).find('input').prop('checked', false);
            $(this).toggleClass('selected');
          }
        else {
            if ($('input[type=checkbox]:checked').length > 1) // Limit checkbox selection to 2 at a time
                $(this).prop('checked', false);
            else{
                $(this).find('input').prop('checked', true); //  If checkbox not 'checked', set 'checked' to true
                $(this).toggleClass('selected');
              }
        }

        var input = this.querySelector('input[type=checkbox]');
        map[input.id] = input.checked;
        for (var elem in map) {
            // Key-value of any checkbox which is not selected is deleted
            if (map[elem] == false)
                delete map[elem];
        }
        if (Object.keys(map).length == 2) { // Parse json file for two runs
            for (var elem in map) {
                fileRead(parseInt(elem[0]));
            }
        }
        if (Object.keys(map).length == 1) { //  Parse json file for single run
            for (var elem in map) {
                fileRead(parseInt(elem[0]));
            }
        }
        // console.log(Object.keys(map).length);
        // console.log(map);
    });
}

function checkFlag() {
    if (Object.keys(map).length == 1) {
        return true;
    }
    return false;
}

function makeChart() {
    if (Object.keys(map).length == 2) {
        columnChart();
    }
    if (Object.keys(map).length == 1) {
        columnChartSingle();
    }
}

function fileRead(i) {
    var iframe = document.createElement('iframe');
    iframe.id = 'json_'.concat(i.toString());
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.src = moduleName.concat(i.toString(), fileType);
    fileSource.push(iframe.src);
    var j = iframe.id;
    doSetTimeout(i, j);
    jsonData = [];
    counter = 0;
}

var counter = 0; //  Counter
function doSetTimeout(i, j) {
    setTimeout(function() {
        if(document.getElementById(j).contentDocument==null){ //  checking if file does not exist
          delete map[i];
          $('#'+i.toString()).prop('checked', false);
          $('#'+i.toString()).parents().toggleClass('selected');
        }
        else{
        counter = counter + 1;
        // console.log(j);
        txt = JSON.parse(document.getElementById(j).contentDocument.body.firstChild.innerHTML);
        jsonData.push(txt);
        var json = document.getElementById(j)
        var lastModified = new Date(json.contentWindow.document.lastModified)
        timeStamp.push(lastModified.toString())
        pages = Object.keys(jsonData[0]);
        values1 = Object.values(jsonData[0]); //  First run data
        if (counter > 1)
            values2 = Object.values(jsonData[1]); //  Second run data
        valueLen = values1.length;
      }
    }, 50);
}

$("#errorPct").click(function() {
    data[0] = [];
    data[1] = [];
    for (var i = 0; i < valueLen; i++) {
        data[0].push(values1[i].errorPct);
        if (!checkFlag())
            data[1].push(values2[i].errorPct);
    }
    attributesName = "Error Percentage";
    attributesMeasurement = "Percentage (%)";
    makeChart();
});

$("#meanResTime").click(function() {
    data[0] = [];
    data[1] = [];
    for (var i = 0; i < valueLen; i++) {
        data[0].push(values1[i].meanResTime);
        if (!checkFlag())
            data[1].push(values2[i].meanResTime);
    }
    attributesName = "Mean Response Time";
    attributesMeasurement = "Milliseconds (ms)";
    makeChart();
});

$("#minResTime").click(function() {
    data[0] = [];
    data[1] = [];
    for (var i = 0; i < valueLen; i++) {
        data[0].push(values1[i].minResTime);
        if (!checkFlag())
            data[1].push(values2[i].minResTime);
    }
    attributesName = "Minimum Response Time";
    attributesMeasurement = "Milliseconds (ms)";
    makeChart();
});

$("#maxResTime").click(function() {
    data[0] = [];
    data[1] = [];
    for (var i = 0; i < valueLen; i++) {
        data[0].push(values1[i].maxResTime);
        if (!checkFlag())
            data[1].push(values2[i].maxResTime);
    }
    attributesName = "Maximum Response Time";
    attributesMeasurement = "Milliseconds (ms)";
    makeChart();
});

$("#throughput").click(function() {
    data[0] = [];
    data[1] = [];
    for (var i = 0; i < valueLen; i++) {
        data[0].push(values1[i].throughput);
        if (!checkFlag())
            data[1].push(values2[i].throughput);
    }
    attributesName = "Throughput";
    attributesMeasurement = " ";
    makeChart();
});

$("#receivedKBytesPerSec").click(function() {
    data[0] = [];
    data[1] = [];
    for (var i = 0; i < valueLen; i++) {
        data[0].push(values1[i].receivedKBytesPerSec);
        if (!checkFlag())
            data[1].push(values2[i].receivedKBytesPerSec);
    }
    attributesName = "Received KB/Sec";
    attributesMeasurement = "KiloBytes/sec";
    makeChart();
});

$("#sentKBytesPerSec").click(function() {
    data[0] = [];
    data[1] = [];
    for (var i = 0; i < valueLen; i++) {
        data[0].push(values1[i].sentKBytesPerSec);
        if (!checkFlag())
            data[1].push(values2[i].sentKBytesPerSec);
    }
    attributesName = "Sent KB/Sec";
    attributesMeasurement = "KiloBytes/sec";
    makeChart();
});
