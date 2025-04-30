import { createSlice } from '@reduxjs/toolkit'

export const selectedTabSlice = createSlice({
  name: 'selectedTab',
  initialState: {
    tabName: "explore"
  },
  reducers: {
    // set a tab as selected. used when a tab is clicked on in FixedHeader.jsx
    selectTab: (state, data) => {
      state.tabName = data.payload
    }
  }
})

export const { selectTab } = selectedTabSlice.actions

export default selectedTabSlice.reducer