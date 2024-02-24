import { type JSX } from 'react'

import type { WizardStateType } from '~/lib/types/wizardState.type'
import { Loader } from '.'
import useWizardState from '~/hook/useWizardState'

// TODO: Use real components (to remove)
interface ComponentsProps {
    changeWizardState: () => void
}
const PresentationComponent = ({ changeWizardState }: ComponentsProps): JSX.Element => (
    <>
        <h1 className="text-2xl">PROJECT PRESENTATION</h1>
        <button
            className="mt-10 rounded-md border border-gray-400 p-1.5 hover:bg-gray-900"
            onClick={(): void => changeWizardState()}
        >
            START CHALLENGE
        </button>
    </>
)
const ChallengeComponent = ({ changeWizardState }: ComponentsProps): JSX.Element => (
    <>
        <h1 className="text-2xl">CHALLENGE</h1>
        <Loader />
        <button
            className="mt-10 rounded-md border border-gray-400 p-1.5 hover:bg-gray-900"
            onClick={(): void => changeWizardState()}
        >
            END CHALLENGE
        </button>
    </>
)
const ResultsComponent = ({ changeWizardState }: ComponentsProps): JSX.Element => (
    <>
        <h1 className="text-2xl">RESULTS</h1>
        <button
            className="mt-10 rounded-md border border-gray-400 p-1.5 hover:bg-gray-900"
            onClick={(): void => changeWizardState()}
        >
            RETURN TO PRESENTATION
        </button>
    </>
)

const stateComponents: Record<WizardStateType, ({ changeWizardState }: ComponentsProps) => JSX.Element> = {
    challenge: ChallengeComponent,
    results: ResultsComponent,
    presentation: PresentationComponent,
}

const WizardStateComponent = (): JSX.Element => {
    const { wizardState, setWizardState } = useWizardState()

    const changeWizardState = (): void => {
        switch (wizardState) {
            case 'challenge':
                return setWizardState('results')
            case 'results':
                return setWizardState('presentation')
            default:
                return setWizardState('challenge')
        }
    }

    return <div className="flex flex-col items-center">{stateComponents[wizardState]({ changeWizardState })}</div>
}

export default WizardStateComponent
