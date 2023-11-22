import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
}

const productCartSlice = createSlice({
  name: 'productCart',
  initialState,
  reducers: {
    addItem: (state, action) => {},
    updateItem: (state, action) => {},
  },
  extraReducers: (builder) => {},
})

export const { addItem } = productCartSlice.actions
export default productCartSlice.reducer
