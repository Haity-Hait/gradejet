import React from 'react'
import MainAdminLay from '../../../../layouts/AdminLayouts/MainAdminLay'
import Time from '../../../Time'
import VerifyToken from '../../../VerifyToken'
import '../dashboard.css'
const ShowTeachers = () => {
    const { verifyData, expired, teachers, students, courses } = VerifyToken()
    console.log(teachers);

    return (
        <MainAdminLay>
            <div className="joj">
                <div className="waist px-3">
                    <h3 className="bop">All Teachers</h3>
                    <div className="e">
                        <h3 className="bop">Total: {teachers.length}</h3>

                    </div>
                    <div className="e">
                        <Time STYLE="meo" />
                    </div>
                </div>






                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-gray-800">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" class="px-6 py-3">
                                Teacher name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Date Of Birth
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Gender
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Course
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((teacher, index) => (

                                <tr class="bg-white text-black border-b dark:bg-white dark:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-100">
                                    <td class="px-6 py-4">
                                        <img className="ji" src={teacher.image} />
                                    </td>
                                    <td class="px-6 capitalize py-4">
                                        {teacher.initial}
                                    </td>
                                    <th scope="row" class="px-6 py-4 font-medium capitalize text-black whitespace-nowrap dark:text-black">
                                        {teacher.name}
                                    </th>
                                    <td class="px-6  py-4">
                                        {teacher.email}
                                    </td>
                                    <td class="px-6 capitalize py-4">
                                        {teacher.dob}
                                    </td>

                                    <td class="px-6 capitalize py-4">
                                        {teacher.course}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </MainAdminLay>
    )
}

export default ShowTeachers