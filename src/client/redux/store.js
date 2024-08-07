import { configureStore } from '@reduxjs/toolkit'
import selectedCountryReducer from './slices/selectedCountrySlice'
import sidePanelReducer from './slices/sidePanelSlice'
import selectedTabReducer from './slices/selectedTabSlice'

export default configureStore({
  reducer: {
    selectedCountry: selectedCountryReducer,
    sidePanel: sidePanelReducer,
    selectedTab: selectedTabReducer
  }
})