"use client";

import { Provider } from "react-redux";
import {
  store,
  persistor
} from "../stores";
import { PersistGate } from "redux-persist/lib/integration/react";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate 
      // loading={<p>loading</p>} 
      persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
