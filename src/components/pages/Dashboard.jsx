import React from "react";
import {Card} from "../componentLib";
import { useNavigate } from "react-router-dom";
import FetchClient from "../../serviceClient/Fetch.Client";
import { useState, useEffect } from "react";
import LoanService from "../../services/Loan.service";

function Dashboard() {
    const navigate = useNavigate();
    const [dashboardDetails, setDashboardDetails] = useState({
        totalLoans: 0,
        activeLoans: 0,
        closedLoans: 0,
        totalDisbutedAmount: 0,
        todaysCollection: 0,
        overDueLoans: []
    });
    const loanService = new LoanService(FetchClient);
    useEffect(() => {
      const fetchLoanDetails = async () => {
        try {
          const response = await loanService.getDashboardData();
          console.log("dashboard Details response:", response);
          setDashboardDetails(response);
          console.log("dashboard Details:", dashboardDetails);
        } catch (error) {
          console.error("Error fetching loan details:", error);
        }
      };
  
      fetchLoanDetails();
    }, []);
    const paymentHeading = [
      { header: "Account Number", accessor: "accountNumber" },
      { header: "Customer Name", accessor: "name" },
      { header: "Phone", accessor: "phoneNumber" },
      { header: "Address", accessor: "address" },
      { header: "EMI Amount", accessor: "emiAmount" },
      { header: "Due Date", accessor: "nextPaymentDate" },
    ];
    const tableData = dashboardDetails.overDueLoans.map(loan=>({...loan,...loan.customer,...loan.vehicle,customer: undefined,
      vehicle: undefined}));

  const handleCardClick = (path) => {
    
    if(path==="/reportPreview")
     navigate("/reportPreview", { state: { tableHeading: "Over Due Loans" , columnHeader: paymentHeading, tableData: tableData} });
    else navigate(path);
    console.log("Card clicked!");
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card
        title="Total Loans"
        value={dashboardDetails.totalLoans}
        description="Total number of loans issued"
        onClick={() => handleCardClick("/allLoans")}
      />
      <Card
        title="Active Loans"
        value={dashboardDetails.activeLoans}
        description="Loans currently active"
        // onClick={}
      />
      <Card
        title="Closed Loans"
        value={dashboardDetails.closedLoans}
        description="Loans that have been closed"
        // onClick={}
      />
      <Card
        title="Disbuted Amount"
        value={dashboardDetails.totalDisbutedAmount}
        description="Total amount disbuted"
        // onClick={}
      />
      <Card
        title="Todays Collection"
        value={dashboardDetails.todaysCollection}
        description="Collection for today"
        // onClick={}
      />
      <Card
        title="Over Due Loans"
        value={dashboardDetails.overDueLoans.length}
        description="Loans that are overdue"
        // className="col-span-2"
        onClick={()=> handleCardClick("/reportPreview")}
      />
    </div>
  );
}

export default Dashboard;
