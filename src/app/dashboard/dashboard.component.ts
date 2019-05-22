import { Component, OnInit, NgZone } from '@angular/core';
import { Device } from '../models/device';
import { DeviceService } from '../service/device.service';
import { Router } from '@angular/router';
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
  item: Device;
  mapsData;
  private chart: am4maps.MapChart;

  constructor(private zone: NgZone, 
              private deviceService: DeviceService, 
              private router: Router) 
  { } 

  ngOnInit() {
    this.getDevices();
  }

  getDevices(): void {
    this.deviceService.getDevices().subscribe(items => {
      this.ngAfterViewInit(items)
    });
  }

  ngAfterViewInit(items: any) {
    this.zone.runOutsideAngular(() => {
      this.mapsData = items;
      this.mapsData.forEach(function(v){
        v.value = v.moisture;
        delete v.temperature;
        delete v.kalium;
        delete v.created_at;
        delete v.moisture;
      });
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
      polygonSeries.data = this.mapsData;

      //Configure series tooltip
      var polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{id}: {value}";
      polygonTemplate.nonScalingStroke = true;
      polygonTemplate.strokeWidth = 0.5;

      polygonTemplate.events.on("hit", function(ev) {
        this.router.navigate(['/device/',ev.target.dataItem.dataContext.id]);
        
        console.log(ev.target.dataItem.dataContext.id);
      }, this);

      // Create hover state and set alternative fill color
      var hs = polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#3c5bdc");

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
              if (visits < 0) {
                visits = 0;
              }
              let lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
              linechart.addData(
                  { date: new Date(lastdataItem.dateX.getTime() + 1000*3600), value: visits },
                  1
              );
          }, 5000);
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
      // dateAxis.renderer.labels.template.adapter.add("rotation", function (rotation, target) {
      //     let dataItem = target.dataItem;
      //     if (dataItem.dates && dataItem.date.getTime() == am4core.time.round(new Date(dataItem.date.getTime()), "minute").getTime()) {
      //         target.verticalCenter = "middle";
      //         target.horizontalCenter = "left";
      //         return -90;
      //     }
      //     else {
      //         target.verticalCenter = "bottom";
      //         target.horizontalCenter = "middle";
      //         return 0;
      //     }
      // })

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
