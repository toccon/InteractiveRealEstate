import { useState, Fragment } from "react";
import { Button, Drawer, Space } from "antd";
import { useSelector } from "react-redux";

export const SidePanel = () => {

    // local state
    const [open, setOpen] = useState(true);
    const [width, setWidth] = useState(736); // Initial width of the drawer
    
    // global state
    const currentSelectedCountry = useSelector(state => state.selectedCountry.value);

    const onClose = () => {
        setOpen(false);
        console.log(currentSelectedCountry);
    };

    return(
        <Fragment>
            <Drawer
                title={`Drawer`}
                placement="right"
                width={width}
                onClose={onClose}
                open={open}
                mask={false}
                extra={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" onClick={onClose}>OK</Button>
                </Space>
                }
            >
                <div>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                </div>
            </Drawer>
        </Fragment>
    );
}