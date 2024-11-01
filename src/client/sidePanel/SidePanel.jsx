import React, { useState, Fragment } from "react";
import * as am5 from '@amcharts/amcharts5';
import am5geodata_countries2 from "@amcharts/amcharts5-geodata/data/countries2";
import { Drawer, Card, Flex, Button } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import { select } from '../redux/slices/selectedCountrySlice';
import { close } from '../redux/slices/sidePanelSlice';
import { useChart } from "../map/MapContext";
import { northAmericaCountries, southAmericaCountries, asiaCountries, middleEastCountries, europeCountries, africaCountries, supportedCountries } from "../Constants";
import { SidePanelDragger } from "./SidePanelDragger";
import '../App.css';

const { Meta } = Card;

export const SidePanel = () => {
    // local state
    const [width, setWidth] = useState(736); // Initial width of the drawer
    
    // global state
    const dispatch = useDispatch();
    const currentSelectedCountry = useSelector(state => state.selectedCountry.id);
    const isSidePanelOpen = useSelector(state => state.sidePanel.open);
    
    // context
    const chart = useChart();
    const worldMap = chart.series._values[0];
    const countryMap = chart.series._values[1];
    const backContainer = chart.children._values[2];

    // side panel is closed by clicking 'x' 
    function onClose(){
        dispatch(close());
    };

    // when no countries are selected a menu of coutry cards is displayed
    // when a country card is clicked, zoom into the country and set it as selected in the redux store
    function handleCountryCardClicked(countryID){
      console.log("Clicked on card with ID " + {countryID})
      
      let dataItem = worldMap.getDataItemById(countryID);
      let data = dataItem.dataContext;

      if(supportedCountries.includes(data.id)){
          let zoomAnimation = worldMap.zoomToDataItem(dataItem);
          Promise.all([
              zoomAnimation.waitForStop(),
              am5.net.load(
              'https://cdn.amcharts.com/lib/5/geodata/json/' + data.map + '.json',
              chart
              ),
          ]).then((results) => {
              let geodata = am5.JSONParser.parse(results[1].response);
              countryMap.setAll({
              geoJSON: geodata,
              fill: data.polygonSettings.fill,
              });
              countryMap.show();
              worldMap.hide(100);
              backContainer.show();
              dispatch(select(data.id));
          });
      }
    }

    // All countries tab, generate cards with flags to choose from 
    let naCountriesJsx = [];
    let saCountriesJsx = [];
    let asiaCountriesJsx = [];
    let meCountriesJsx = [];
    let euCountriesJsx = [];
    let africaCountriesJsx = [];
    for (let id of supportedCountries) {
      if (am5geodata_countries2.hasOwnProperty(id)) {
        let country = am5geodata_countries2[id];
        
        let fontsize = 12; 
        if(id === "GB" || id === "CZ"){
          fontsize = 10;
        }

        let countryName = country.country;
        if(id === "AE"){
          countryName = "UAE"
        }
        else if(id === "VN"){
          countryName = "Vietnam"
        }

        // Construct the image filename using the ID
        let imageSrc = require(`../images/flags/${id}-flag.png`);

        let jsx = 
          <Card
            className="country-card"
            hoverable
            cover={<img className="country-card" alt={country.country} src={imageSrc}/>}
            key={id}
            onClick={() => handleCountryCardClicked(id)}
          >
            <Meta 
              title={<div style={{ fontSize: fontsize, textAlign: 'center' }}>{countryName}</div>}
            />
          </Card>
          if(northAmericaCountries.includes(id)) naCountriesJsx.push(jsx);
          else if(southAmericaCountries.includes(id)) saCountriesJsx.push(jsx);
          else if(asiaCountries.includes(id)) asiaCountriesJsx.push(jsx);
          else if(middleEastCountries.includes(id)) meCountriesJsx.push(jsx);
          else if(europeCountries.includes(id)) euCountriesJsx.push(jsx);
          else if(africaCountries.includes(id)) africaCountriesJsx.push(jsx);
      } 
    }

    return(
        <Fragment>
            {/* main panel props */}
            <Drawer
              title={
                  currentSelectedCountry ? (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>{am5geodata_countries2[currentSelectedCountry].country}</span>
                          <Button
                              className="side-panel-back-button" // Add class name
                              onClick={() => console.log('Back to world map clicked!')} // Add your button click handler here
                          >
                              <ArrowLeftOutlined style={{ marginRight: '8px', color: 'white' }} /> {/* Ant Design icon */}
                              Back to world map
                          </Button>
                      </div>
                  ) : (
                      "All countries"
                  )
              }
              placement="right"
              width={width}
              onClose={onClose}
              open={isSidePanelOpen}
              mask={false}
              className="explore-side-panel"
          >
                {/* resize dragger  */}
                <SidePanelDragger setWidth={setWidth}/>

                {/*  if there is a country selected show its data. with no country selected, show country selection pane. */}
                { (currentSelectedCountry) ?
                <div>
                  <p>Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </div>
                : 
                <Flex vertical={true} gap='large'>
                  {/* North America */}
                  <h3>North America</h3>
                  <Flex wrap={true} gap='40px'>
                    {naCountriesJsx}
                  </Flex>

                  {/* South America */}
                  <h3>South America</h3>
                  <Flex wrap={true} gap='40px' >
                    {saCountriesJsx}
                  </Flex>

                   {/* Europe */}
                  <h3>Europe</h3>
                  <Flex wrap={true} gap='40px'>
                    {euCountriesJsx}
                  </Flex>

                  {/* Asia */}
                  <h3>Asia</h3>
                  <Flex wrap={true} gap='40px'>
                    {asiaCountriesJsx}
                  </Flex>

                   {/* Middle East */}
                  <h3>Middle East</h3>
                  <Flex wrap={true} gap='40px'>
                    {meCountriesJsx}
                  </Flex>

                  {/* Africa */}
                  <h3>Africa</h3>
                  <Flex wrap={true} gap='40px'>
                    {africaCountriesJsx}
                  </Flex>
                </Flex>
                }
            </Drawer>
        </Fragment>
    );
}