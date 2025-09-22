import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/routes/PrivateRoute'
import MainLayout from './components/layout/MainLayout'
import UserDashboard from './components/pages/UserDashboard'
import ViewLoans from './components/pages/ViewLoans'
import LoanHistory from './components/pages/LoanHistory'
import EmiCalculator from './components/pages/EmiCalculator'
import Offers from './components/pages/Offers'
import AdminDashboard from './components/pages/AdminDashboard'
import ViewAndUpdateLoans from './components/pages/ViewAndUpdateLoans'
import ViewLoanApplications from './components/pages/ViewLoanApplications'
import ManageOffers from './components/pages/ManageOffers'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'
import AuthLayout from './components/layout/AuthLayout'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* User Routes  */}
        {/* <Route element={<PrivateRoute role={'user'} children={<MainLayout />} ></PrivateRoute>}>
          <Route path='/user/userdashboard' element={<UserDashboard />} />
          <Route path='/user/loans' element={<ViewLoans />} />
          <Route path='/user/loanhistory' element={<LoanHistory />} />
          <Route path='/user/emicalculator' element={<EmiCalculator />} />
          <Route path='/user/offers' element={<Offers />} />


        </Route> */}

        {/* Admin Routes  */}
        {/* <Route element={<PrivateRoute role={'admin'} children={<MainLayout />} ></PrivateRoute>}>
          <Route path='/admin/admindashboard' element={<AdminDashboard />} />
          <Route path='/admin/view-and-update-loans' element={<ViewAndUpdateLoans />} />
          <Route path='/admin/view-loan-applications' element={<ViewLoanApplications />} />
          <Route path='/admin/manage-offers' element={<ManageOffers />} />


        </Route> */}

        {/* <Route element={<AuthLayout />}>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

        </Route> */}
      
          {/* User Routes */}
          <Route element={<PrivateRoute role="user" />}>
            <Route element={<MainLayout />}>
              <Route path="/user/userdashboard" element={<UserDashboard />} />
              <Route path="/user/loans" element={<ViewLoans />} />
              <Route path="/user/loanhistory" element={<LoanHistory />} />
              <Route path="/user/emicalculator" element={<EmiCalculator />} />
              <Route path="/user/offers" element={<Offers />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<PrivateRoute role="admin" />}>
            <Route element={<MainLayout />}>
              <Route path="/admin/admindashboard" element={<AdminDashboard />} />
              <Route path="/admin/view-and-update-loans" element={<ViewAndUpdateLoans />} />
              <Route path="/admin/view-loan-applications" element={<ViewLoanApplications />} />
              <Route path="/admin/manage-offers" element={<ManageOffers />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        









      </Routes>
    </BrowserRouter>
  )
}

export default App