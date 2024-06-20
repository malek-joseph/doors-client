/** @format */



interface PaginationProps {
  listingsPerPage: number;
  totalListings: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  listingsPerPage,
  totalListings,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalListings / listingsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getVisiblePages = (currentPage: number, totalPages: number) => {
    const visiblePages = [currentPage];
    const maxVisiblePages = 5;

    for (
      let i = 1;
      i < maxVisiblePages && visiblePages.length < maxVisiblePages;
      i++
    ) {
      if (currentPage - i > 0) visiblePages.unshift(currentPage - i);
      if (currentPage + i <= totalPages) visiblePages.push(currentPage + i);
    }

    if (visiblePages[0] !== 1) visiblePages.unshift(1);
    if (visiblePages[visiblePages.length - 1] !== totalPages)
      visiblePages.push(totalPages);

    return visiblePages;
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className="flex  justify-center mt-24 ">
      <ul className="flex list-none space-x-2">
        <li className="mx-2">
          <button
            className={`px-3 py-1 border rounded-full text-teal-600 border-teal-600 hover:bg-teal-100 ${
              currentPage === 1 ? "invisible" : "visible"
            }`}
            onClick={() => paginate(currentPage - 1)}>
            Prev
          </button>
        </li>
        {visiblePages.map((number, index) => (
          <li key={index} className="mx-1">
            {number === currentPage ? (
              <button
                className="px-3 py-1 border rounded-full text-white bg-teal-500 border-teal-500"
                onClick={() => paginate(number)}>
                {number}
              </button>
            ) : (
              <button
                className="px-3 py-1 border rounded-full text-teal-600 border-teal-600 hover:bg-teal-100"
                onClick={() => paginate(number)}>
                {number}
              </button>
            )}
          </li>
        ))}
        <li className="mx-2">
          <button
            className={`px-3 py-1 border rounded-full text-teal-600 border-teal-600 hover:bg-teal-100 ${
              currentPage === totalPages ? "invisible" : "visible"
            }`}
            onClick={() => paginate(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
