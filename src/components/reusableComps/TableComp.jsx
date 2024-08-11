import React from 'react'

function TableComp({tableHeading = 'Table Heading', ColumnHeader = [] , tableData = [], onRowClick}) {
  return (
    <div className="w-full">
    <h1 className="text-xl font-semibold mb-4">{tableHeading}</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead className="bg-cyan-500 text-white">
          <tr>
            {ColumnHeader.map((item, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs
                 font-small text-white uppercase tracking-wider"
              >
                {item.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`bg-white border-b ${
                  rowIndex % 2 === 0 ? 'bg-gray-50' : ''
                } transition duration-200 ease-in-out hover:bg-cyan-50  cursor-pointer`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {ColumnHeader.map((item, index) => (
                  <td
                    key={index}
                    className="px-6 py-4 whitespace-nowrap text-xs text-gray-900"
                  >
                    {row[item.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={ColumnHeader.length}
                className="px-6 py-4 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default TableComp