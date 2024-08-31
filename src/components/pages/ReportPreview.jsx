import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa';
import Logo from '../Logo';

function ReportPreview() {
    const location = useLocation();
  let { tableData, tableHeading, columnHeader } = location.state || {};


  const printReport = () => {
    window.print();
  };
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="text-center mb-6">
        <Logo width='50%'/>
        <h1 className="text-3xl font-bold">Raghava Finance Service</h1>
      </div>
      <h2 className="text-xl font-semibold mb-4">{tableHeading}</h2>
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg mb-6">
        <thead className="bg-cyan-500 text-white">
          <tr>
            {columnHeader.map((item, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-small text-white uppercase tracking-wider">
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
                className={`bg-white border-b ${rowIndex % 2 === 0 ? 'bg-gray-50' : ''}`}
              >
                {columnHeader.map((item, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">
                    {row[item.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnHeader.length} className="px-6 py-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="text-center">
        <button
          onClick={printReport}
          className="px-4 py-2 bg-cyan-500 text-white rounded-lg shadow-md hover:bg-cyan-600"
        >
          Print
        </button>
      </div>
    </div>
  )
}

export default ReportPreview