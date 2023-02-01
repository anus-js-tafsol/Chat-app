import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat: {
    rooms:[]
  },
};

const ChatSlice = createSlice({
  name: "ChatSlice",
  initialState,
  reducers: {
    AddRooms: (state, { payload }) => {
    //   console.log(payload);
      state.chat.rooms = payload;
    },
    
  },
});

export const {AddRooms}= ChatSlice.actions;
export default ChatSlice.reducer;
