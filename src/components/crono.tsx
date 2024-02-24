import React, { type Dispatch, useEffect, useState } from 'react'

type Props = {
    currentTime: number // duration in milis ( less than 24 hours )
    setCurrentTime: Dispatch<React.SetStateAction<number>>
    callbackOnEnd?: () => void
    refreshInterval?: number
}

export default function Crono({
    currentTime,
    setCurrentTime,
    callbackOnEnd,
    refreshInterval = 10,
}: Props): React.JSX.Element {
    const [running, setRunning] = useState(true)

    function getTimeBox(): React.JSX.Element {
        const currentTimeDate: Date = new Date(0, 0, 0, 0, 0, 0, currentTime)

        const currentMinutesString = currentTimeDate.getMinutes().toString().padStart(2, '0')
        const currentSecondsString = currentTimeDate.getSeconds().toString().padStart(2, '0')
        const currentMillisString = currentTimeDate.getMilliseconds().toString().padStart(3, '0')

        return (
            <div>
                <div className="flex mb-2 justify-between" style={{ fontSize: '4vw' }}>
                    {`${currentMinutesString} : ${currentSecondsString}`}
                    <div style={{ fontSize: '2.5vw' }} className="ml-2">
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
                    setCurrentTime((currentTime) => currentTime - refreshInterval)
                }
            }, refreshInterval)
        } else {
            setCurrentTime(0)
            setRunning(false)
        }
    }, [callbackOnEnd, currentTime, setCurrentTime, refreshInterval, running])

    return <div className="w-100 h-100 px-10 py-2 m-2">{getTimeBox()}</div>
}
