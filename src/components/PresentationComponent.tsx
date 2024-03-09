import { ComponentsProps } from "./WizardStateComponent";

const PresentationComponent = ({ nextState }: ComponentsProps): JSX.Element => {
    return (
    <section className="flex flex-col space-y-8 items-center">
        <h1 className="text-2xl border-b-4 border-dashed border-purple-700">PROJECT PRESENTATION</h1>
        <div className="border-2 border-solid border-yellow-300 rounded-lg p-4 flex flex-col space-y-4 justify-center items-center">
            <span>Do you want to check your toxicity level?</span>
            <span>Start the Toxicity Check to check it out!</span>
            <button
                className="rounded-md border border-gray-400 hover:bg-gray-900 p-2"
                onClick={(): void => nextState()}
            >
                START CHALLENGE
            </button>
        </div>
    </section>
)}

export default PresentationComponent