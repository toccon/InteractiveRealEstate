import { createSlice } from '@reduxjs/toolkit'

export const sidePanelSlice = createSlice({
  name: 'sidePanel',
  initialState: {
    open: false, // if the side panel is open 
    expandSidePanelButton: null // reference to the button
  },
  reducers: {
    // open the side panel
    open: state => {
      state.open = true
    },
    // close the side panel
    close: state => {
      state.open = false
    },
    // set the reference to the button which is used to open the side panel 
    setExpandSidePanelButton: (state, expandSidePanelButtonRef) => {
        state.expandSidePanelButton = expandSidePanelButtonRef.payload;
    }
  }
})

export const { open, close, setExpandSidePanelButton } = sidePanelSlice.actions

export default sidePanelSlice.reducer