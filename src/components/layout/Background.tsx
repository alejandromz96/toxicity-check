import { useState, type FC, useEffect } from 'react'

const Background: FC = () => {
    const [delay3, setDelay3] = useState(false)
    const [delay6, setDelay6] = useState(false)
    const [delay9, setDelay9] = useState(false)
    const [delay12, setDelay12] = useState(false)
    useEffect(() => {
        const timer3 = setTimeout(() => {
            setDelay3(true)
        }, 3000)
        const timer6 = setTimeout(() => {
            setDelay6(true)
        }, 6000)
        const timer9 = setTimeout(() => {
            setDelay9(true)
        }, 9000)
        const timer12 = setTimeout(() => {
            setDelay12(true)
        }, 12000)

        return () => {
            clearTimeout(timer3)
            clearTimeout(timer6)
            clearTimeout(timer9)
            clearTimeout(timer12)
        }
    }, [])
    return (
        <div className="bg-gradient-to-tl from-gray-800 to-slate-950 w-full h-full fixed">
            <ul className="absolute top-0 left-0 w-full h-full overflow-hidden">
                {delay9 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-20 rounded-full left-[3%] w-36 h-36 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {true && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-20 rounded-full left-[3%] w-36 h-36 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay12 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-14 rounded-full left-[10%] w-28 h-28 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay3 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-14 rounded-full left-[10%] w-28 h-28 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay6 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-18 rounded-full left-[23%] w-40 h-40 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay12 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-18 rounded-full left-[23%] w-40 h-40 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {true && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-22 rounded-full left-[35%] w-24 h-24 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay6 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-22 rounded-full left-[35%] w-24 h-24 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay9 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-24 rounded-full left-[39%] w-20 h-20 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {true && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-24 rounded-full left-[39%] w-20 h-20 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay3 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-16 rounded-full left-[42%] w-32 h-32 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay9 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-16 rounded-full left-[42%] w-32 h-32 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay12 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-18 rounded-full left-[51%] w-28 h-28 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay3 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-18 rounded-full left-[51%] w-28 h-28 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay6 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-20 rounded-full left-[56%] w-36 h-36 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay12 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-20 rounded-full left-[56%] w-36 h-36 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay9 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-22 rounded-full left-[60%] w-24 h-24 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {true && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-22 rounded-full left-[60%] w-24 h-24 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay3 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-18 rounded-full left-[65%] w-20 h-20 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay9 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-18 rounded-full left-[65%] w-20 h-20 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay12 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-14 rounded-full left-[73%] w-44 h-44 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay3 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-14 rounded-full left-[73%] w-44 h-44 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay9 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-22 rounded-full left-[81%] w-16 h-16 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {true && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-22 rounded-full left-[81%] w-16 h-16 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {true && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-24 rounded-full left-[88%] w-28 h-28 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay6 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-24 rounded-full left-[88%] w-28 h-28 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay6 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-20 rounded-full left-[97%] w-36 h-36 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
                {delay12 && (
                    <li className="absolute block bg-fuchsia-900 bg-opacity-15 border-solid border-fuchsia-800 border-opacity-40 border-[0.01px] animate-translate-top-20 rounded-full left-[97%] w-36 h-36 origin-center hover:bg-fuchsia-800 hover:bg-opacity-20 hover:scale-110 duration-1000"></li>
                )}
            </ul>
        </div>
    )
}

export default Background
