import { createElement, type JSX } from 'react'
import { useWizardState } from '~/hooks'
import { X_URL_TO_SHARE_SCORE, type ComponentsProps, type WizardStateType } from '~/lib'
import { PresentationComponent, ChallengeComponent } from '.'
import styles from '../styles/Wizard.module.css'

const ResultsComponent = ({ nextState }: ComponentsProps): JSX.Element => (
    // TODO: Update with real score
    <>
        <h1 className="text-2xl">RESULTS</h1>
        <span>Tweet to challenge friends</span>
        <a href={X_URL_TO_SHARE_SCORE(1000)} target="_blank" rel="noopener noreferrer">
            Share on X
        </a>
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
        <div className="h-3/4 flex flex-col items-center pt-8">
            <h1 className={styles.title}>{WizardTitle[wizardState]}</h1>
            <div className={styles.box}>{body}</div>
        </div>
    )
}

export default WizardStateComponent
