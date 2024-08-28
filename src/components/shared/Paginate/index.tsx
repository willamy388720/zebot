import { Button, Flex, Select, Text } from "@radix-ui/themes";
import { ButtonPage } from "./styles";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type Props = {
  elementsPerPage: string;
  currentPage: number;
  totalelements: number;
  paginate: (pageNumber: number) => void;
  saveElementsPerPage: (value: string) => void;
  previousPage: () => void;
  nextPage: () => void;
};

export function Paginate({
  elementsPerPage,
  currentPage,
  paginate,
  saveElementsPerPage,
  previousPage,
  nextPage,
  totalelements,
}: Props) {
  const objectsPerPage = ["3", "5", "10", "15", "20"];
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(totalelements / parseInt(elementsPerPage));
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <Flex align={"center"} justify={"between"} width={"100%"}>
      <Text size={"2"} weight={"medium"} color="gray">
        Exibindo{" "}
        {Math.min(
          (currentPage - 1) * parseInt(elementsPerPage) + 1,
          totalelements
        )}{" "}
        a {Math.min(currentPage * parseInt(elementsPerPage), totalelements)} de{" "}
        {totalelements}
      </Text>

      <Flex gap={"6"}>
        <Flex gap={"2"} align={"center"}>
          <Text size={"2"} color="gray" weight={"medium"}>
            Exibir por página:
          </Text>

          <Select.Root
            size={"2"}
            defaultValue={elementsPerPage}
            onValueChange={(value) => {
              saveElementsPerPage(value);
            }}
          >
            <Select.Trigger style={{ width: 80 }} />
            <Select.Content>
              <Select.Group>
                {objectsPerPage.map((item) => (
                  <Select.Item
                    key={item}
                    value={item}
                    disabled={parseInt(item) > totalelements}
                  >
                    {item}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex gap={"2"}>
          <Button
            size={"2"}
            onClick={previousPage}
            variant="soft"
            color="gray"
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon size={16} />
            Anterior
          </Button>
          {pageNumbers.map((number) => (
            <ButtonPage
              key={number}
              onClick={() => paginate(number)}
              justify={"center"}
              align={"center"}
              className={number === currentPage ? "active" : ""}
            >
              <Text size={"2"} weight={"medium"}>
                {number}
              </Text>
            </ButtonPage>
          ))}
          <Button
            size={"2"}
            onClick={nextPage}
            variant="soft"
            color="gray"
            disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
          >
            Próximo
            <ChevronRightIcon size={16} />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
