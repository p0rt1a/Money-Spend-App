import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [
      {
        id: "1",
        name: "Salad",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        price: 2000,
      },
      {
        id: "2",
        name: "Ship",
        image:
          "https://plus.unsplash.com/premium_photo-1661884711981-b92c6755af7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        price: 299999900,
      },
      {
        id: "3",
        name: "Island",
        image:
          "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1773&q=80",
        price: 799999999900,
      },
      {
        id: "4",
        name: "Bear Doll",
        image:
          "https://images.unsplash.com/photo-1560743787-f7cd7bb9c5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        price: 700,
      },
      {
        id: "5",
        name: "Earth",
        image:
          "https://images.unsplash.com/photo-1632395627760-72e6eca7f9c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
        price: 99999999999900,
      },
    ],
    balance: 99999999999900,
    boughtItems: [],
    slipItems: [],
  },
  reducers: {
    buy: (state, action) => {
      var { id, price, count, name } = action.payload;

      if (state.balance < price * count) {
        throw new Error("You are too broke to buy it!");
      }

      state.balance -= price * count;

      var itemIndex = state.boughtItems.findIndex((x) => x.id === id);

      itemIndex < 0
        ? state.boughtItems.push(action.payload)
        : (state.boughtItems[itemIndex].count += count);

      state.slipItems.push({ ...action.payload, isSold: false });
    },
    sell: (state, action) => {
      var { id, price, count, name } = action.payload;

      var itemIndex = state.boughtItems.findIndex((x) => x.id === id);

      if (itemIndex < 0) {
        throw new Error("You dont have that item!");
      }

      var item = state.boughtItems[itemIndex];

      if (item.count < count) {
        throw new Error(
          `You have ${item.count} items and trying to sell ${count}!`
        );
      }

      state.balance += count * price;

      state.boughtItems[itemIndex].count -= count;

      if (item.count === 0) {
        var itemsLeft = state.boughtItems.filter((x) => x.id !== item.id);

        state.boughtItems = itemsLeft;
      }

      state.slipItems.push({ isSold: true, count, price, name });
    },
  },
});

export const { buy, sell } = itemsSlice.actions;
export default itemsSlice.reducer;
