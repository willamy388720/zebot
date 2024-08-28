import { ScammerContactDTO } from "@dtos/scammerContactDTO";
import { fetchScammerContacts } from "@services/scammerContact";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useBlacklist() {
  const { data: blacklist = [] as ScammerContactDTO[], isLoading } = useQuery({
    queryKey: ["blacklist"],
    queryFn: getBlacklist,
  });

  async function getBlacklist(): Promise<ScammerContactDTO[]> {
    try {
      const { contacts } = await fetchScammerContacts();

      return contacts;
    } catch (error) {
      return [];
    }
  }

  const queryClient = useQueryClient();

  const { mutateAsync: deleteScammerContactFn } = useMutation({
    mutationFn: deleteScammerContact,
    onSuccess(_, variables) {
      queryClient.setQueryData(["blacklist"], (data) => {
        if (Array.isArray(data))
          return data.filter((contact) => contact.id !== variables);
      });
    },
  });

  async function deleteScammerContact(id: string) {
    return id;
  }

  return {
    blacklist,
    isLoading,
    deleteScammerContactFn,
  };
}
