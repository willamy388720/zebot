import { useEffect, useState } from "react";

type UsePaginationProps<T> = {
  data: T[] | undefined;
  itemsPerPage?: string;
};

export function usePagination<T>({
  data,
  itemsPerPage = "10",
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(itemsPerPage);
  const [elements, setElements] = useState<T[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setElements(data.slice(0, parseInt(elementsPerPage)));
    }
  }, [data, elementsPerPage]);

  function paginate(pageNumber: number) {
    if (!data) return;
    setCurrentPage(pageNumber);

    const startIndex = (pageNumber - 1) * parseInt(elementsPerPage);
    const endIndex = startIndex + parseInt(elementsPerPage);

    setElements(data.slice(startIndex, endIndex));
  }

  function previousPage() {
    if (!data || currentPage === 1) return;

    const newPage = currentPage - 1;
    setCurrentPage(newPage);

    const startIndex = (newPage - 1) * parseInt(elementsPerPage);
    const endIndex = startIndex + parseInt(elementsPerPage);

    setElements(data.slice(startIndex, endIndex));
  }

  function nextPage() {
    if (
      !data ||
      currentPage === Math.ceil(data.length / parseInt(elementsPerPage))
    )
      return;

    const newPage = currentPage + 1;
    setCurrentPage(newPage);

    const startIndex = (newPage - 1) * parseInt(elementsPerPage);
    const endIndex = startIndex + parseInt(elementsPerPage);

    setElements(data.slice(startIndex, endIndex));
  }

  function saveElementsPerPage(value: string) {
    setElementsPerPage(value);
    paginate(1);
  }

  return {
    currentPage,
    elementsPerPage,
    elements,
    paginate,
    previousPage,
    nextPage,
    saveElementsPerPage,
  };
}
