import React from 'react'
import MainLayouts from '../../layouts/Super Admin Layouts/MainLayouts'
import { Construction } from '../../assets/Images'
import "./Construction.css"
const UnderConstructionSuperAdmin = () => {
  return (
    <MainLayouts>
        <img className='bhe' src={Construction} alt="" />
    </MainLayouts>
  )
}

export default UnderConstructionSuperAdmin