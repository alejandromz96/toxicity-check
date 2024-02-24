import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import type { WizardStateType } from '~/lib/types/wizardState.type'

let wizardState: WizardStateType = 'presentation'

const updaters = new Set<Dispatch<SetStateAction<number>>>()

const increaseVersion = (version: number): number => version + 1

const update = (): void => {
    updaters.forEach((updater) => updater(increaseVersion))
}

const setWizardState = (newWizardState: WizardStateType): void => {
    if (newWizardState !== wizardState) {
        wizardState = newWizardState
        update()
    }
}

const useWizardState = (): {
    wizardState: WizardStateType
    setWizardState: (newWizardState: WizardStateType) => void
} => {
    const [, setVersion] = useState(0)

    useEffect(() => {
        updaters.add(setVersion)
        return () => {
            updaters.delete(setVersion)
        }
    }, [])

    return {
        wizardState,
        setWizardState,
    }
}

export default useWizardState
