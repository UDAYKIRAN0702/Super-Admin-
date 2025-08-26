import React, { Profiler } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarketingDashboard from "./SUPER ADMIN/Marketing Dashboard";
import ManagerDashboard from "./SUPER ADMIN/M Dashboard";
import MTodayBusines from "./SUPER ADMIN/M today business";
import MRefferal from "./SUPER ADMIN/M Refferal";
import MPayments from "./SUPER ADMIN/M Payment";
import MBusiness from "./SUPER ADMIN/M Business Analysis";
import MTicketRaise from "./SUPER ADMIN/M Ticket Raise";
import MOrgTree from "./SUPER ADMIN/M Catelist";
import EmployeeRegister from "./SUPER ADMIN/Employee Register";
import EmployeeTrack from "./SUPER ADMIN/EmployeeTrack";
import IndividualCRM from "./SUPER ADMIN/E Individual CRM";
import EmployeeCRM from "./SUPER ADMIN/M crm";
import Profile from "./profile/profile";
import EmployeeDelete from "./SUPER ADMIN/Employee Delete";
import EmployeeMonitor from "./SUPER ADMIN/Employee Monitor";
import StaffLogin from "./profile/Logout";




function App() {
  return (
    <Router>
      <Routes>
       {/* Dashboard Routes */}
         
        <Route element={<MarketingDashboard/>}>
         <Route path="/" element={<ManagerDashboard/>} />
                  <Route path="/Mcrm" element={<EmployeeCRM/>} />

        <Route path="/Mtodaybusiness" element={<MTodayBusines/>} />
         <Route path="/Mreferral" element={<MRefferal/>} />
         <Route path="/Mpayment" element={<MPayments/>} />
         <Route path="/Mbusiness" element={<MBusiness/>} />
         <Route path="/Mticket" element={<MTicketRaise/>} />
         <Route path="/Mcatelist" element={<MOrgTree/>} />
         <Route path="/Memployee-register" element={<EmployeeRegister/>} />
         <Route path="/Memployee-track" element={<EmployeeTrack/>} />
        <Route path="/profile" element={<Profile/>} />
         <Route path="/track" element={<EmployeeTrack/>} />
         <Route path="/individual-crm" element={<IndividualCRM/>} />
         <Route path="/Memployee-crm" element={<EmployeeCRM/>} />
                  <Route path="/employee Delete" element={<EmployeeDelete/>} />
         <Route path="/employee Monitor" element={<EmployeeMonitor/>} />
      <Route path="/login" element={<StaffLogin/>} />


       
        </Route>
       
      </Routes>
      
    </Router>
  );
}

export default App;
