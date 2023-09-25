import axios from "axios";
import { server } from "../../serverUrl";

export const addFriend = (info) => async (dispatch) => {
  try {
    dispatch({
      type: "addFriendRequest",
    });
    console.log(info,"action");
    const { data } = await axios.post(
      `${server}/chat/customer/add-customer-friend`,
      info
    );
    console.log(data);

    dispatch({
      type: "addFriendSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "addFriendFailed",
      payload: error.response.data,
    });
  }
};

export const sendMessage = (info) => async (dispatch) => {
  try {
    dispatch({
      type: "sendMessageRequest",
    });

    const { data } = await axios.post(
      `${server}/chat/customer/send-message-to-seller`,
      info
    );
    console.log(data);

    dispatch({
      type: "sendMessageSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "sendMessageFailed",
      payload: error.response.data,
    });
  }
};
