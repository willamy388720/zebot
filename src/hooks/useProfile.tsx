import { UserDTO } from "@dtos/userDTO";
import { getProfile } from "@services/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProfile() {
  const { data: user = {} as UserDTO, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  async function getUser() {
    try {
      const { user } = await getProfile();

      return user as UserDTO;
    } catch (error) {
      return {} as UserDTO;
    }
  }

  const queryClient = useQueryClient();

  const { mutateAsync: saveProfileFn } = useMutation({
    mutationFn: saveProfile,
    onSuccess(_, variables) {
      queryClient.setQueryData(["user"], () => {
        return {
          id: variables.id,
          name: variables.name,
          email: variables.email,
          phone_number: variables.phone_number,
          photo_url: variables.photo_url,
        };
      });
    },
  });

  async function saveProfile(data: UserDTO) {
    return data;
  }

  return {
    user,
    isLoading,
    saveProfileFn,
  };
}
