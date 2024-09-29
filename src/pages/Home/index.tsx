import { Flex, Text } from "@radix-ui/themes";
import { getQrCode } from "@services/auth";
import { useEffect, useState } from "react";

export function Home() {
  const [qrCode, setQrCode] = useState("");

  async function loadQrCode() {
    try {
      const { qr_code } = await getQrCode();

      setQrCode(qr_code);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadQrCode();
  }, []);

  return (
    <Flex
      direction={"column"}
      p={"5"}
      align={"center"}
      justify={"center"}
      gap={"4"}
      style={{ minHeight: "calc(100vh - 5.6rem)" }}
    >
      <Flex align={"center"} gap={"2"}>
        <Text size={"5"} weight={"bold"}>
          Use esse QR Code para se conectar ao Zé Bot
        </Text>
      </Flex>
      <img src={qrCode} alt="" width={500} />
    </Flex>
  );
}
