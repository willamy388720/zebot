import { Flex } from "@radix-ui/themes";
import { ContainerHeader, ContentHeader } from "./styles";

import { useQuery } from "@tanstack/react-query";

import logo from "@assets/logo-zebot.svg";

export function Header() {
  const { data: admin = {} as {}, isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: getAdmin,
  });

  async function getAdmin() {}

  return (
    <ContainerHeader justify={"center"} width={"100%"} align={"center"}>
      <ContentHeader justify={"center"} align={"center"} width={"100%"}>
        <Flex gap={"5"} align={"center"}>
          <img src={logo} alt="" className="logo" />
        </Flex>
      </ContentHeader>
    </ContainerHeader>
  );
}
