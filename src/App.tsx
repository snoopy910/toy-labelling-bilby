import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayoutComponent } from "./components/Layout";
import { PATH } from "./consts";
import { DocumentsContextProvider } from "./contexts";
import { HomePage, DocumentPage } from "./pages";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DocumentsContextProvider>
        <LayoutComponent>
          <Routes>
            <Route path={PATH.HOME} element={<HomePage />} />
            <Route path={PATH.DOCUMENTS} element={<DocumentPage />} />
          </Routes>
        </LayoutComponent>
      </DocumentsContextProvider>
    </BrowserRouter>
  );
};

export default App;
