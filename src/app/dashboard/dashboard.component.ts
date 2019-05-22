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
        min: am4core.color("#FFA07A"),
        max: am4core.color("#FF0000")
      });

      // Make map load polygon data (state shapes and names) from GeoJSON
      polygonSeries.useGeodata = true;

      // Set heatmap values for each state
      polygonSeries.data = [
        {
          id: 19001,
          value: 4447100
        },
        {
          id: 19003,
          value: 626932
        },
        {
          id: 19005,
          value: 5130632
        },
        {
          id: 19007,
          value: 2673400
        },
        {
          id: 19009,
          value: 33871648
        },
        {
          id: 19011,
          value: 4301261
        },
        {
          id: 19013,
          value: 3405565
        },
        {
          id: 19015,
          value: 783600
        },
        {
          id: 19017,
          value: 15982378
        },
        {
          id: 19019,
          value: 8186453
        },
        {
          id: 19021,
          value: 1211537
        },
        {
          id: 19023,
          value: 1293953
        },
        {
          id: 19025,
          value: 12419293
        },
        {
          id: 19027,
          value: 6080485
        },
        {
          id: 19029,
          value: 2926324
        },
        {
          id: 19031,
          value: 2688418
        },
        {
          id: 19033,
          value: 4041769
        },
        {
          id: 19035,
          value: 4468976
        },
        {
          id: 19037,
          value: 1274923
        },
        {
          id: 19039,
          value: 5296486
        },
        {
          id: 19041,
          value: 6349097
        },
        {
          id: 19043,
          value: 9938444
        },
        {
          id: 19045,
          value: 4919479
        },
        {
          id: 19047,
          value: 2844658
        },
        {
          id: 19049,
          value: 5595211
        },
        {
          id: 19051,
          value: 902195
        },
        {
          id: 19053,
          value: 1711263
        },
        {
          id: 19055,
          value: 1998257
        },
        {
          id: 19057,
          value: 1235786
        },
        {
          id: 19059,
          value: 8414350
        },
        {
          id: 19061,
          value: 1819046
        },
        {
          id: 19063,
          value: 18976457
        },
        {
          id: 19065,
          value: 8049313
        },
        {
          id: 19067,
          value: 642200
        },
        {
          id: 19069,
          value: 11353140
        },
        {
          id: 19071,
          value: 3450654
        },
        {
          id: 19073,
          value: 3421399
        },
        {
          id: 19075,
          value: 12281054
        },
        {
          id: 19077,
          value: 1048319
        },
        {
          id: 19079,
          value: 4012012
        },
        {
          id: 19081,
          value: 754844
        },
        {
          id: 19083,
          value: 5689283
        },
        {
          id: 19085,
          value: 20851820
        },
        {
          id: 19087,
          value: 2233169
        },
        {
          id: 19089,
          value: 608827
        },
        {
          id: 19091,
          value: 7078515
        },
        {
          id: 19093,
          value: 5894121
        },
        {
          id: 19095,
          value: 1808344
        },
        {
          id: 19097,
          value: 5363675
        },
        {
          id: 19099,
          value: 493782
        }
      ];

      //Configure series tooltip
      var polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}: {value}";
      polygonTemplate.nonScalingStroke = true;
      polygonTemplate.strokeWidth = 0.5;
      polygonSeries.tooltip.label.interactionsEnabled = true;
      polygonSeries.tooltip.keepTargetHover = true;

      // Create hover state and set alternative fill color
      var hs = polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#3c5bdc");
      polygonTemplate.tooltipHTML = '<b>{category}</b><br><a href="https://en.wikipedia.org/wiki/{id}">More info</a>';

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
      dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
      dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
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
