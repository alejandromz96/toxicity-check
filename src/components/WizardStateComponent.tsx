import { createElement, type JSX } from 'react'
import { useWizardState } from '~/hooks'
import { ChallengeComponent, ResultsComponent } from '~/components'
import type { ComponentsProps, WizardStateType } from '~/lib'

const WizardStateComponent = (): JSX.Element => {
    const { wizardState, nextState } = useWizardState()
    const body = createElement(stateComponents[wizardState], { nextState })
    return <div className="flex flex-col items-center">{body}</div>
}

// TODO: Use real components (to remove)
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

const stateComponents: Record<WizardStateType, ({ nextState }: ComponentsProps) => JSX.Element> = {
    challenge: ChallengeComponent,
    results: ResultsComponent,
    presentation: PresentationComponent,
}

export default WizardStateComponent
