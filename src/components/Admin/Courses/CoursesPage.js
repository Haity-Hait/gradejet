import React, { useEffect, useState } from 'react'
import VerifyToken from '../../VerifyToken'
import axios from 'axios'
import { LuDelete } from 'react-icons/lu'
import { MdDelete } from 'react-icons/md'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import "./courses.css"
const CoursesPage = () => {
    const [courses, setCourses] = useState([])
    const { verifyData } = VerifyToken()
    const adminEmail = verifyData.email
    let data = { adminEmail }

    useEffect(() => {
        axios.post("http://localhost:1516/get/each/courses", data).then((res) => {
            let data2 = res.data.message
            setCourses(data2)
            console.log(courses);
        }).catch((err) => {
            console.log(err);
        })
    })
    const ded = (id) => {
        console.log(id);
        axios.delete(`http://localhost:1516/delete/course/${id}`).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="bg-white border-b">
                                    <tr>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            #
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Course Name
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Course Type
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!courses ? <h1>No Data</h1> :
                                        courses.map((item, index) => (
                                            <tr class="bg-white hover:bg-gray-100 cursor-pointer border-b">
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {index + 1}
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.courseName}
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.courseType}
                                                </td>
                                                <td class="text-sm flex gap-3 text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <button onClick={() => ded(item._id)}><TrashIcon className='popt ' /></button>
                                                    <button><PencilIcon className='popt' /></button>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoursesPage