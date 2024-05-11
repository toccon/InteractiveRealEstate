import { configureStore } from '@reduxjs/toolkit'
import selectedCountryReducer from './slices/selectedCountrySlice'

export default configureStore({
  reducer: {
    selectedCountry: selectedCountryReducer
  }
})