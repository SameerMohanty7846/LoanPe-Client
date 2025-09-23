import React from 'react'
import { useParams } from 'react-router-dom'

const LoanDetailsPage = () => {
    const{id}=useParams();


  return (
    <div>
      <h1>Loan Detail Page{id}</h1>
    </div>
  )
}

export default LoanDetailsPage
