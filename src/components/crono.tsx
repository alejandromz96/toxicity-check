import React, { useEffect, useState } from 'react'

type Props = {
    duration: number // duration in milis ( less than 24 hours )
    callbackOnEnd?: () => void
    refreshInterval: number
}

const Crono =({ duration, callbackOnEnd, refreshInterval = 10 }: Props): React.JSX.Element => {
    const [running, setRunning] = useState(true)
    const [currentTime, setCurrentTime] = useState(duration)

    function getTimeBox(): React.JSX.Element {
        const currentTimeDate: Date = new Date(0, 0, 0, 0, 0, 0, currentTime)

        const currentMinutesString = currentTimeDate.getMinutes().toString().padStart(2, '0')
        const currentSecondsString = currentTimeDate.getSeconds().toString().padStart(2, '0')
        const currentMillisString = currentTimeDate.getMilliseconds().toString().padStart(3, '0')

        return (
            <div>
                <div className="flex mb-2 justify-between" style={{ fontSize: '10vw' }}>
                    {`${currentMinutesString} : ${currentSecondsString}`}
                    <div style={{ fontSize: '5vw' }} className="ml-2">
                        {currentMillisString}
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (running) {
            setTimeout(() => {
                if (currentTime - refreshInterval <= 0) {
                    setCurrentTime(0)
                    if (callbackOnEnd) {
                        callbackOnEnd()
                    }
                } else {
                    setCurrentTime(currentTime - refreshInterval)
                }
            }, refreshInterval)
        } else {
            setCurrentTime(0)
            setRunning(false)
        }
    }, [callbackOnEnd, currentTime, duration, refreshInterval, running])

    return <div className="w-100 h-100 px-10 py-2 m-2">{getTimeBox()}</div>
}

export default Crono
