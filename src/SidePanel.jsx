import React, { useState, Fragment } from "react";
import am5geodata_countries2 from "@amcharts/amcharts5-geodata/data/countries2";
import { Drawer, Card, Flex } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { close } from './redux/slices/sidePanelSlice';
import { northAmericaCountries, southAmericaCountries, asiaCountries, middleEastCountries, europeCountries, africaCountries, supportedCountries } from "./Constants";

const { Meta } = Card;

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

let isResizing = null;

export const SidePanel = () => {
    // local state
    const [width, setWidth] = useState(736); // Initial width of the drawer
    
    // global state
    const dispatch = useDispatch();
    const currentSelectedCountry = useSelector(state => state.selectedCountry.value);
    const isSidePanelOpen = useSelector(state => state.sidePanel.open);

    // for handling dragging the side panel to expand/collapse
    const cbHandleMouseMove = React.useCallback(handleMousemove, []);
    const cbHandleMouseUp = React.useCallback(handleMouseup, []);

    const onClose = () => {
        dispatch(close());
    };

    // for handling dragging the side panel to expand/collapse
    function handleMouseup(e) {
        if (!isResizing) {
          return;
        }
        isResizing = false;
        document.removeEventListener("mousemove", cbHandleMouseMove);
        document.removeEventListener("mouseup", cbHandleMouseUp);
      }
    
      // for handling dragging the side panel to expand/collapse
      function handleMousedown(e) {
        e.stopPropagation();
        e.preventDefault();
        // we will only add listeners when needed, and remove them afterward
        document.addEventListener("mousemove", cbHandleMouseMove);
        document.addEventListener("mouseup", cbHandleMouseUp);
        isResizing = true;
      }
    
      // for handling dragging the side panel to expand/collapse
      function handleMousemove(e) {
        let offsetRight =
          document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
        let minWidth = 400;
        let maxWidth = window.innerWidth;
        if (offsetRight > minWidth && offsetRight < maxWidth) {
            setWidth(offsetRight);
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
          let jsx = 
            <Card
              hoverable
              style={{ width: 120, height: 50 }}
              cover={<img alt={country.country} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{ width: '120px', height: '50px' }}/>}
              key={id}
            >
            <Meta 
              title={<div style={{ fontSize: 12, textAlign: 'center' }}>{country.country}</div>}
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
                title={(currentSelectedCountry) ? "Drawer" : "All countries"}
                placement="right"
                width={width}
                onClose={onClose}
                open={isSidePanelOpen}
                mask={false}
            >
                {/* resize dragger  */}
                <div className="sidebar-dragger" onMouseDown={handleMousedown} />

                {/* content */}
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
                  <Flex wrap={true} gap='large'>
                    {naCountriesJsx}
                  </Flex>

                  {/* South America */}
                  <h3>South America</h3>
                  <Flex wrap={true} gap='large'>
                    {saCountriesJsx}
                  </Flex>

                   {/* Europe */}
                  <h3>Europe</h3>
                  <Flex wrap={true} gap='large'>
                    {euCountriesJsx}
                  </Flex>

                  {/* Asia */}
                  <h3>Asia</h3>
                  <Flex wrap={true} gap='large'>
                    {asiaCountriesJsx}
                  </Flex>

                   {/* Middle East */}
                  <h3>Middle East</h3>
                  <Flex wrap={true} gap='large'>
                    {meCountriesJsx}
                  </Flex>

                  {/* Africa */}
                  <h3>Africa</h3>
                  <Flex wrap={true} gap='large'>
                    {africaCountriesJsx}
                  </Flex>
                </Flex>
                }
            </Drawer>
        </Fragment>
    );
}