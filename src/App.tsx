import { LayoutComponent } from "./components/Layout";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LayoutComponent>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </LayoutComponent>
    </BrowserRouter>
  );
};

export default App;
