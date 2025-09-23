import React from 'react'
import { useParams } from 'react-router-dom'

const LoanApplicationPage = () => {
    const{id}=useParams()

  return (
    <div>
    <h1>Loan Application For {id}</h1>  
    </div>
  )
}

export default LoanApplicationPage
