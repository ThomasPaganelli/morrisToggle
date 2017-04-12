# morrisToggle
Toggle checkbox for each Y axis keys, to view selected line or chart.

Inclue morristoggle file with main morris js file from http://morrisjs.github.io/morris.js/


Usage:


  var lineCorex = new morrisToggle.Line({
                element: 'line-chart',

                resize: true,

                data: dataH,

                xkey: 'timestamps',

                ykeys: ['BatteryTemperature', 'LoadCurrent', 'LoadVoltage'],

                labels: ['BatteryTemperature', 'LoadCurrent', 'LoadVoltage'],

                lineColors: ['#F2594A', '#eead0e', '#2DBB28'],

                lineWidth: 3,

                hideHover: 'auto',

                gridTextColor: "#104e8b",

                gridStrokeWidth: 0.5,

                pointSize: 4,

                pointStrokeColors: ["#F2594A", '#eead0e', '#2DBB28'],

                gridLineColor: "#e0e0e0"
            }, true);
            
     Second parameter true is to show the chekcbox for view filter on line
