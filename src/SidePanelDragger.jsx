import React from 'react'

export const SidePanelDragger = ({setWidth}) =>{
    const cbHandleMouseMove = React.useCallback(handleMousemove, []);
    const cbHandleMouseUp = React.useCallback(handleMouseup, []);
    let isResizing = false;

    function handleMousedown(e) {
        e.stopPropagation();
        e.preventDefault();
        // we will only add listeners when needed, and remove them afterward
        document.addEventListener("mousemove", cbHandleMouseMove);
        document.addEventListener("mouseup", cbHandleMouseUp);
        isResizing = true;
    }

    function handleMouseup(e) {
        if (!isResizing) {
            return;
        }
        isResizing = false;
        document.removeEventListener("mousemove", cbHandleMouseMove);
        document.removeEventListener("mouseup", cbHandleMouseUp);
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
        <div className="sidebar-dragger" onMouseDown={handleMousedown} />
    )
}