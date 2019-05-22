import { Component, OnInit, NgZone } from '@angular/core';
import { Device } from '../models/device';
import { DeviceService } from '../service/device.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_iaLow from "@amcharts/amcharts4-geodata/region/usa/iaLow";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  devices: Device[] = [];
  private chart: am4maps.MapChart;

  constructor(private zone: NgZone, private deviceService: DeviceService) { } 

  ngOnInit() {
    this.deviceService.getDevices();
  }

  getDevices(): void {
    this.deviceService.getDevices()
      .subscribe(devices => this.devices = devices.slice(1, 5));
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // Create map instance
      var chart = am4core.create("mapsdiv", am4maps.MapChart);

      // Set map definition
      chart.geodata = am4geodata_iaLow;

      // Set projection
      chart.projection = new am4maps.projections.AlbersUsa();

      chart.chartContainer.wheelable = false;
      chart.seriesContainer.events.disableType("doublehit");
      chart.chartContainer.background.events.disableType("doublehit");
      
      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      
      //Set min/max fill color for each area
      polygonSeries.heatRules.push({
        property: "fill",
        target: polygonSeries.mapPolygons.template,
        min: chart.colors.getIndex(1).brighten(1),
        max: chart.colors.getIndex(1).brighten(-0.3)
      });

      // Make map load polygon data (state shapes and names) from GeoJSON
      polygonSeries.useGeodata = true;

      // // Set heatmap values for each state
      // polygonSeries.data = [
      //   {
      //     id: "US-AL",
      //     value: 4447100
      //   },
      //   {
      //     id: "US-AK",
      //     value: 626932
      //   },
      //   {
      //     id: "US-AZ",
      //     value: 5130632
      //   },
      //   {
      //     id: "US-AR",
      //     value: 2673400
      //   },
      //   {
      //     id: "US-CA",
      //     value: 33871648
      //   },
      //   {
      //     id: "US-CO",
      //     value: 4301261
      //   },
      //   {
      //     id: "US-CT",
      //     value: 3405565
      //   },
      //   {
      //     id: "US-DE",
      //     value: 783600
      //   },
      //   {
      //     id: "US-FL",
      //     value: 15982378
      //   },
      //   {
      //     id: "US-GA",
      //     value: 8186453
      //   },
      //   {
      //     id: "US-HI",
      //     value: 1211537
      //   },
      //   {
      //     id: "US-ID",
      //     value: 1293953
      //   },
      //   {
      //     id: "US-IL",
      //     value: 12419293
      //   },
      //   {
      //     id: "US-IN",
      //     value: 6080485
      //   },
      //   {
      //     id: "US-IA",
      //     value: 2926324
      //   },
      //   {
      //     id: "US-KS",
      //     value: 2688418
      //   },
      //   {
      //     id: "US-KY",
      //     value: 4041769
      //   },
      //   {
      //     id: "US-LA",
      //     value: 4468976
      //   },
      //   {
      //     id: "US-ME",
      //     value: 1274923
      //   },
      //   {
      //     id: "US-MD",
      //     value: 5296486
      //   },
      //   {
      //     id: "US-MA",
      //     value: 6349097
      //   },
      //   {
      //     id: "US-MI",
      //     value: 9938444
      //   },
      //   {
      //     id: "US-MN",
      //     value: 4919479
      //   },
      //   {
      //     id: "US-MS",
      //     value: 2844658
      //   },
      //   {
      //     id: "US-MO",
      //     value: 5595211
      //   },
      //   {
      //     id: "US-MT",
      //     value: 902195
      //   },
      //   {
      //     id: "US-NE",
      //     value: 1711263
      //   },
      //   {
      //     id: "US-NV",
      //     value: 1998257
      //   },
      //   {
      //     id: "US-NH",
      //     value: 1235786
      //   },
      //   {
      //     id: "US-NJ",
      //     value: 8414350
      //   },
      //   {
      //     id: "US-NM",
      //     value: 1819046
      //   },
      //   {
      //     id: "US-NY",
      //     value: 18976457
      //   },
      //   {
      //     id: "US-NC",
      //     value: 8049313
      //   },
      //   {
      //     id: "US-ND",
      //     value: 642200
      //   },
      //   {
      //     id: "US-OH",
      //     value: 11353140
      //   },
      //   {
      //     id: "US-OK",
      //     value: 3450654
      //   },
      //   {
      //     id: "US-OR",
      //     value: 3421399
      //   },
      //   {
      //     id: "US-PA",
      //     value: 12281054
      //   },
      //   {
      //     id: "US-RI",
      //     value: 1048319
      //   },
      //   {
      //     id: "US-SC",
      //     value: 4012012
      //   },
      //   {
      //     id: "US-SD",
      //     value: 754844
      //   },
      //   {
      //     id: "US-TN",
      //     value: 5689283
      //   },
      //   {
      //     id: "US-TX",
      //     value: 20851820
      //   },
      //   {
      //     id: "US-UT",
      //     value: 2233169
      //   },
      //   {
      //     id: "US-VT",
      //     value: 608827
      //   },
      //   {
      //     id: "US-VA",
      //     value: 7078515
      //   },
      //   {
      //     id: "US-WA",
      //     value: 5894121
      //   },
      //   {
      //     id: "US-WV",
      //     value: 1808344
      //   },
      //   {
      //     id: "US-WI",
      //     value: 5363675
      //   },
      //   {
      //     id: "US-WY",
      //     value: 493782
      //   }
      // ];

      // Set up heat legend
      // var heatLegend = chart.createChild(am4maps.HeatLegend);
      // heatLegend.id = "heatLegend";
      // heatLegend.series = polygonSeries;
      // heatLegend.align = "right";
      // heatLegend.valign = "bottom";
      // heatLegend.width = am4core.percent(35);
      // heatLegend.marginRight = am4core.percent(4);
      // heatLegend.background.fill = am4core.color("#000");
      // heatLegend.background.fillOpacity = 0.05;
      // heatLegend.padding(5, 5, 5, 5);

      // // Set up custom heat map legend labels using axis ranges
      // var minRange = heatLegend.valueAxis.axisRanges.create();
      // minRange.label.horizontalCenter = "left";

      // var maxRange = heatLegend.valueAxis.axisRanges.create();
      // maxRange.label.horizontalCenter = "right";

      // // Blank out internal heat legend value axis labels
      // heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function(labelText) {
      //   return "";
      // });

      // // Update heat legend value labels
      // polygonSeries.events.on("datavalidated", function(ev) {
      //   var heatLegend = ev.target.map.getKey("heatLegend");
      //   var min = heatLegend.series.dataItem.values.value.low;
      //   var minRange = heatLegend.valueAxis.axisRanges.getIndex(0);
      //   minRange.value = min;
      //   minRange.label.text = "" + heatLegend.numberFormatter.format(min);

      //   var max = heatLegend.series.dataItem.values.value.high;
      //   var maxRange = heatLegend.valueAxis.axisRanges.getIndex(1);
      //   maxRange.value = max;
      //   maxRange.label.text = "" + heatLegend.numberFormatter.format(max);
      // });
      
      // Configure series tooltip
      // var polygonTemplate = polygonSeries.mapPolygons.template;
      // polygonTemplate.tooltipText = "{name}: {value}";
      // polygonTemplate.nonScalingStroke = true;
      // polygonTemplate.strokeWidth = 0.5;

      // // Create hover state and set alternative fill color
      // var hs = polygonTemplate.states.create("hover");
      // hs.properties.fill = am4core.color("#3c5bdc");

      var linechart = am4core.create("lineChartDiv", am4charts.XYChart);

      linechart.hiddenState.properties.opacity = 0;

      linechart.padding(0, 0, 0, 0);

      linechart.zoomOutButton.disabled = true;

      let data = [];
      let visits = 10;
      let i = 0;

      for (i = 0; i <= 30; i++) {
          visits -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
          data.push({ date: new Date().setHours(i - 30), value: visits });
      }

      linechart.data = data;

      let dateAxis = linechart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 30;
      dateAxis.dateFormats.setKey("second", "ss");
      // dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
      // dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
      dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
      dateAxis.renderer.inside = true;
      dateAxis.renderer.axisFills.template.disabled = true;
      dateAxis.renderer.ticks.template.disabled = true;

      let valueAxis = linechart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.interpolationDuration = 500;
      valueAxis.rangeChangeDuration = 500;
      valueAxis.renderer.inside = true;
      valueAxis.renderer.minLabelPosition = 0.05;
      valueAxis.renderer.maxLabelPosition = 0.95;
      valueAxis.renderer.axisFills.template.disabled = true;
      valueAxis.renderer.ticks.template.disabled = true;

      let series = linechart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.interpolationDuration = 500;
      series.defaultState.transitionDuration = 0;
      series.tensionX = 0.8;

      linechart.events.on("datavalidated", function () {
          dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
      });

      dateAxis.interpolationDuration = 500;
      dateAxis.rangeChangeDuration = 500;

      document.addEventListener("visibilitychange", function() {
          if (document.hidden) {
              if (interval) {
                  clearInterval(interval);
              }
          }
          else {
              startInterval();
          }
      }, false);

      // add data
      let interval;
      function startInterval() {
          interval = setInterval(function() {
              visits =
                  visits + Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
              let lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
              linechart.addData(
                  { date: new Date(lastdataItem.dateX.getTime() + 1000*3600), value: visits },
                  1
              );
          }, 1000);
      }

      startInterval();

      // all the below is optional, makes some fancy effects
      // gradient fill of the series
      series.fillOpacity = 1;
      let gradient = new am4core.LinearGradient();
      gradient.addColor(linechart.colors.getIndex(0), 0.2);
      gradient.addColor(linechart.colors.getIndex(0), 0);
      series.fill = gradient;

      // this makes date axis labels to fade out
      dateAxis.renderer.labels.template.adapter.add("fillOpacity", function (fillOpacity, target) {
          let dataItem = target.dataItem;
          return dataItem.position;
      })

      // need to set this, otherwise fillOpacity is not changed and not set
      dateAxis.events.on("validated", function () {
          am4core.iter.each(dateAxis.renderer.labels.iterator(), function (label) {
              label.fillOpacity = label.fillOpacity;
          })
      })

      // this makes date axis labels which are at equal minutes to be rotated
      dateAxis.renderer.labels.template.adapter.add("rotation", function (rotation, target) {
          let dataItem = target.dataItem;
          if (dataItem.date && dataItem.date.getTime() == am4core.time.round(new Date(dataItem.date.getTime()), "minute").getTime()) {
              target.verticalCenter = "middle";
              target.horizontalCenter = "left";
              return -90;
          }
          else {
              target.verticalCenter = "bottom";
              target.horizontalCenter = "middle";
              return 0;
          }
      })

      // bullet at the front of the line
      let bullet = series.createChild(am4charts.CircleBullet);
      bullet.circle.radius = 5;
      bullet.fillOpacity = 1;
      bullet.fill = chart.colors.getIndex(0);
      bullet.isMeasured = false;

      series.events.on("validated", function() {
          bullet.moveTo(series.dataItems.last.point);
          bullet.validatePosition();
      });
    })
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
