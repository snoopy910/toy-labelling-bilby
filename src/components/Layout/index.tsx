import React from "react";
import { HeaderComponent } from "components/Header";
import { Layout } from "./style";
import { FooterComponent } from "../Footer";

interface LayoutProps {
  children?: React.ReactNode;
}

export const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Layout>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </Layout>
  );
};
