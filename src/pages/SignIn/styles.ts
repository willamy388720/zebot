import { Card } from "@radix-ui/themes";
import { FlexComponent } from "@styles/layout-components";
import styled from "styled-components";

export const ContainerSignIn = styled(FlexComponent)`
  background-color: var(--green-9);
  height: 100vh;
`;

export const Logo = styled.img`
  width: 30rem;
`;

export const CardLogin = styled(Card)`
  padding: 0;
  width: 40rem;
`;
