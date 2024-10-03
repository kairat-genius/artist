import React, { Suspense, lazy } from "react";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import 'normalize.css';

import { useURL } from "../src/hooks/useURL";
const Home = lazy(() => import("./pages/Home/Home"));
const WallPainting = lazy(() => import("../src/pages/WallPainting/WallPainting"));
const OilPainting = lazy(() => import("../src/pages/OilPainting/OilPainting"));
const DigitalIllustration = lazy(() => import("../src/pages/DigitalIllustration/DigitalIllustration"));
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const Root = () => {
  const url = useURL();

  return (
    <Suspense fallback={<div></div>}>
      <Header/>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path={url.WallPainting.path} element={<WallPainting />} />
          <Route path={url.OilPainting.path} element={<OilPainting />} />
          <Route path={url.DigitalIllustration.path} element={<DigitalIllustration/>} />
        </Route>
      </Routes>
      <Footer/>
    </Suspense>
  );
};

// Конфигурация роутера
const router = createBrowserRouter([
  {
    path: "*",
    element: <Root />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
