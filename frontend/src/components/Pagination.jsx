import React, { useEffect, useState } from "react";

const Pagination = ({ totalPages, page, setPage }) => {
  const [paginationArray, setPaginationArray] = useState([]);

  const handlePrev = () => {
    setPage(page - 1);
  };
  const handleNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const prevArray = Array.from({ length: 2 }, (_, i) => page - 1 - i).filter(
      (p) => p > 0
    );
    const nextArray = Array.from({ length: 3 }, (_, i) => page + i).filter(
      (p) => p <= totalPages
    );
    setPaginationArray([...prevArray, ...nextArray]);
  }, [totalPages]);

  return (
    <div className="pagination-container">
      <button onClick={handlePrev} disabled={page === 1}>
        {"<"}
      </button>
      {paginationArray?.map((p) => {
        return (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={page === p ? "pagination-btn-active" : ""}
          >
            {p}
          </button>
        );
      })}
      <button onClick={handleNext} disabled={page === totalPages}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
