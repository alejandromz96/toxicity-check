import React, { type JSX, useState, useEffect } from 'react'
import { ToxicTextComponent } from './ToxicTextComponent'
import Crono from './crono'
import { type CategoryInference } from '~/server/lib/interfaces/categoryInference.interface'
import { api } from '~/utils/api'
import { loadModel } from '~/utils/tensorflow'
import { Loader } from '.'
import type { ComponentsProps } from './WizardStateComponent'

interface ChallengeComponentHistory {
    sentence: string
    inferences: CategoryInference[]
    response: string
    time: string
    matchCount: number
}

const getHistoryResult = (sentence: string, inferences: CategoryInference[]): ChallengeComponentHistory => ({
    sentence,
    inferences,
    response: `Sentence: ${sentence} found as ${
        inferences
            .filter((inference) => inference.results.some((result) => result.match))
            .map((inference) => inference.label)
            .join(', ') ?? 'non toxic'
    }`,
    matchCount: inferences.filter((inference) => inference.results.some((result) => result.match)).length,
    time: new Date().toISOString(),
})

const ChallengeComponent = ({ nextState }: ComponentsProps): JSX.Element => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const inference = api.post.getSentenceInference.useMutation()

    const [answerMap, setAnswerMap] = useState<Map<string, ChallengeComponentHistory>>(new Map())
    const [history, setHistory] = useState<ChallengeComponentHistory[]>([])
    const [modelReady, setModelReady] = useState(false)
    const [currentTime, setCurrentTime] = useState(10000)
    const [puntuation, setPuntuation] = useState(0)

    useEffect(() => {
        if (!modelReady) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            loadModel().then(() => setModelReady(true))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sendInferenceAndUpdateResult = (sentence: string): void => {
        if (sentence) {
            const previousResult = answerMap?.get(sentence)
            if (!previousResult) {
                inference
                    .mutateAsync({ sentence: sentence })
                    .then((result: CategoryInference[]) => {
                        const newEntry = getHistoryResult(sentence, result)
                        setAnswerMap((previosMap) => previosMap.set(sentence, newEntry))
                        setHistory((previousHistory) => [...previousHistory, newEntry])
                        setCurrentTime((currentTime) => currentTime + Math.max(3000 * newEntry.matchCount, 20))
                        setPuntuation((puntuation) => newEntry.matchCount * 100 + puntuation)
                    })
                    // TODO : Establish error handling
                    // eslint-disable-next-line no-console
                    .catch(() => console.log('error'))
            }
        }
    }

    return modelReady ? (
        <div className="rounded min-w-85">
            <div className="grid grid-rows-12 grid-flow-col justify-items-center gap-1 max-h-screen min-w-96">
                <div className="row-span-2">
                    {`Puntuation: ${puntuation}`}
                    <Crono
                        duration={currentTime}
                        refreshInterval={11}
                        callbackOnEnd={nextState}
                    />
                </div>
                <div className="row-span-9 overflow-y-auto w-full">
                    {history.map((history, index) => (
                        <div key={index}>{history.response}</div>
                    ))}
                </div>
                <div className="row-span-1 w-full mt-2">
                    <ToxicTextComponent loading={false} asyncSubmit={sendInferenceAndUpdateResult} />
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    )
}

export default ChallengeComponent
