import React, { useEffect, useState } from 'react'

type Props = {
    callbackOnEnd?: () => void
    refreshInterval: number
    currentTime: number
    setCurrentTime: React.Dispatch<React.SetStateAction<number>>
}
const CronoComponent = ({
    currentTime,
    setCurrentTime,
    callbackOnEnd,
    refreshInterval = 10,
}: Props): React.JSX.Element => {
    const [running, setRunning] = useState(true)

    function getTimeBox(): React.JSX.Element {
        const currentTimeDate: Date = new Date(0, 0, 0, 0, 0, 0, currentTime)

        const currentMinutesString = currentTimeDate.getMinutes().toString().padStart(2, '0')
        const currentSecondsString = currentTimeDate.getSeconds().toString().padStart(2, '0')
        const currentMillisString = currentTimeDate.getMilliseconds().toString().padStart(3, '0')

        return (
            <div
                className="flex px-2 mb-2 justify-between text-yellow-text bg-yellow-text bg-opacity-30"
                style={{ fontSize: '7vw' }}
            >
                {`${currentMinutesString} : ${currentSecondsString}`}
                <div style={{ fontSize: '4vw' }} className="ml-2">
                    {currentMillisString}
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (running) {
            setTimeout(() => {
                if (currentTime - refreshInterval <= 0) {
                    setCurrentTime(() => 0)
                    if (callbackOnEnd) {
                        callbackOnEnd()
                    }
                } else {
                    setCurrentTime((currentTime) => currentTime - refreshInterval)
                }
            }, refreshInterval)
        } else {
            setCurrentTime(() => 0)
            setRunning(false)
        }
    }, [callbackOnEnd, currentTime, refreshInterval, running, setCurrentTime])

    return <div className="w-100 h-100 px-10 py-2 m-2">{getTimeBox()}</div>
}

export default CronoComponent
