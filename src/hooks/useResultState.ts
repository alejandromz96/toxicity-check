import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { type ChallengeComponentHistory } from '~/interfaces/challengeComponentHistory.interface'

let resultState: ChallengeComponentHistory[] = []

const updaters = new Set<Dispatch<SetStateAction<number>>>()

const increaseVersion = (version: number): number => version + 1

const update = (): void => {
    updaters.forEach((updater) => updater(increaseVersion))
}

const setResultState = (newState: ChallengeComponentHistory[]): void => {
    if (resultState.length !== newState.length) {
        resultState = newState
        update()
    }
}

const useResultState = (): {
    resultState: ChallengeComponentHistory[]
    setResultState: (newState: ChallengeComponentHistory[]) => void
} => {
    const [, setVersion] = useState(0)

    useEffect(() => {
        updaters.add(setVersion)
        return () => {
            updaters.delete(setVersion)
        }
    }, [])

    return {
        resultState,
        setResultState,
    }
}

export default useResultState
