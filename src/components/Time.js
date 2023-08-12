import React, { useEffect, useState } from 'react'

const Time = ({STYLE}) => {
    const [currentTime, setCurrentTime] = useState()
    const count = () => {
        let time = new Date().toLocaleTimeString()
        setCurrentTime(time)
    }
    setInterval(count, 0);
    return (
        <div>
            <h1 className={STYLE}>{currentTime}</h1>
        </div>
    )
}

export default Time