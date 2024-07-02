import { createSlice } from '@reduxjs/toolkit'

export const selectedCountrySlice = createSlice({
  name: 'selectedCountry',
  initialState: {
    id: null
  },
  reducers: {
    // clear the currently selected country. used when a country is selected and back button is clicked for example
    clear: state => {
      state.value = null
    },
    // set a country ID as selected. used when a country is clicked on for example
    select: (state, data) => {
      state.id = data.payload
    }
  }
})

export const { clear, select } = selectedCountrySlice.actions

export default selectedCountrySlice.reducer