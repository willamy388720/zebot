import { Flex, Spinner, Text } from "@radix-ui/themes";
import { sendNegativeEmail } from "@services/sendMail";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export function NegativeDecision() {
  const [emailSent, setEmailSent] = useState(false);
  const { maliciousPhoneNumber } = useParams();

  const emailSentRef = useRef(false);

  async function sendEmail() {
    if (emailSentRef.current) {
      return;
    }

    if (!maliciousPhoneNumber) return;

    try {
      await sendNegativeEmail({
        maliciousPhoneNumber: maliciousPhoneNumber.replace("%20", ""),
      });
      setEmailSent(true);
      emailSentRef.current = true;
    } catch (error) {
      console.log("Erro ao enviar email:", error);
    }
  }

  useEffect(() => {
    sendEmail();
  }, []);

  return (
    <Flex
      width={"100%"}
      style={{ height: "100vh" }}
      align={"center"}
      justify={"center"}
    >
      {!emailSent && <Spinner size={"3"} />}
      {emailSent && (
        <Flex direction={"column"} gap={"2"} align={"center"}>
          <Text size={"6"} weight={"bold"}>
            Email enviado!
          </Text>
          <Text size={"4"} weight={"medium"}>
            Verifique sua caixa de email, pode fechar essa aba!
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
