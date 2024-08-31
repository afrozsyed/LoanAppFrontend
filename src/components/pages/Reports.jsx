import React, { useState } from 'react';
import { TableComp } from '../componentLib'; // Import your reusable table component
import { useNavigate } from 'react-router-dom';

function ReportsPage() {
  const [tableData, setTableData] = useState([]);
  const [tableHeading, setTableHeading] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const ColumnHeader = [
    { header: 'Column 1', accessor: 'col1' }, // Customize based on your API response
    { header: 'Column 2', accessor: 'col2' }, 
    { header: 'Column 3', accessor: 'col3' },
    // Add more columns as needed
  ];

  const handleButtonClick = async (type) => {
    setLoading(true);
    let apiUrl = '';

    switch (type) {
      case 'todaysPayments':
        apiUrl = '/api/todays-payments'; // Replace with your API endpoint
        setTableHeading("Today's Payments");
        break;
      case 'thisMonthsPayments':
        apiUrl = '/api/this-months-payments'; // Replace with your API endpoint
        setTableHeading("This Month's Payments");
        break;
      case 'outstandingLoans':
        apiUrl = '/api/outstanding-loans'; // Replace with your API endpoint
        setTableHeading('Outstanding Loans');
        break;
      // Add more cases for other reports
      default:
        return;
    }

    try {
    //   const response = await axios.get(apiUrl);
    
     // setTableData(response.data); // Assuming the response data matches your table's structure
    } catch (error) {
      console.error('Error fetching data:', error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintPreview = () => {
    navigate('/reportPreview', { state: { tableData, tableHeading, columnHeader } });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Reports</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={() => handleButtonClick('todaysPayments')}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded"
        >
          Today's Payments
        </button>
        <button
          onClick={() => handleButtonClick('thisMonthsPayments')}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded"
        >
          This Month's Payments
        </button>
        <button
          onClick={() => handleButtonClick('outstandingLoans')}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded"
        >
          Outstanding Loans
        </button>
        {/* Add more buttons here as needed */}
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
        <TableComp
          tableHeading={tableHeading}
          ColumnHeader={ColumnHeader}
          tableData={tableData}
          onRowClick={(row) => console.log(row)} // Handle row click if needed
        />
        <div className="mt-6 text-right">
        <button
          onClick={handlePrintPreview}
          className="px-4 py-2 bg-cyan-500 text-white rounded-lg shadow-md hover:bg-cyan-600"
        >
          Print Preview
        </button>
      </div>
      </>
      )}
    </div>
  );
}

export default ReportsPage;
