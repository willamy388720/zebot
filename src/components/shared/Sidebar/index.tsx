import { ReactElement, useState } from "react";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  User,
} from "lucide-react";

import {
  Bar,
  CollapsedSidebar,
  ContainerSidebar,
  ItemText,
  MenuItem,
} from "./styles";

import { Avatar, Badge, Flex, Text } from "@radix-ui/themes";
import { useSidebar } from "@hooks/useSidebar";

import { useLocation } from "react-router-dom";
import { useProfile } from "@hooks/useProfile";

type Item = {
  path: string;
  name: string;
  icon: ReactElement;
  disabled: boolean;
};

export function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();

  const location = useLocation();

  const [activeItem, setActiveItem] = useState(location.pathname);

  const { user } = useProfile();

  const itemsUser: Item[] = [
    {
      path: "/",
      name: "Visão geral",
      icon: <LayoutDashboard size={18} />,
      disabled: false,
    },
    {
      path: "/perfil",
      name: "Perfil",
      icon: <User size={18} />,
      disabled: false,
    },
    {
      path: "/lista-negra",
      name: "Lista Negra",
      icon: <ClipboardList size={18} />,
      disabled: false,
    },
    {
      path: "/mensagens",
      name: "Mensagens",
      icon: <MessageSquare size={18} />,
      disabled: false,
    },
  ];

  async function handleLogout() {
    try {
    } catch (error) {
      throw error;
    }
  }

  return (
    <ContainerSidebar>
      <Bar
        direction={"column"}
        height={"100%"}
        justify={"between"}
        collapsed={collapsed}
      >
        <Flex direction={"column"} gap={"1"} mt={"2"}>
          <Flex
            direction={"column"}
            align={"center"}
            gap="3"
            mt={collapsed ? "3" : "6"}
            mb={collapsed ? "4" : "8"}
          >
            <Avatar
              size={collapsed ? "3" : "8"}
              src={user.photo_url}
              fallback="A"
              radius="full"
            />

            <Text
              weight={"bold"}
              style={{ display: collapsed ? "none" : "block" }}
            >
              {user.name}
            </Text>

            <Badge
              variant="outline"
              style={{ display: collapsed ? "none" : "block" }}
            >
              Conectado
            </Badge>

            <Badge
              variant="outline"
              style={{
                display: collapsed ? "block" : "none",
                maxWidth: 50,
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "100%",
                textOverflow: "ellipsis",
              }}
            >
              Conectado
            </Badge>
          </Flex>

          {itemsUser.map((item, index) => (
            <MenuItem
              to={item.path}
              key={index}
              disabled={item.disabled}
              active={item.path === activeItem}
              onClick={() => setActiveItem(item.path)}
              collapsed={collapsed}
            >
              <Flex gap={"2"} align={"center"}>
                {item.icon}
                <ItemText
                  size={"3"}
                  style={{ display: collapsed ? "none" : "block" }}
                  weight={"medium"}
                >
                  {item.name}
                </ItemText>
              </Flex>
            </MenuItem>
          ))}

          <MenuItem to={"/signin"} collapsed={collapsed} onClick={handleLogout}>
            <Flex gap={"2"} align={"center"}>
              <LogOut size={18} color="var(--red-11)" />
              <ItemText
                size={"3"}
                style={{
                  display: collapsed ? "none" : "block",
                  color: "var(--red-11)",
                }}
                weight={"medium"}
              >
                Sair
              </ItemText>
            </Flex>
          </MenuItem>
        </Flex>

        <Flex direction={"column"} gap={"4"} mb={"4"}>
          <CollapsedSidebar
            onClick={toggleSidebar}
            style={{ justifyContent: collapsed ? "center" : "flex-start" }}
          >
            <ArrowRightToLine
              style={{ display: collapsed ? "block" : "none" }}
              size={18}
            />
            <ArrowLeftToLine
              style={{ display: collapsed ? "none" : "block" }}
              size={18}
            />
            <ItemText
              size={"3"}
              style={{ display: collapsed ? "none" : "block" }}
              weight={"medium"}
            >
              Minimizar
            </ItemText>
          </CollapsedSidebar>
        </Flex>
      </Bar>
    </ContainerSidebar>
  );
}
