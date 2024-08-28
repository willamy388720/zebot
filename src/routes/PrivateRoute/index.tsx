import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Flex, Spinner } from "@radix-ui/themes";
import { isAuthenticated } from "@services/auth";
import { useProfile } from "@hooks/useProfile";

type PrivateProps = {
  children: ReactNode;
};

export function PrivateRoute({ children }: PrivateProps) {
  const { isLoading } = useProfile();

  if (isLoading) {
    return (
      <Flex
        style={{ height: "100vh" }}
        width={"100%"}
        justify={"center"}
        align={"center"}
      >
        <Spinner size={"3"} />
      </Flex>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/signin" />;
  }

  return children;
}
