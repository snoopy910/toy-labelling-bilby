import { LayoutComponent } from "./components/Layout";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { DocumentPage } from "./pages/Document";
import { DocumentsContextProvider } from "./contexts";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DocumentsContextProvider>
        <LayoutComponent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/documents" element={<DocumentPage />} />
          </Routes>
        </LayoutComponent>
      </DocumentsContextProvider>
    </BrowserRouter>
  );
};

export default App;
