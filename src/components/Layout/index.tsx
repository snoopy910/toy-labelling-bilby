import React from "react";
import { FooterComponent } from "../Footer";
import { HeaderComponent } from "../Header";
import { Layout } from "./style";

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
