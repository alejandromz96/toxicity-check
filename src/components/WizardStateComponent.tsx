import type { JSX } from 'react'
import { useWizardState } from '~/hooks'
import type { WizardStateType } from '~/lib'
import { Loader } from '.'

// TODO: Use real components (to remove)
interface ComponentsProps {
    nextState: () => void
}
const PresentationComponent = ({ nextState }: ComponentsProps): JSX.Element => (
    <>
        <h1 className="text-2xl">PROJECT PRESENTATION</h1>
        <button
            className="mt-10 rounded-md border border-gray-400 p-1.5 hover:bg-gray-900"
            onClick={(): void => nextState()}
        >
            START CHALLENGE
        </button>
    </>
)
const ChallengeComponent = ({ nextState }: ComponentsProps): JSX.Element => (
    <>
        <h1 className="text-2xl">CHALLENGE</h1>
        <Loader />
        <button
            className="mt-10 rounded-md border border-gray-400 p-1.5 hover:bg-gray-900"
            onClick={(): void => nextState()}
        >
            END CHALLENGE
        </button>
    </>
)
const ResultsComponent = ({ nextState }: ComponentsProps): JSX.Element => (
    <>
        <h1 className="text-2xl">RESULTS</h1>
        <button
            className="mt-10 rounded-md border border-gray-400 p-1.5 hover:bg-gray-900"
            onClick={(): void => nextState()}
        >
            RETURN TO PRESENTATION
        </button>
    </>
)

const stateComponents: Record<WizardStateType, ({ nextState }: ComponentsProps) => JSX.Element> = {
    challenge: ChallengeComponent,
    results: ResultsComponent,
    presentation: PresentationComponent,
}

const WizardStateComponent = (): JSX.Element => {
    const { wizardState, nextState } = useWizardState()

    return <div className="flex flex-col items-center">{stateComponents[wizardState]({ nextState })}</div>
}

export default WizardStateComponent
