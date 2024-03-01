import { useEffect, type JSX, useState } from 'react'

const Test = (): JSX.Element => {
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 3000)
        return () => clearTimeout(timer)
    }, [])
    return (
        <div className="bg-gradient-to-l from-indigo-500 to-violet-600 w-full h-screen absolute -z-10">
            <ul className="absolute top-0 left-0 w-full h-[96%] overflow-hidden">
                <li className="absolute block list-none bg-white bg-opacity-20 animate-translate-top rounded-full left-1/4 w-20 h-20"></li>
                <li className="absolute block list-none bg-white bg-opacity-20 animate-translate-top rounded-full left-[10%] w-5 h-5"></li>
                <li className="absolute block list-none bg-white bg-opacity-20 animate-translate-top rounded-full left-[70%] w-5 h-5"></li>
                <li className="absolute block list-none bg-white bg-opacity-20 animate-translate-top rounded-full left-[40%] w-14 h-14"></li>
                <li className="absolute block list-none bg-white bg-opacity-20 animate-translate-top rounded-full left-[65%] w-5 h-5"></li>
                {isVisible && (
                    <li className="absolute block list-none bg-white bg-opacity-20 animate-translate-top rounded-full left-3/4 w-28 h-28"></li>
                )}
                <li className="absolute block list-none bg-white bg-opacity-20 animate-translate-top rounded-full left-[35%] w-36 h-36"></li>
                <li className="absolute block list-none bg-white bg-opacity-20 animate-translate-top rounded-full w-5 h-5 "></li>
                <li className="absolute block list-none bg-white bg-opacity-20 animate-translate-top rounded-full w-5 h-5 "></li>
                <li className="absolute block list-none bg-white bg-opacity-20 animate-translate-top rounded-full w-5 h-5 "></li>
            </ul>
        </div>
    )
}

export default Test
