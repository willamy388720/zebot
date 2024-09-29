import { useEffect, useRef, useState } from "react";
import { Flex, Spinner, Text } from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import { sendPositiveEmail } from "@services/sendMail";

export function PositiveDecision() {
  const [emailSent, setEmailSent] = useState(false);
  const { info } = useParams();

  const emailSentRef = useRef(false);

  async function sendEmail() {
    if (emailSentRef.current) {
      return;
    }

    if (!info) return;

    try {
      const infoSeparate = decodeURI(info).split("2z2e2");
      const maliciousMessage = infoSeparate[0];
      const maliciousNameContact = infoSeparate[1];
      const maliciousPhoneNumber = infoSeparate[2];
      await sendPositiveEmail({
        maliciousMessage: maliciousMessage.replace("%20", " "),
        maliciousNameContact: maliciousNameContact.replace("%20", " "),
        maliciousPhoneNumber: maliciousPhoneNumber.replace("%20", " "),
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
