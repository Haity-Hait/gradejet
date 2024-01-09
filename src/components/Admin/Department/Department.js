import React from 'react'
import MainAdminLay from '../../../layouts/AdminLayouts/MainAdminLay'
import Time from '../../Time'

const Department = () => {
    return (
        <MainAdminLay>
            <div className=" px-5 py-2 ">
                <div className="waist px-3">
                    <h3 className="bop">Departments</h3>
                    <div className="e">
                        <Time STYLE="meo" />
                    </div>
                </div>

            </div>
        </MainAdminLay>
    )
}

export default Department