import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarketingDashboard from "./SUPER ADMIN/Marketing_Dashboard";
import ManagerDashboard from "./SUPER ADMIN/M_Dashboard";
import MTodayBusines from "./SUPER ADMIN/M_today_business";
import MRefferal from "./SUPER ADMIN/M_Refferal";
import MPayments from "./SUPER ADMIN/M_Payment";
import MTicketRaise from "./SUPER ADMIN/M_Ticket_Raise";
import MOrgTree from "./SUPER ADMIN/M_Catelist";
import EmployeeRegister from "./SUPER ADMIN/Employee_Register";
import EmployeeTrack from "./SUPER ADMIN/EmployeeTrack";
import IndividualCRM from "./SUPER ADMIN/E_Individual_CRM";
import EmployeeCRM from "./SUPER ADMIN/M_crm";
import Profile from "./profile/profile";
import EmployeeDelete from "./SUPER ADMIN/Employee_Delete";
import EmployeeMonitor from "./SUPER ADMIN/Employee_Monitor";
import StaffLogin from "./SUPER ADMIN/Logout";
import MBusiness from "./SUPER ADMIN/M_Business_Analysis";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {isLoggedIn ? (
        <Routes>
          <Route element={<MarketingDashboard setIsLoggedIn={setIsLoggedIn} />}>
            <Route path="/" element={<ManagerDashboard />} />
            <Route path="/Mcrm" element={<EmployeeCRM />} />
            <Route path="/Mtodaybusiness" element={<MTodayBusines />} />
            <Route path="/Mreferral" element={<MRefferal />} />
            <Route path="/Mpayment" element={<MPayments />} />
            <Route path="/Mbusiness" element={<MBusiness />} />
            <Route path="/Mticket" element={<MTicketRaise />} />
            <Route path="/Mcatelist" element={<MOrgTree />} />
            <Route path="/Memployee-register" element={<EmployeeRegister />} />
            <Route path="/Memployee-track" element={<EmployeeTrack />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/track" element={<EmployeeTrack />} />
            <Route path="/individual-crm" element={<IndividualCRM />} />
            <Route path="/Memployee-crm" element={<EmployeeCRM />} />
            <Route path="/employee-Delete" element={<EmployeeDelete />} />
            <Route path="/employee-Monitor" element={<EmployeeMonitor />} />
          </Route>
        </Routes>
      ) : (
        <StaffLogin onLogin={() => setIsLoggedIn(true)} />
      )}
    </Router>
  );
}

export default App;
