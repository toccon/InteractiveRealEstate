import { configureStore } from '@reduxjs/toolkit'
import selectedCountryReducer from './slices/selectedCountrySlice'
import sidePanelReducer from './slices/sidePanelSlice'

export default configureStore({
  reducer: {
    selectedCountry: selectedCountryReducer,
    sidePanel: sidePanelReducer
  }
})