import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

import {
  Column,
  TableOptions,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

function TableHOC<T extends object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      pageCount,
      state: { pageIndex },
      page,
    } = useTable(options, useSortBy, usePagination);

    return (
      <div className={containerClassname}>
        <h2 className="heading">{heading}</h2>
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...restHeaderGroupProps}>
                  {headerGroup.headers.map((column) => {
                    const { key: columnKey, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps());
                    return (
                      <th key={columnKey} {...restColumnProps}>
                        {column.render("Header")}
                        {column.isSorted && (
                          <span>
                            {column.isSortedDesc ? <AiOutlineSortDescending /> : <AiOutlineSortAscending />}
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <tr key={key} {...restRowProps}>
                  {row.cells.map((cell) => {
                    const { key: cellKey, ...restCellProps } = cell.getCellProps();
                    return (
                      <td key={cellKey} {...restCellProps}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>


        </table>
        {pageCount > 1 ? (
          <div className="table-pagination">
            <button disabled={!canPreviousPage} onClick={previousPage}>
              ← Prev
            </button>
            <span>{`${pageIndex + 1} of ${pageCount}`}</span>
            <button disabled={!canNextPage} onClick={nextPage}>
              Next →
            </button>
          </div>
        ) : null}
      </div>
    );
  };
}

export default TableHOC;
