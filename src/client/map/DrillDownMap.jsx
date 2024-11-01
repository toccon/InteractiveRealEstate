import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5geodata_countries2 from "@amcharts/amcharts5-geodata/data/countries2";
import { supportedCountries, backButtonSVG } from "../Constants";
import { useDispatch, useSelector } from 'react-redux';
import { clear, select } from '../redux/slices/selectedCountrySlice';
import { open } from '../redux/slices/sidePanelSlice';
import { useChartUpdate } from './MapContext';

const DrillDownMap = () => {
  
  const dispatch = useDispatch()
  const isSidePanelOpen = useSelector(state => state.sidePanel.open);
  const setRootChart = useChartUpdate();
  
  useEffect(() => {

    let root = am5.Root.new('chartdiv');
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        projection: am5map.geoMercator(),
      })
    );

    // World series is the default drilled out view of the whole world
    let worldSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ'],
      })
    );

    // add zoom control 
    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

    // Countries with no data ex. Western Sahara
    worldSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
      fill: am5.color(0xaaaaaa),
      templateField: 'polygonSettings',
      fillOpacity: 0.8,
    });

    worldSeries.mapPolygons.template.states.create("hover", { fillOpacity: 1 });

    // onClick drill down handler for all countries
    worldSeries.mapPolygons.template.events.on('click', (ev) => {
      let dataItem = ev.target.dataItem;
      let data = dataItem.dataContext;

        if(supportedCountries.includes(data.id)){
            let zoomAnimation = worldSeries.zoomToDataItem(dataItem);
            Promise.all([
                zoomAnimation.waitForStop(),
                am5.net.load(
                'https://cdn.amcharts.com/lib/5/geodata/json/' + data.map + '.json',
                chart
                ),
            ]).then((results) => {
                let geodata = am5.JSONParser.parse(results[1].response);
                countrySeries.setAll({
                geoJSON: geodata,
                fill: data.polygonSettings.fill,
                });
                countrySeries.show();
                worldSeries.hide(100);
                backContainer.show();
                dispatch(select(data.id));
                dispatch(open());
            });
        }
    });

    // Country series is the drilled down into country 
    let countrySeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        visible: false,
      })
    );

    countrySeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
      fill: am5.color(0x006400), // not sure what this colour is for
    });

    // Colour of drilled down provinces on hover
    countrySeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(0x006400),
    });

    let data = [];
    for (var id in am5geodata_countries2) {
      if (am5geodata_countries2.hasOwnProperty(id)) {
        let country = am5geodata_countries2[id];
        if (country.maps.length) {
          data.push({
            id: id,
            map: country.maps[0],
            polygonSettings: {
                // Default colour for countries. Green if in supportedCountries, else gray. 
                fill: (supportedCountries.includes(id)) ? am5.color(0x0ba30b) : am5.color(0xaaaaaa),
                states: {
                    hover: {
                      properties: {
                        fill: am5.color(0x006400) // Specify the hover color here
                      }
                    }
                  },
            },
          });
        }
      }
    }
    worldSeries.data.setAll(data);

  // Back button and label when drilled in 
  let backContainer = chart.children.push(
    am5.Container.new(root, {
      x: am5.p0,
      y: 30,
      paddingLeft: 0, // Adding some left padding for better spacing
      layout: root.horizontalLayout,
      cursorOverStyle: 'pointer',
      visible: false,
      background: am5.RoundedRectangle.new(root, {
        fill: am5.color(0x1890ff), // Vibrant blue color similar to the login button
        fillOpacity: 0.8, // Slightly higher opacity for a bolder look
        stroke: am5.color(0xffffff), // White border for contrast
        strokeWidth: 2, // Adds a border width
        cornerRadius: 8, // Adds rounded corners for a softer appearance
      }),
    })
  );

  // Back label with improved styling
  backContainer.children.push(
    am5.Label.new(root, {
      text: 'Back to world map',
      centerY: am5.p50,
      fill: am5.color(0xffffff), // White text for better contrast
      fontSize: '16px', // Larger font size for better visibility
      fontWeight: 'bold', // Bold text for emphasis
    })
  );

  // Back button graphic with enhanced styling
  backContainer.children.push(
    am5.Graphics.new(root, {
      width: 32,
      height: 32,
      centerY: am5.p50,
      fill: am5.color(0xffffff), // White fill for contrast
      svgPath: backButtonSVG,
      stroke: am5.color(0x1890ff), // Vibrant blue stroke to match the background
      strokeWidth: 1, // Adds a border to the graphic
    })
  );

    backContainer.events.on('click', function () {
      chart.goHome();
      worldSeries.show();
      countrySeries.hide();
      backContainer.hide();
      dispatch(clear());
    });

    // Expand side panel button visible when side panel is closed  
    let expandSidePanelContainer = chart.children.push(
      am5.Container.new(root, {
        x: am5.p100,
        centerX: am5.p100,
        dx: -10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        y: 30,
        interactiveChildren: false,
        layout: root.horizontalLayout,
        cursorOverStyle: 'pointer',
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xffffff),
          fillOpacity: 0.2,
        }),
        visible: !isSidePanelOpen,
      })
    );
    
    expandSidePanelContainer.children.push(
      am5.Label.new(root, {
        text: 'Open side panel',
        centerY: am5.p50,
      })
    );
    
    expandSidePanelContainer.children.push(
      am5.Graphics.new(root, {
        width: 32,
        height: 32,
        centerY: am5.p50,
        fill: am5.color(0x555555),
        svgPath: backButtonSVG,
      })
    );

    expandSidePanelContainer.events.on('click', function () {
      dispatch(open());
    });

    setRootChart(chart);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: '100vw', height: '89vh', margin: 0, padding: 0 }}></div>;
};

export default DrillDownMap;
