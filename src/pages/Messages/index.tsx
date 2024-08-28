import { Paginate } from "@components/shared/Paginate";
import { SuspiciousMessageDTO } from "@dtos/suspiciousMessageDTO";
import { usePagination } from "@hooks/usePagination";
import { Dialog, Flex, Link, Table, Text } from "@radix-ui/themes";
import { fetchMessages } from "@services/messages";
import { useQuery } from "@tanstack/react-query";

export function Messages() {
  const { data: messages = [] as SuspiciousMessageDTO[] } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });

  async function getMessages(): Promise<SuspiciousMessageDTO[]> {
    try {
      const { suspicious_messages } = await fetchMessages();

      return suspicious_messages;
    } catch (error) {
      return [];
    }
  }

  const {
    currentPage,
    elementsPerPage,
    elements,
    paginate,
    previousPage,
    nextPage,
    saveElementsPerPage,
  } = usePagination<SuspiciousMessageDTO>({ data: messages });

  return (
    <Flex
      style={{ minHeight: "calc(100vh - 5.6rem)" }}
      direction={"column"}
      p={"6"}
      gap={"5"}
    >
      <Flex direction={"column"}>
        <Text size={"6"} weight={"bold"}>
          Mensagens
        </Text>

        <Text size={"3"} weight={"medium"}>
          Aqui estão as mensagens mais usadas por golpistas no momento(segundo
          os dados coletados com o ZéBot)
        </Text>
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell style={{ width: 480 }}>
              Mensagens
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell align="center">
              Vezes Usada
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {elements.map((message) => (
            <Table.Row key={message.id} align={"center"}>
              <Table.RowHeaderCell
                style={{
                  maxWidth: 480,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {message.message}
              </Table.RowHeaderCell>

              <Table.Cell align="center">
                {message.number_of_times_used ?? 0}
              </Table.Cell>

              <Table.Cell align="right">
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Link
                      underline="always"
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                      Visualizar
                    </Link>
                  </Dialog.Trigger>

                  <Dialog.Content size="4">
                    <Text as="p" trim="both" size="4">
                      {message.message}
                    </Text>
                  </Dialog.Content>
                </Dialog.Root>
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
        totalelements={messages.length}
      />
    </Flex>
  );
}
