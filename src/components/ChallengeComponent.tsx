import React, { type JSX, useState } from 'react'
import { ToxicTextComponent } from './ToxicTextComponent'
import Crono from './crono'
import { type CategoryInference } from '~/server/lib/interfaces/categoryInference.interface'
import { api } from '~/utils/api'
import { type ComponentsProps } from './WizardStateComponent'

interface ChallengeComponentHistory {
    sentence: string
    inferences: CategoryInference[]
    response: string
    time: string
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
    time: new Date().toISOString(),
})

const ChallengeComponent = ({ changeWizardState }: ComponentsProps): JSX.Element => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const inference = api.post.getSentenceInference.useMutation()

    const [answerMap, setAnswerMap] = useState<Map<string, ChallengeComponentHistory>>(new Map())
    const [history, setHistory] = useState<ChallengeComponentHistory[]>([])
    const [puntuation, setPuntuation] = useState(0)

    const sendInferenceAndUpdateResult = (sentence: string): void => {
        if (sentence) {
            const previousResult = answerMap?.get(sentence)
            if (previousResult) {
                setHistory((previousHistory) => [previousResult, ...previousHistory])
            } else {
                inference
                    .mutateAsync({ sentence: sentence })
                    .then((result: CategoryInference[]) => {
                        const newEntry = getHistoryResult(sentence, result)
                        setAnswerMap((previosMap) => previosMap.set(sentence, newEntry))
                        setHistory((previousHistory) => [...previousHistory, newEntry])
                        setPuntuation((previousPuntuation) => previousPuntuation + 1)
                    })
                    // TODO : Establish error handling
                    // eslint-disable-next-line no-console
                    .catch(() => console.log('error'))
            }
        }
    }

    return (
        <div className="rounded min-w-85">
            <div className="grid grid-rows-12 grid-flow-col justify-items-center gap-1 max-h-screen min-w-96">
                <div className="row-span-1">
                    <Crono duration={200000} callbackOnEnd={changeWizardState} />
                </div>
                <div className="row-span-1">
                    <h6>{`Puntuation : ${puntuation}`}</h6>
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
    )
}

export default ChallengeComponent
