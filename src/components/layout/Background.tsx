import { useState, type FC, useEffect, type JSX } from 'react'

const DELAYS_TIMEOUTS: number[] = [0, 3000, 6000, 9000, 12000]
const BUBBLES: number[] = [3, 0, 4, 1, 2, 4, 0, 2, 3, 0, 1, 3, 4, 1, 2, 4, 3, 0, 1, 3, 4, 1, 3, 0, 0, 2, 2, 4]
const BUBBLES_POSITIONS: number[] = [
    3, 3, 10, 10, 23, 23, 35, 35, 39, 39, 42, 42, 51, 51, 56, 56, 60, 60, 65, 65, 73, 73, 81, 81, 88, 97, 97,
]
const BUBBLES_ANIMATE_TRANSLATE: number[] = [
    20, 20, 14, 14, 18, 18, 22, 22, 24, 24, 16, 16, 18, 18, 20, 20, 22, 22, 18, 18, 14, 14, 22, 22, 24, 24, 20, 20,
]
const BUBBLE_SIZE: number[] = [
    36, 36, 28, 28, 40, 40, 24, 24, 20, 20, 32, 32, 28, 28, 36, 36, 24, 24, 20, 20, 44, 44, 16, 16, 28, 28, 36, 36,
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

    const getBubble = (delayIndex: number, bubbleIndex: number): JSX.Element | undefined =>
        delays[delayIndex] ? (
            <li
                key={bubbleIndex}
                className={`absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-${BUBBLES_ANIMATE_TRANSLATE[bubbleIndex]} rounded-full left-[${BUBBLES_POSITIONS[bubbleIndex]}%] w-${BUBBLE_SIZE[bubbleIndex]} h-${BUBBLE_SIZE[bubbleIndex]}`}
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
