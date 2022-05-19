import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  address: [],
  email: '',
  orders: '',
  name: '',
  phonenumber: '',
  uid: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeBalance: (state, action) => {
      state.balance = action.payload;
    },
    changeAddress: (state, action) => {
      state.address = action.payload;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    changeOrders: (state, action) => {
      state.orders = action.payload;
    },
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changePhonenumber: (state, action) => {
      state.phonenumber = action.payload;
    },
    changeUid: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const {
  changeBalance,
  changeAddress,
  changeEmail,
  changeOrders,
  changeName,
  changePhonenumber,
  changeUid,
} = userSlice.actions;
export default userSlice.reducer;
