import { createAction } from "@reduxjs/toolkit";

export const apiCallBegin = createAction(
  "apiCallBegin",
  function prepare(payload) {
    return {
      payload ,
    };
  }
);
export const apiCallSuccess = createAction(
  "apiCallSuccess",
  function prepare(payload) {
    return {
      payload ,
    };
  }
);
export const apiCallFailed = createAction(
  "apiCallFailed",
  function prepare(payload) {
    return {
      payload ,
    };
  }
);
