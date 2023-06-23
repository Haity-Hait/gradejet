import React, { useContext, useEffect } from 'react'
import MainLayouts from '../../layouts/Super Admin Layouts/MainLayouts'
import { Construction } from '../../assets/Images'
import "./Construction.css"
import { Testing } from '../../App'
const UnderConstructionSuperAdmin = () => {
  const Ded = useContext(Testing)
  useEffect(() => {
    console.log(Ded);
  })
  return (
    <MainLayouts>
        <img className='bhe' src={Construction} alt="" />
    </MainLayouts>
  )
}

export default UnderConstructionSuperAdmin