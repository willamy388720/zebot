import { Paginate } from "@components/shared/Paginate";
import { ScammerContactDTO } from "@dtos/scammerContactDTO";
import { useBlacklist } from "@hooks/useBlacklist";
import { usePagination } from "@hooks/usePagination";
import {
  AlertDialog,
  Button,
  Flex,
  IconButton,
  Table,
  Text,
} from "@radix-ui/themes";
import { Trash2 } from "lucide-react";

export function Blacklist() {
  const { blacklist } = useBlacklist();

  const {
    currentPage,
    elementsPerPage,
    elements,
    paginate,
    previousPage,
    nextPage,
    saveElementsPerPage,
  } = usePagination<ScammerContactDTO>({ data: blacklist });

  return (
    <Flex
      style={{ minHeight: "calc(100vh - 5.6rem)" }}
      direction={"column"}
      p={"6"}
      gap={"5"}
    >
      <Flex direction={"column"}>
        <Text size={"6"} weight={"bold"}>
          Lista Negra
        </Text>

        <Text size={"3"} weight={"medium"}>
          Aqui estão os números que você adicionou na lista negra
        </Text>
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Número de Telefone</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {elements.map((phone) => (
            <Table.Row key={phone.id} align={"center"}>
              <Table.RowHeaderCell>{phone.phone_number}</Table.RowHeaderCell>

              <Table.Cell align="right">
                <AlertDialog.Root>
                  <AlertDialog.Trigger>
                    <IconButton size={"2"} variant="solid" color="red">
                      <Trash2 size={20} />
                    </IconButton>
                  </AlertDialog.Trigger>
                  <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>
                      Tem certeza que deseja excluir?
                    </AlertDialog.Title>
                    <AlertDialog.Description size="2">
                      Você está prestes a excluir este número de telefone
                      permanentemente da lista negra. Esta ação não pode ser
                      desfeita.
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                      <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                          Cancelar
                        </Button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action>
                        <Button variant="solid" color="red">
                          Excluir
                        </Button>
                      </AlertDialog.Action>
                    </Flex>
                  </AlertDialog.Content>
                </AlertDialog.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Paginate
        elementsPerPage={elementsPerPage}
        currentPage={currentPage}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        saveElementsPerPage={saveElementsPerPage}
        totalelements={blacklist.length}
      />
    </Flex>
  );
}
