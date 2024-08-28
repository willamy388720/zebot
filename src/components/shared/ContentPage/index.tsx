import { useSidebar } from "@hooks/useSidebar";
import { ReactNode } from "react";
import { Content } from "./styles";

type ContentPageProps = {
  children: ReactNode;
};
export function ContentPage({ children }: ContentPageProps) {
  const { collapsed } = useSidebar();
  return (
    <Content direction={"column"} mt={"5"} sidebarCollapsed={collapsed}>
      {children}
    </Content>
  );
}
