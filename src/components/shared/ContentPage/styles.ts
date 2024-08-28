import { FlexComponent } from "@styles/layout-components";
import styled from "styled-components";

type ContentProps = {
  sidebarCollapsed: boolean;
};

export const Content = styled(FlexComponent)<ContentProps>`
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: width 0.3s;
  height: 100%;
  width: ${({ sidebarCollapsed }) =>
    sidebarCollapsed ? "calc(100% - 72px)" : "calc(100% - 240px)"};
  margin-left: ${({ sidebarCollapsed }) =>
    sidebarCollapsed ? "72px" : "240px"};
  margin-top: 5.6rem;
`;
