import type { JSX } from 'react'

import type { ComponentsProps } from '~/lib'

const RULES: string[] = [
    'Think as toxic as you can',
    'The more toxic you are, the more points and time you will get.',
    'When you are ready, start the challenge',
]

const PresentationComponent = ({ nextState }: ComponentsProps): JSX.Element => (
    <section className="flex flex-col justify-between items-center w-full h-full space-y-2 md:space-y-4">
        <div className="flex flex-col items-center md:space-y-2 text-center text-yellow-text">
            <span className="text-xl md:text-4xl">
                Do you want to check your <u className="decoration-purple-soft">toxicity</u> level?
            </span>
            <span className="text-md md:text-xl">
                Start the <u className="decoration-purple-soft">Toxicity Check</u> to check it out!
            </span>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0">
            {RULES.map((rule, index) => (
                <div
                    className="flex flex-col space-y-2 w-full md:w-1/3 justify-center items-center text-yellow-text"
                    key={'rule ' + index}
                >
                    <span className="hidden md:flex text-bold text-2xl text-center">{index + 1}</span>
                    <div className="border-2 border-solid border-purple-soft rounded-lg w-full md:w-4/5 py-2 px-1 md:px-4 md:py-8 bg-slate-900 flex items-center justify-center text-center h-full">
                        {rule}
                    </div>
                </div>
            ))}
        </div>
        <button
            className="rounded-lg py-1 md:py-4 px-2 md:px-6 transition ease-in-out delay-150 bg-purple-dark  hover:scale-125 hover:bg-purple-soft duration-300"
            onClick={(): void => nextState()}
        >
            START CHALLENGE
        </button>
    </section>
)

export default PresentationComponent
