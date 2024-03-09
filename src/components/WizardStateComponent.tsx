import { createElement, type JSX } from 'react'
import { useWizardState } from '~/hooks'
import type { WizardStateType } from '~/lib'
import ChallengeComponent from './ChallengeComponent'
import { PresentationComponent } from '.'

// TODO: Use real components (to remove)
export interface ComponentsProps {
    nextState: () => void
}

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

    const body = createElement(stateComponents[wizardState], { nextState })

    return <div className="flex flex-col items-center justify-center h-full">{body}</div>
}

export default WizardStateComponent
