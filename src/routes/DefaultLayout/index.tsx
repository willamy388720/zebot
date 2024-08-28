import { Outlet } from "react-router-dom";
import { LayoutContainer } from "./styles";
import { Header } from "@components/shared/Header";
import { Sidebar } from "@components/shared/Sidebar";
import { SidebarProvider } from "@contexts/SidebarContext";
import { ContentPage } from "@components/shared/ContentPage";

export function DefaultLayout() {
  return (
    <SidebarProvider>
      <LayoutContainer direction={"column"} align={"center"}>
        <Sidebar />
        <Header />
        <ContentPage>
          <Outlet />
        </ContentPage>
      </LayoutContainer>
    </SidebarProvider>
  );
}
