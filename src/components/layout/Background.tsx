import { useState, type FC, useEffect, type JSX } from 'react'
import { twMerge } from 'tailwind-merge'

const DELAYS_TIMEOUTS = [0, 3000, 6000, 9000, 12000]
const BUBBLES = [3, 0, 4, 1, 2, 4, 0, 2, 3, 0, 1, 3, 4, 1, 2, 4, 3, 0, 1, 3, 4, 1, 3, 0, 0, 2, 2, 4]
const BUBBLES_ANIMATE_TRANSLATE = [
    'animate-translate-top-20 left-[3%] w-36 h-36',
    'animate-translate-top-14 left-[10%] w-28 h-28',
    'animate-translate-top-18 left-[23%] w-40 h-40',
    'animate-translate-top-22 left-[35%] w-24 h-24',
    'animate-translate-top-24 left-[39%] w-20 h-20',
    'animate-translate-top-16 left-[42%] w-32 h-32',
    'animate-translate-top-18 left-[51%] w-28 h-28',
    'animate-translate-top-20 left-[56%] w-36 h-36',
    'animate-translate-top-22 left-[60%] w-24 h-24',
    'animate-translate-top-18 left-[65%] w-20 h-20',
    'animate-translate-top-14 left-[73%] w-44 h-44',
    'animate-translate-top-22 left-[81%] w-16 h-16',
    'animate-translate-top-24 left-[88%] w-28 h-28',
    'animate-translate-top-20 left-[97%] w-36 h-36',
]

const Background: FC = () => {
    const [delays, setDelays] = useState([true, false, false, false, false])
    useEffect(() => {
        const timers = DELAYS_TIMEOUTS.map((delay, index) =>
            setTimeout(() => {
                setDelays((currentDelays) => {
                    const newDelays = [...currentDelays]
                    newDelays[index] = true
                    return newDelays
                })
            }, delay)
        )
        return () => {
            timers.forEach((timer) => clearTimeout(timer))
        }
    }, [])

    const getBubble = (delayIndex: number, index: number): JSX.Element | undefined =>
        delays[delayIndex] ? (
            <li
                key={index}
                className={twMerge(
                    'absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] rounded-full',
                    BUBBLES_ANIMATE_TRANSLATE[Math.floor(index / 2)]
                )}
            />
        ) : undefined

    return (
        <div className="bg-gradient-to-tl from-gray-800 to-slate-950 w-full h-full fixed">
            <ul className="absolute top-0 left-0 w-full h-full">
                {BUBBLES.map((bubbleDelay, index) => getBubble(bubbleDelay, index))}
            </ul>
        </div>
    )
}

export default Background
