import { createElement, type JSX } from 'react'
import { useWizardState } from '~/hooks'
import { type ComponentsProps, type WizardStateType } from '~/lib'
import { PresentationComponent, ChallengeComponent, ResultsComponent } from '.'
import styles from '../styles/Wizard.module.css'

const stateComponents: Record<WizardStateType, ({ nextState }: ComponentsProps) => JSX.Element> = {
    challenge: ChallengeComponent,
    results: ResultsComponent,
    presentation: PresentationComponent,
}

const WizardStateComponent = (): JSX.Element => {
    const { wizardState, nextState } = useWizardState()

    enum WizardTitle {
        'presentation' = 'CHALLENGE INSTRUCTIONS',
        'challenge' = 'CHALLENGE',
        'results' = 'RESULTS',
    }

    const body = createElement(stateComponents[wizardState], { nextState })

    return (
        <div className="h-3/4 flex flex-col items-center md:pt-4">
            <h1 className={styles.title}>{WizardTitle[wizardState]}</h1>
            <div className={styles.box}>{body}</div>
        </div>
    )
}

export default WizardStateComponent
