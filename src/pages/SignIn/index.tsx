import { useState } from "react";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { CardLogin, ContainerSignIn, Logo } from "./styles";

import { Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@styles/typography";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@hooks/useToast";

import logo from "@assets/logo-zebot.svg";
import { signIn } from "@services/auth";
import { useProfile } from "@hooks/useProfile";

const signInFormSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type signInFormSchemaData = z.infer<typeof signInFormSchema>;

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { openToast } = useToast();

  const { saveProfileFn } = useProfile();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<signInFormSchemaData>({
    resolver: zodResolver(signInFormSchema),
  });

  async function onSubmit(data: signInFormSchemaData) {
    setIsLoading(true);
    try {
      const { user } = await signIn({
        email: data.email,
        password: data.password,
      });

      await saveProfileFn({
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        photo_url: user.photo_url,
      });

      reset({ email: "", password: "" });

      navigate("/");
    } catch (error) {
      setError("email", { type: "custom", message: "Invalid email" });
      setError("password", { type: "custom", message: "Invalid password" });
      openToast({
        isOpen: true,
        title: "Erro ao entrar",
        content: "Email e/ou senha inválidos",
        error: true,
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  }

  function onInvalid() {
    openToast({
      isOpen: true,
      title: "Campos obrigatórios vazios",
      content: "Preencha os campos obrigatórios para fazer o login",
      error: true,
    });
  }

  return (
    <ContainerSignIn
      justify={"center"}
      align={"center"}
      gap={"6"}
      direction={"column"}
    >
      <Logo src={logo} />
      <CardLogin>
        <Flex width={"100%"} align={"center"} justify={"center"}>
          <Flex p="5" width={"100%"}>
            <Flex direction={"column"} gap={"5"} width={"100%"}>
              <Flex direction={"column"} gap={"2"} width={"100%"}>
                <Label size={"3"} error={errors.email !== undefined}>
                  Email
                </Label>

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField.Root
                      placeholder={"Digite seu email"}
                      size={"3"}
                      color={errors.email ? "red" : "green"}
                      {...field}
                    >
                      <TextField.Slot>
                        <Mail size={16} color={"var(--gray-a11)"} />
                      </TextField.Slot>
                    </TextField.Root>
                  )}
                />
              </Flex>

              <Flex direction={"column"} gap={"2"} width={"100%"}>
                <Label size={"3"} error={errors.password !== undefined}>
                  Senha
                </Label>

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField.Root
                      placeholder={"Digite sua senha"}
                      size={"3"}
                      type="password"
                      color={errors.password ? "red" : "green"}
                      {...field}
                    >
                      <TextField.Slot>
                        <Lock size={16} color={"var(--gray-a11)"} />
                      </TextField.Slot>
                    </TextField.Root>
                  )}
                />
              </Flex>

              <Flex direction={"column"} gap={"2"} align={"center"}>
                <Button
                  size={"3"}
                  onClick={handleSubmit(onSubmit, onInvalid)}
                  loading={isLoading}
                  disabled={isLoading}
                  style={{ width: "100%" }}
                >
                  Acessar conta
                </Button>

                <Link to="/signup" style={{ color: "var(--green-a9)" }}>
                  <Text>Não possui conta? Cadastre-se</Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </CardLogin>
    </ContainerSignIn>
  );
}
