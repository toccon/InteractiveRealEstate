import React, { useEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const MapChart = () => {
  useEffect(() => {
    // Create root element
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    // Create the map chart
    // panX/panY can be rotateX or translateX
    // rotationX/rotationY for default location map is centered on (0,0) by default
    // projection is how the map is displayed, can be flat, globe, etc. https://www.amcharts.com/docs/v5/charts/map-chart/#Setting_a_projection
    let chart = root.container.children.push(am5map.MapChart.new(root, {
      panX: "rotateX",
      projection: am5map.geoMercator()
    }));

    // Create main polygon series for countries
    let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      exclude: ["AQ"]
    }));

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: root.interfaceColors.get("primaryButtonHover")
    });

    polygonSeries.mapPolygons.template.states.create("active", {
      fill: root.interfaceColors.get("primaryButtonHover")
    });

    let previousPolygon;

    polygonSeries.mapPolygons.template.on("active", function (active, target) {
      if (previousPolygon && previousPolygon != target) {
        previousPolygon.set("active", false);
      }
      if (target.get("active")) {
        polygonSeries.zoomToDataItem(target.dataItem);
      } else {
        chart.goHome();
      }
      previousPolygon = target;
    });

    // Add zoom control
    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

    // Set clicking on "water" to zoom out
    chart.chartContainer.get("background").events.on("click", function () {
      chart.goHome();
    });

    // Make stuff animate on load
    chart.appear(1000, 100);
    
    // Clean up when component unmounts
    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default MapChart;
