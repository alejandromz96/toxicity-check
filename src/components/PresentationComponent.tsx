import { ComponentsProps } from "./WizardStateComponent";

const PresentationComponent = ({ nextState }: ComponentsProps): JSX.Element => {
    return (
    <section className="flex flex-col justify-between items-center w-full h-full space-y-4">
        <div className="flex flex-col items-center space-y-2 text-center text-yellow-text">
            <span className="text-xl md:text-4xl">Do you want to check your <u className="decoration-purple-soft">toxicity</u> level?</span>
            <span className="text-md md:text-xl">Start the <u className="decoration-purple-soft">Toxicity Check</u> to check it out!</span>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-x-2">
            <div className="flex flex-col space-y-4 w-full md:w-1/3 justify-center items-center">
                <span className="text-bold text-2xl text-center">1</span>
                <div className="border-2 border-solid border-purple-soft rounded-lg w-full md:w-4/5 py-12 bg-slate-900 items-center justify-center text-center p-4 h-full">
                        Think as toxic as you can
                </div>
            </div>
            <div className="flex flex-col space-y-4 w-full md:w-1/3 justify-center items-center">
                <span className="text-bold text-2xl text-center">2</span>
                <div className="border-2 border-solid border-purple-soft rounded-lg w-full md:w-4/5 py-12 bg-slate-900 items-center justify-center text-center p-4 h-full">
                    The more toxic you are, the more points and time you will get.
                </div>
            </div>
            <div className="flex flex-col space-y-4 w-full md:w-1/3 justify-center items-center">
                <span className="text-bold text-2xl text-center">3</span>
                <div className="border-2 border-solid border-purple-soft rounded-lg w-full md:w-4/5 py-12 bg-slate-900 items-center justify-center text-center p-4 h-full">
                    When you are ready, start the challenge
                </div>
            </div>
        </div>
        <button
            className="rounded-lg py-4 px-6 transition ease-in-out delay-150 bg-purple-dark  hover:scale-125 hover:bg-purple-soft duration-300"
            onClick={(): void => nextState()}
        >
            START CHALLENGE
        </button>
    </section>
)}

export default PresentationComponent