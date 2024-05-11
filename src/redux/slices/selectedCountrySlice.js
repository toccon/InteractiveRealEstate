import { createSlice } from '@reduxjs/toolkit'

export const selectedCountrySlice = createSlice({
  name: 'selectedCountry',
  initialState: {
    value: null
  },
  reducers: {
    clear: state => {
      state.value = null
    },
    select: (state, data) => {
      state.value = data.payload
    }
  }
})

export const { clear, select } = selectedCountrySlice.actions

export default selectedCountrySlice.reducer