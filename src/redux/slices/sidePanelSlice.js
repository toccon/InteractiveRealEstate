import { createSlice } from '@reduxjs/toolkit'

export const sidePanelSlice = createSlice({
  name: 'sidePanel',
  initialState: {
    open: false // if the side panel is open 
  },
  reducers: {
    // open the side panel
    open: state => {
      state.open = true
    },
    // close the side panel
    close: state => {
      state.open = false
    }
  }
})

export const { open, close, setExpandSidePanelButton } = sidePanelSlice.actions

export default sidePanelSlice.reducer