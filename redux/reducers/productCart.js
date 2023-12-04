import { createSlice } from '@reduxjs/toolkit'
import { getCartAsync } from '../actions/productCart'

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  status: 'IDLE', // IDLE | LOADING | SUCCEEDED | FAILED
}

const productCartSlice = createSlice({
  name: 'productCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartAsync.pending, (state) => {
        state.status = 'LOADING'
      })
      .addCase(getCartAsync.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED'
        state.items = action.payload.cartP
        // 只有勾選的才計算總金額
        state.totalPrice = action.payload.cartP.reduce(
          (total, item) =>
            item.check ? total + item.quantity * item.price : total,
          0
        )
        state.totalQuantity = action.payload.cartP.reduce(
          (total, item) => total + item.quantity,
          0
        )
      })
      .addCase(getCartAsync.rejected, (state) => {
        state.status = 'FAILED'
      })
  },
})

// export const { addItem } = productCartSlice.actions
export default productCartSlice.reducer
