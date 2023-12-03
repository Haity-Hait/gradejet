import { useState } from 'react'
import { LukyAnimatedNavbar } from './Fetched.tsx';
import { ILukMenuItme } from '../../../../types';
import React from 'react';

function Check() {

    const [menus, setMenus] = useState<Array<ILukMenuItme>>([
        {
            onClick: (item: ILukMenuItme) => {
                console.log("Clicked on:", item)
            },
            tooltip: (
                <>
                    <div className="grid grid-cols-3 gap-2">
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                    </div>
                    <p className='text-gray-400 font-bold my-2'>The Home Screen</p>
                    <p className='text-xs text-gray-500 space-y-2'>A Cool Menu button</p>
                </>
            ),
            index: 0,
            label: 'Home',
            link: '#',
            icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>)
        },
        {
            index: 1,
            tooltip: (
                <>
                    <div className="grid grid-cols-3 gap-2">
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                    </div>
                    <p className='text-gray-400 font-bold my-2'>My Dashboard</p>
                    <p className='text-xs text-gray-500 space-y-2'>User tooltips to explain your menus</p>
                </>
            ),
            label: 'Dashboard',
            link: '#',
            icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
            </svg>
            )
        },
        {
            index: 2,
            tooltip: (
                <>
                    <div className="grid grid-cols-3 gap-2">
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                    </div>
                    <p className='text-gray-400 font-bold my-2'>My Dashboard</p>
                    <p className='text-xs text-gray-500 space-y-2'>User tooltips to explain your menus</p>
                </>
            ),
            label: 'User',
            link: '#',
            icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>

            )
        },
        {
            index: 3,
            tooltip: (
                <>
                    <div className="grid grid-cols-3 gap-2">
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                    </div>
                    <p className='text-gray-400 font-bold my-2'>My Dashboard</p>
                    <p className='text-xs text-gray-500 space-y-2'>User tooltips to explain your menus</p>
                </>
            ),
            label: 'Messages',
            link: '#',
            icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>

            )
        },
        {

            index: 4,
            tooltip: (
                <>
                    <div className="grid grid-cols-3 gap-2">
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                        <div className='h-10 bg-gray-700 rounded-md'></div>
                    </div>
                    <p className='text-gray-400 font-bold my-2'>My Dashboard</p>
                    <p className='text-xs text-gray-500 space-y-2'>User tooltips to explain your menus</p>
                </>
            ),
            label: 'Like',
            link: '#',
            icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>


            )
        },
    ]);







    return (
        <div className="  ">
            <div>
                <LukyAnimatedNavbar
                    menus={menus}
                    leading={<div className='icon w-full h-10 rounded-lg bg-blue-500 text-white'>A</div>}
                ></LukyAnimatedNavbar>
            </div>

        </div>
    )
}

export default Check
