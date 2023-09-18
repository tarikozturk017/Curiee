import Link from "next/link";
import { useState } from "react";

const Table = ({ tableHeader, tableBody, rowsPerPage = 5 }) => {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tableBody.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentTableBody =
    tableBody.length > 0 ? tableBody.slice(startIndex, endIndex) : "N/A";

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div
      className=" shadow-lg shadow-blue-300/20 mx-auto rounded-lg p-1 w-full m-0 pt-5 lg:w-2/5 md:w-2/3 lg:max-w-[40%] mb-5"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.11)" }}
    >
      <table className="w-full">
        <thead className="" style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}>
          {tableHeader}
        </thead>
        <tbody>{currentTableBody}</tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center my-3">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="mr-2 px-2 py-1 bg-blue-500 text-white rounded-md"
          >
            Prev
          </button>
          <p className="mr-2 px-2 py-1 text-slate-400">{`Page ${currentPage} of ${totalPages}`}</p>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
