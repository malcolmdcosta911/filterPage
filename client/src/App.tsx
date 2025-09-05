import "react-range-slider-input/dist/style.css";
import ProductsPage from "./pages/ProductsPage";
// import NavBar from "./Components/NavBar";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
// import store from "./store/configureStore";
import { store, 
  //persistor //uncomment needed for persist

 } from "./store/configureStore";
// import { PersistGate } from "redux-persist/integration/react";

import ProductPage from "./pages/ProductPage";
function App() {
  return (
    // <Provider store={store()}>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */} 
      {/* //uncomment needed for persist */}
        {/* <div className="body-container"> */}
        {/* <header>
        <NavBar />
      </header> */}
        <main>
          {/* <div style={{ paddingTop: 100 }}></div> */}
          <Routes>
            <Route
              path="/"
            >
              <Route index element={<ProductsPage />} />
              <Route path=":id" element={<ProductPage />} />
            </Route>

            <Route path="*" element={<div>pg nt found</div>} />
          </Routes>
        </main>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
