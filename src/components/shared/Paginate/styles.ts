import { FlexComponent } from "@styles/layout-components";
import styled from "styled-components";

export const ButtonPage = styled(FlexComponent)`
  width: 32px;
  height: 32px;
  color: var(--gray-a9);
  border-radius: var(--radius-2);

  cursor: default;

  &:hover {
    background-color: var(--accent-a5);
  }

  &.active {
    background-color: var(--accent-9);
    color: var(--gray-1);
  }
`;
