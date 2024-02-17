import { useState, type JSX } from 'react'

import type { WizardStateType } from '~/lib/types/wizardState.type'

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
    const [currentWizardState, setCurrentWizardState] = useState<WizardStateType>('presentation')

    const changeWizardState = (): void => {
        switch (currentWizardState) {
            case 'challenge':
                return setCurrentWizardState('results')
            case 'results':
                return setCurrentWizardState('presentation')
            default:
                return setCurrentWizardState('challenge')
        }
    }

    return (
        <div className="flex flex-col items-center">{stateComponents[currentWizardState]({ changeWizardState })}</div>
    )
}

export default WizardStateComponent
