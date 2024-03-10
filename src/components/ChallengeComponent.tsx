import React, { type JSX, useState } from 'react'
import { api } from '~/utils/api'
import { useResultState } from '~/hooks'
import type { CategoryInference } from '~/server/lib'
import { ToxicTextComponent, CronoComponent } from '~/components'
import type { ComponentsProps } from '~/lib'

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
    const [currentTime, setCurrentTime] = useState(10000)
    const [, setPuntuation] = useState(0)
    const { setResultState } = useResultState()

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

    return (
        <div>
            <div className="w-full h-full">
                <div className="w-85 h-65">
                    <CronoComponent
                        currentTime={currentTime}
                        setCurrentTime={setCurrentTime}
                        refreshInterval={11}
                        callbackOnEnd={() => {
                            setResultState(history)
                            nextState()
                        }}
                    />
                </div>
                <div className="h-25 w-85">
                    {history.map((history, index) => (
                        <div key={index}>{history.response}</div>
                    ))}
                </div>
                <div className="h-10 w-85">
                    <ToxicTextComponent loading={false} asyncSubmit={sendInferenceAndUpdateResult} />
                </div>
            </div>
        </div>
    )
}

export default ChallengeComponent
