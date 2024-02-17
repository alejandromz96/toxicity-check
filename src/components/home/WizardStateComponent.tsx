import { useState, type JSX } from 'react'

import type { WizardStateType } from '~/models/home'

// TODO: Use real components (to remove)
interface ComponentsProps {
    onClick: (state: WizardStateType) => void
}
const PresentationComponent = ({ onClick }: ComponentsProps): JSX.Element => (
    <>
        <h1 className="text-2xl">PROJECT PRESENTATION</h1>
        <button
            className="mt-10 rounded-md border border-gray-400 p-1.5 hover:bg-gray-900"
            onClick={(): void => onClick('challenge')}
        >
            START CHALLENGE
        </button>
    </>
)
const ChallengeComponent = ({ onClick }: ComponentsProps): JSX.Element => (
    <>
        <h1 className="text-2xl">CHALLENGE</h1>
        <button
            className="mt-10 rounded-md border border-gray-400 p-1.5 hover:bg-gray-900"
            onClick={(): void => onClick('results')}
        >
            END CHALLENGE
        </button>
    </>
)
const ResultsComponent = ({ onClick }: ComponentsProps): JSX.Element => (
    <>
        <h1 className="text-2xl">RESULTS</h1>
        <button
            className="mt-10 rounded-md border border-gray-400 p-1.5 hover:bg-gray-900"
            onClick={(): void => onClick('presentation')}
        >
            RETURN TO PRESENTATION
        </button>
    </>
)

const WizardStateComponent = (): JSX.Element => {
    const [currentState, setWizardState] = useState<WizardStateType>('presentation')

    const renderBody = (): JSX.Element => {
        switch (currentState) {
            case 'challenge':
                return <ChallengeComponent onClick={setWizardState} />
            case 'results':
                return <ResultsComponent onClick={setWizardState} />
            default:
                return <PresentationComponent onClick={setWizardState} />
        }
    }

    return <div className="flex flex-col items-center">{renderBody()}</div>
}

export default WizardStateComponent
