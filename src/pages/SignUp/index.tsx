import { ChangeEvent, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import { CardLogin, ContainerSignUp, Logo } from "./styles";

import { Lock, Mail, Phone, Plus, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@styles/typography";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@hooks/useToast";

import logo from "@assets/logo-zebot.svg";
import { signUp } from "@services/auth";

const signUpFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password is required"),
    confirmPassword: z.string().min(6, "Password is required"),
    photoUrl: z.string().min(1, "Photo is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export type signUpFormSchemaData = z.infer<typeof signUpFormSchema>;

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const { openToast } = useToast();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<signUpFormSchemaData>({
    resolver: zodResolver(signUpFormSchema),
  });

  async function onSubmit(data: signUpFormSchemaData) {
    setIsLoading(true);

    try {
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        phone_number: data.phoneNumber,
        photo_url: data.photoUrl,
      });

      reset({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        photoUrl: "",
      });

      navigate("/signin");
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
    if (errors.confirmPassword) {
      openToast({
        isOpen: true,
        title: "Confirmação de senha inválida",
        content: "As senhas precisam ser identicas",
        error: true,
      });
    } else {
      openToast({
        isOpen: true,
        title: "Campos obrigatórios vazios",
        content: "Preencha os campos obrigatórios para fazer o cadastro",
        error: true,
      });
    }
  }

  function handleSelectPhoto() {
    fileInputRef.current?.click();
  }

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        onChange(reader.result as string);
      };
    }
  }

  return (
    <ContainerSignUp
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
              <Flex
                direction={"column"}
                gap={"2"}
                width={"100%"}
                align={"center"}
              >
                <Flex style={{ position: "relative" }}>
                  <Avatar
                    radius="full"
                    size="9"
                    src={watch("photoUrl")}
                    fallback="A"
                  />

                  <IconButton
                    radius="full"
                    size={"3"}
                    style={{ position: "absolute", bottom: 0, right: 10 }}
                    onClick={handleSelectPhoto}
                  >
                    <Plus size={16} />
                  </IconButton>
                </Flex>

                <Controller
                  name="photoUrl"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <input
                      ref={fileInputRef}
                      type="file"
                      style={{ display: "none" }}
                      onChange={(event) => handleImageChange(event, onChange)}
                    />
                  )}
                />
              </Flex>

              <Flex direction={"column"} gap={"2"} width={"100%"}>
                <Label size={"3"} error={errors.name !== undefined}>
                  Nome
                </Label>

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField.Root
                      placeholder={"Digite seu nome"}
                      size={"3"}
                      color={errors.name ? "red" : "green"}
                      {...field}
                    >
                      <TextField.Slot>
                        <User size={16} color={"var(--gray-a11)"} />
                      </TextField.Slot>
                    </TextField.Root>
                  )}
                />
              </Flex>

              <Flex direction={"column"} gap={"2"} width={"100%"}>
                <Label size={"3"} error={errors.phoneNumber !== undefined}>
                  Número do Celular
                </Label>

                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField.Root
                      placeholder={"+55 (00) 00000-0000"}
                      size={"3"}
                      color={errors.phoneNumber ? "red" : "green"}
                      {...field}
                    >
                      <TextField.Slot>
                        <Phone size={16} color={"var(--gray-a11)"} />
                      </TextField.Slot>
                    </TextField.Root>
                  )}
                />
              </Flex>

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

              <Flex direction={"column"} gap={"2"} width={"100%"}>
                <Label size={"3"} error={errors.confirmPassword !== undefined}>
                  Confirmação de Senha
                </Label>

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField.Root
                      placeholder={"Digite sua senha novamente"}
                      size={"3"}
                      type="password"
                      color={errors.confirmPassword ? "red" : "green"}
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
                  Cadastrar-se
                </Button>

                <Link to="/signin" style={{ color: "var(--green-a9)" }}>
                  <Text>Cancelar</Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </CardLogin>
    </ContainerSignUp>
  );
}
