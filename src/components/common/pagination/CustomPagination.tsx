import { useState } from "react";
import SelectDropdown from "../Select/selectDropdown";

interface CustomPaginationProps {
  totalResults: number;
  resultsPerPage?: number;
  onPageChange: (pageNumber: number) => void;
  onPerPageChange: (pageLimit: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalResults,
  resultsPerPage = 10,
  onPageChange,
  onPerPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      onPageChange(pageNumber);
    }
  };

  const renderPaginationNumbers = () => {
    const pageNumbers: number[] = [];

    for (let index = 1; index <= totalPages; index++) {
      if (index === 1 || index === totalPages) {
        pageNumbers.push(index);
      } else if (index <= currentPage && index >= currentPage - 2) {
        pageNumbers.push(index);
      } else if (index >= currentPage && index <= currentPage + 2) {
        pageNumbers.push(index);
      }
    }

    const pageItems = [];

    if (pageNumbers.length > 0) {
      pageItems.push(
        <a
          key={pageNumbers[0]}
          href="#"
          className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold ${
            currentPage === pageNumbers[0]
              ? "bg-primary text-white"
              : "text-gray-900 hover:bg-gray-50 hover:text-primary "
          }`}
          onClick={() => handlePageChange(pageNumbers[0])}
        >
          {pageNumbers[0]}
        </a>,
      );
    }

    for (let i = 1; i < pageNumbers.length; i++) {
      const currentPageItem = (
        <a
          key={pageNumbers[i]}
          href="#"
          className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold ${
            currentPage === pageNumbers[i]
              ? "bg-primary text-white"
              : "text-gray-900 hover:bg-gray-50 hover:text-primary "
          }`}
          onClick={() => handlePageChange(pageNumbers[i])}
        >
          {pageNumbers[i]}
        </a>
      );
      if (pageNumbers[i] - pageNumbers[i - 1] > 1) {
        pageItems.push("...");
      }

      pageItems.push(currentPageItem);
    }

    return pageItems;
  };

  return (
    <div className="flex items-center justify-center gap-4 px-4 py-3 sm:px-6">
      <div className="flex justify-center sm:flex-1 sm:items-center">
        {/* <div>
          <p className="text-gray-700 text-sm">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * resultsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * resultsPerPage, totalResults)}
            </span>{" "}
            of <span className="font-medium">{totalResults}</span> results
          </p>
        </div> */}
        <div>
          <nav
            className="isolate inline-flex gap-[5px] -space-x-px rounded-md"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="text-gray-400 relative  inline-flex items-center rounded-l-md border border-slate-200 px-2 py-1 ring-inset hover:bg-primary hover:text-white  focus:z-20 focus:outline-offset-0 dark:border-strokedark"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon />
            </a>
            {renderPaginationNumbers()}
            <a
              href="#"
              className="text-gray-400 relative inline-flex items-center rounded-r-md border border-slate-200 px-2 py-1 ring-inset hover:bg-primary hover:text-white  focus:z-20 focus:outline-offset-0 dark:border-strokedark"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon />
            </a>
          </nav>
        </div>
      </div>

      <SelectDropdown
        options={[
          { label: "10", value: 10 },
          { label: "20", value: 20 },
          { label: "30", value: 30 },
        ]}
        value={resultsPerPage}
        onChange={(val) => {
          setCurrentPage(1);
          onPerPageChange(val);
        }}
        className="!px-1 !py-1"
      />
    </div>
  );
};

export default CustomPagination;

const ChevronLeftIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z" />
    </svg>
  );
};

const ChevronRightIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"
      />
    </svg>
  );
};
