import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick = {() => navigate(-1)} className = "flex flex-col items-center justify-center fixed bottom-0 right-0">
        <ArrowLeft size = {50}/>
        Return to previous screen
    </button>
  )
}

export default BackButton