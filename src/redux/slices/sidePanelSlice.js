import { createSlice } from '@reduxjs/toolkit'

export const sidePanelSlice = createSlice({
  name: 'sidePanel',
  initialState: {
    open: false, // if the side panel is open 
    expandSidePanelButton: null 
  },
  reducers: {
    open: state => {
      state.open = true
    },
    close: state => {
      state.open = false
    },
    setExpandSidePanelButton: (state, expandSidePanelButtonRef) => {
        state.expandSidePanelButton = expandSidePanelButtonRef.payload;
    }
  }
})

export const { open, close, setExpandSidePanelButton } = sidePanelSlice.actions

export default sidePanelSlice.reducer