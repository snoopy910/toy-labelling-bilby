import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayoutComponent } from "./components/Layout";
import { DOCUMENTS, HOME } from "./consts/path";
import { DocumentsContextProvider } from "./contexts";
import { HomePage, DocumentPage } from "./pages";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DocumentsContextProvider>
        <LayoutComponent>
          <Routes>
            <Route path={HOME} element={<HomePage />} />
            <Route path={DOCUMENTS} element={<DocumentPage />} />
          </Routes>
        </LayoutComponent>
      </DocumentsContextProvider>
    </BrowserRouter>
  );
};

export default App;
