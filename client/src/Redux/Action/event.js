import axios from "axios";

// create event

import { server } from "../../serverUrl";

export const createevent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const config = { headers: { "Content-Type": "Multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );

    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all events for shop

export const getAllShopevent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventRequest",
    });
    const config = { headers: { "Content-Type": "Multipart/form-data" } };

    const { data } = await axios.get(
      `${server}/event/get-all-events/${id}`,
      config
    );

    dispatch({
      type: "getAllShopEventSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllShopEventFailed",
      payload: error.response.data.message,
    });
  }
};

// delete event of a shop

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteeventRequest",
    });
    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: "deleteeventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteeventFailed",
      payload: error.response.data.message,
    });
  }
};
//get all event 

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsRequest",
    });

    const {data} = await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type: "getAlleventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsFailed",
      // payload: error.response.data.message,
    });
  }
}