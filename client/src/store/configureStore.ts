import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import apiMiddleware from "./middleware/apiMiddleware";
// import {
//    persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist"; //uncomment needed for persist

// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web //uncomment needed for persist

// const persistConfig = { //uncomment needed for persist
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducer); //uncomment needed for persist

// store.ts
export const {
  store,
  //persistor  //uncomment needed for persist
} = (() => {
  const store = configureStore({
    // reducer: persistedReducer, //uncomment needed for persist
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // serializableCheck: {
        //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // }, //uncomment needed for persist
      }).concat(apiMiddleware),
  });
  // const persistor = persistStore(store); //uncomment needed for persist
  return {
    store,
    //persistor  //uncomment needed for persist
  };
})();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//without persist store
// import { configureStore } from "@reduxjs/toolkit";
// import reducer from "./reducer";
// import apiMiddleware from "./middleware/apiMiddleware";

// export default function () {
//   return configureStore({
//     reducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(apiMiddleware),
//   });
// }
