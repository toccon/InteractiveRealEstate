import React, { useState, Fragment } from "react";
import { Drawer, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { close } from './redux/slices/sidePanelSlice';

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
    const expandSidePanelButton = useSelector(state => state.sidePanel.expandSidePanelButton)

    const cbHandleMouseMove = React.useCallback(handleMousemove, []);
    const cbHandleMouseUp = React.useCallback(handleMouseup, []);

    const onClose = () => {
        dispatch(close());
        expandSidePanelButton.expandSidePanelContainer.show();
        console.log(currentSelectedCountry);
    };

    function handleMouseup(e) {
        if (!isResizing) {
          return;
        }
        isResizing = false;
        document.removeEventListener("mousemove", cbHandleMouseMove);
        document.removeEventListener("mouseup", cbHandleMouseUp);
      }
    
      function handleMousedown(e) {
        e.stopPropagation();
        e.preventDefault();
        // we will only add listeners when needed, and remove them afterward
        document.addEventListener("mousemove", cbHandleMouseMove);
        document.addEventListener("mouseup", cbHandleMouseUp);
        isResizing = true;
      }
    
      function handleMousemove(e) {
        let offsetRight =
          document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
        let minWidth = 400;
        let maxWidth = window.innerWidth;
        if (offsetRight > minWidth && offsetRight < maxWidth) {
            setWidth(offsetRight);
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
                <div>
                <p>No country selected</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                </div>
                }
            </Drawer>
        </Fragment>
    );
}