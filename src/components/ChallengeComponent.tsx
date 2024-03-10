import React, { type JSX, useState, createRef, useEffect, type RefObject } from 'react'
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

const getHistoryLogMessage = (sentence: string, inferences: CategoryInference[]) => {
    const flaggedInferences = inferences
        .filter((inference) => inference.results.some((result) => result.match))
        .map((inference) => inference.label)
        .join(', ')

    return `> ${sentence} ${flaggedInferences.length > 0 ? `[FOUND: ${flaggedInferences.toUpperCase()}]` : '[TOXICITY NOT FOUND]'}`
}

const getHistoryResult = (sentence: string, inferences: CategoryInference[]): ChallengeComponentHistory => ({
    sentence,
    inferences,
    response: getHistoryLogMessage(sentence, inferences),
    matchCount: inferences.filter((inference) => inference.results.some((result) => result.match)).length,
    time: new Date().toISOString(),
})

const ChallengeComponent = ({ nextState }: ComponentsProps): JSX.Element => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const inference = api.post.getSentenceInference.useMutation()

    const [answerMap, setAnswerMap] = useState<Map<string, ChallengeComponentHistory>>(new Map())
    const [history, setHistory] = useState<ChallengeComponentHistory[]>([])
    const [currentTime, setCurrentTime] = useState(100000)
    const [puntuation, setPuntuation] = useState(0)
    const { setResultState } = useResultState()

    const historyLogRef: RefObject<HTMLDivElement> = createRef()

    useEffect(() => {
        if (historyLogRef?.current) {
            historyLogRef.current.scrollTop = historyLogRef.current.scrollHeight
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])

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
        <div className="w-full h-full grid grid-cols-2 grid-rows-7 gap-x-4 gap-y-2">
            <div className="lg:col-span-1 lg:row-start-1 lg:row-end-5 col-span-2 row-start-1 row-end-3 ">
                <div className="h-100">
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
            </div>
            <div className="lg:col-span-1 lg:col-start-1 lg:row-start-5 lg:row-end-5 col-span-2 row-start-3 row-end-3 text-yellow-text text-center text-4xl">
                {`SCORE : ${puntuation}`}
            </div>
            <div className="lg:col-span-1 lg:row-span-1 lg:col-start-1 lg:row-start-7 col-span-2 row-span-1 row-start-7">
                <ToxicTextComponent loading={false} asyncSubmit={sendInferenceAndUpdateResult} />
            </div>
            <div
                ref={historyLogRef}
                className="bg-yellow-text bg-opacity-30 rounded p-4 text-2xl text-yellow-text overflow-y-scroll scroll-smooth lg:col-span-1 lg:row-span-7 col-span-2 row-span-3 row-start-4 row-end-7"
                style={{ scrollbarColor: 'yellow-text' }}
            >
                {history.map((history, index) => (
                    <div key={index}>{history.response}</div>
                ))}
            </div>
        </div>
    )
}

export default ChallengeComponent
