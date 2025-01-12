import React, { useState } from "react";
import Select from "react-select";

const Table = ({ evData }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleRowsPerPageChange = (e) => {
    const value = e.target.value;
    setRowsPerPage(value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setPage(0);
  };

  const filteredData = evData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery)
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const columns = evData.length > 0 ? Object.keys(evData[0]) : [];

  const handleColumnSelection = (selectedOptions) => {
    setSelectedColumns(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const columnOptions = columns.map((col) => ({
    value: col,
    label: col.replace(/_/g, " ").toUpperCase(),
  }));

  const handleSort = (col) => {
    let direction = "asc";
    if (sortConfig.key === col && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: col, direction });
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-xl">
      <div className="row mb-4">
        <div className="col-md-4 d-flex align-items-center">
          <label className="me-2 text-muted">Search:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="form-control"
          />
        </div>

        <div className="col-md-4 d-flex align-items-center">
          <label className="me-2 text-muted">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="form-select"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>

        <div className="col-md-4 d-flex align-items-center">
          <label className="me-2 text-muted">Select Columns:</label>
          <div className="flex-grow-1">
            <Select
              isMulti
              options={columnOptions}
              value={columnOptions.filter((option) =>
                selectedColumns.includes(option.value)
              )}
              onChange={handleColumnSelection}
              className="w-100"
              closeMenuOnSelect={false}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-indigo-100">
            <tr>
              {(selectedColumns.length > 0 ? selectedColumns : columns).map(
                (col) => (
                  <th
                    key={col}
                    className="border border-gray-300 px-4 py-3 text-indigo-600 font-semibold text-center cursor-pointer"
                    onClick={() => handleSort(col)}
                    title={col.replace(/_/g, " ").toUpperCase()}
                    style={{ width: `${Math.max(col.length * 10, 100)}px` }}
                  >
                    {col.replace(/_/g, " ").toUpperCase().substring(0, 15)}
                    {col.length > 15 && "..."}
                    {sortConfig.key === col && (
                      <span className="ml-1 text-sm">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  {(selectedColumns.length > 0 ? selectedColumns : columns).map(
                    (col) => (
                      <td
                        key={col}
                        className="border border-gray-300 px-4 py-3 text-gray-700"
                        title={String(item[col])}
                        style={{ width: `${Math.max(col.length * 10, 100)}px` }}
                      >
                        {String(item[col]).substring(0, 15)}
                        {String(item[col]).length > 15 && "..."}
                      </td>
                    )
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={selectedColumns.length || columns.length}
                  className="border border-gray-300 px-4 py-3 text-center text-gray-500"
                >
                  No matching data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          className="p-2 bg-indigo-500 text-black rounded-lg hover:bg-indigo-600 disabled:opacity-50"
          onClick={(e) => handleChangePage(e, page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {Math.ceil(filteredData.length / rowsPerPage)}
        </span>
        <button
          className="p-2 bg-indigo-500 text-black rounded-lg hover:bg-indigo-600 disabled:opacity-50"
          onClick={(e) => handleChangePage(e, page + 1)}
          disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Table;
