import { zodResolver } from "@hookform/resolvers/zod";
import { useProfile } from "@hooks/useProfile";
import { useToast } from "@hooks/useToast";
import { Avatar, Button, Flex, IconButton, TextField } from "@radix-ui/themes";
import { updateUser } from "@services/auth";
import { Label } from "@styles/typography";
import { Pencil } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const profileInFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Email is required"),
  email: z.string().min(1, "Password is required"),
  photo_url: z.string().min(1, "Photo URL is required"),
  phone_number: z.string().min(1, "Phone Number is required"),
});

export type profileInFormSchemaData = z.infer<typeof profileInFormSchema>;

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, saveProfileFn } = useProfile();

  const { openToast } = useToast();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<profileInFormSchemaData>({
    defaultValues: { ...user },
    resolver: zodResolver(profileInFormSchema),
  });

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

  async function onSubmit(data: profileInFormSchemaData) {
    setIsLoading(true);

    try {
      await updateUser({
        email: data.email,
        name: data.name,
        phone_number: data.phone_number,
        photo_url: data.photo_url,
      });

      await saveProfileFn({ ...data });

      openToast({
        isOpen: true,
        title: "Alterações salvas",
        content: "Edições salvas com sucesso",
        error: false,
      });
    } catch (error) {
      console.log(error);
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: true,
      });
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  }

  function onInvalid() {
    openToast({
      isOpen: true,
      title: "Campos obrigatórios vazios",
      content: "Preencha os campos obrigatórios para fazer a atualização",
      error: true,
    });
  }

  return (
    <Flex
      style={{ minHeight: "calc(100vh - 5.6rem)" }}
      align={"center"}
      justify={"center"}
    >
      <Flex
        direction={"column"}
        gap={"3"}
        style={{ width: 480 }}
        align={"center"}
      >
        <Flex style={{ position: "relative" }}>
          <Avatar
            size="9"
            src={watch("photo_url")}
            fallback="A"
            radius="full"
          />

          {isEditing && (
            <IconButton
              radius="full"
              size={"3"}
              style={{ position: "absolute", bottom: 0, right: 10 }}
              onClick={handleSelectPhoto}
            >
              <Pencil size={16} />
            </IconButton>
          )}

          <Controller
            name="photo_url"
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
          <Label
            size={"3"}
            error={errors.name !== undefined}
            disabled={!isEditing}
          >
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
                disabled={!isEditing}
                {...field}
              />
            )}
          />
        </Flex>

        <Flex direction={"column"} gap={"2"} width={"100%"}>
          <Label
            size={"3"}
            error={errors.phone_number !== undefined}
            disabled={!isEditing}
          >
            Número do Celular
          </Label>

          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <TextField.Root
                placeholder={"+55 (00) 00000-0000"}
                size={"3"}
                color={errors.phone_number ? "red" : "green"}
                disabled={!isEditing}
                {...field}
              />
            )}
          />
        </Flex>

        <Flex direction={"column"} gap={"2"} width={"100%"}>
          <Label
            size={"3"}
            error={errors.email !== undefined}
            disabled={!isEditing}
          >
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
                disabled={!isEditing}
                {...field}
              />
            )}
          />
        </Flex>

        <Flex width={"100%"} style={{ maxWidth: 480 }} mt={"4"}>
          {isEditing ? (
            <Flex gap={"4"} width={"100%"} style={{ maxWidth: 480 }}>
              <Button
                size={"3"}
                style={{ flex: 1 }}
                onClick={() => setIsEditing(false)}
                color="gray"
                variant="soft"
                loading={isLoading}
                disabled={isLoading}
              >
                Cancelar
              </Button>

              <Button
                size={"3"}
                style={{ flex: 1 }}
                onClick={handleSubmit(onSubmit, onInvalid)}
                loading={isLoading}
                disabled={isLoading}
              >
                Salvar Alterações
              </Button>
            </Flex>
          ) : (
            <Button
              size={"3"}
              style={{ width: "100%" }}
              onClick={() => setIsEditing(true)}
            >
              Editar Perfil
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
