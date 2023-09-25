import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  my_friends: [],
  fd_messages: [],
  currentFd: "",
  successMessage: "",
  errorMessage: "",
};

export const chatReducer = createReducer(initialState, {
  addFriendRequest: (state) => {
    state.isLoading = true;
  },
  addFriendSuccess: (state, action) => {
    const payload = action.payload;

    state.isLoading = false;
    state.fd_messages = payload.messages;
    state.currentFd = payload.currentFd;
    state.my_friends = payload.myFriends;
  },
  addFriendFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  sendMessageRequest: (state) => {
    state.isLoading = true;
  },
  sendMessageSuccess: (state, action) => {
    const payload = action.payload;

    let tempFriends = state.my_friends;
    let index = tempFriends.findIndex(
      (f) => f.fdId === payload.message.receverId
    );
    while (index > 0) {
      let temp = tempFriends[index];
      tempFriends[index] = tempFriends[index - 1];
      tempFriends[index - 1] = temp;
      index--;
    }
    state.my_friends = tempFriends;
    state.fd_messages = [...state.fd_messages, payload.message];
    state.successMessage = " message send success";
    state.isLoading = false;
  },
  sendMessageFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // Define other actions specific to your categoryReducer here
  clearErrors: (state) => {
    state.error = null;
  },
});
