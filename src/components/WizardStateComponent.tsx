import { createElement, type JSX } from 'react'
import { useWizardState } from '~/hooks'
import type { WizardStateType } from '~/lib'
import ChallengeComponent from './ChallengeComponent'
import { PresentationComponent } from '.'
import styles from '../styles/Wizard.module.css'

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

    enum WizardTitle {
        'presentation' = 'PROJECT PRESENTATION',
        'challenge' = 'CHALLENGE',
        'results' = 'RESULTS',
    }

    const body = createElement(stateComponents[wizardState], { nextState })

    return (
        <div className='h-3/4 flex flex-col items-center pt-8'>
            <h1 className={styles.title}>{WizardTitle[wizardState]}</h1>
            <div className={styles.box}>
                {body}
            </div>
        </div>
    )
}

export default WizardStateComponent
