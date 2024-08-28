import styled from "styled-components";

import { FlexComponent } from "@styles/layout-components";

export const ContainerHeader = styled(FlexComponent)`
  background-color: var(--green-9);
  border-bottom: 1px solid var(--gray-a6);
  padding: 0 var(--space-5);
  height: 5.6rem;
  align-items: center;
  position: fixed;
  z-index: 10000;
`;

export const ContentHeader = styled(FlexComponent)`
  .logo {
    width: 14.5rem;
    height: 4rem;
  }
`;
