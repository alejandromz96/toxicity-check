import { useRouter } from 'next/router'
import React, { type JSX } from 'react'
import useResultState from '~/hooks/useResultState'
import type { ChallengeComponentHistory } from '~/interfaces'
import { X_URL_TO_SHARE_SCORE, type ComponentsProps } from '~/lib'
import { InferenceCategories } from '~/server/lib/enums'

interface Result {
    totalScore: number
    firstToxicMessage?: ChallengeComponentHistory
    secondToxicMessage?: ChallengeComponentHistory
    thirdToxicMessage?: ChallengeComponentHistory
    lastToxicMessage?: ChallengeComponentHistory
}

const INFERENCE_CATEGORY_LABELS = new Map<string, string>([
    [InferenceCategories.SevereToxicity, 'SevereToxicity'],
    [InferenceCategories.Obscene, 'OBSCENE'],
    [InferenceCategories.Insult, 'LittleInsults'],
    [InferenceCategories.IdentityAttack, 'identityATTACK'],
    [InferenceCategories.SexualExplicit, 'SEXual'],
    [InferenceCategories.Threat, 'THREAT'],
    [InferenceCategories.Toxicity, 'Toxic'],
])

const INFERENCE_DICTIONARY_NAME = new Map<string, string>([
    [InferenceCategories.SevereToxicity, 'toxic'],
    [InferenceCategories.Obscene, 'obscene'],
    [InferenceCategories.Insult, 'insult'],
    [InferenceCategories.IdentityAttack, 'hate-speech'],
    [InferenceCategories.SexualExplicit, 'sexual'],
    [InferenceCategories.Threat, 'threat'],
    [InferenceCategories.Toxicity, 'Toxic'],
])

const CAMBRIDGE_DICTIONARY = 'https://dictionary.cambridge.org/dictionary/english/'

const getResult = (history: ChallengeComponentHistory[]): Result =>
    history.reduce(
        (result: Result, message) => {
            const { matchCount } = message
            result.totalScore += matchCount * 100
            if (!result.firstToxicMessage || result.firstToxicMessage.matchCount < matchCount) {
                const oldFirst = result.firstToxicMessage
                result.firstToxicMessage = message
                if (oldFirst) {
                    if (!result.secondToxicMessage || result.secondToxicMessage.matchCount < oldFirst.matchCount) {
                        const oldSecond = result.secondToxicMessage
                        result.secondToxicMessage = oldFirst
                        if (oldSecond) {
                            if (
                                !result.thirdToxicMessage ||
                                result.thirdToxicMessage.matchCount < oldSecond.matchCount
                            ) {
                                result.thirdToxicMessage = oldSecond
                            }
                        }
                    } else if (!result.thirdToxicMessage || result.thirdToxicMessage.matchCount < oldFirst.matchCount) {
                        result.thirdToxicMessage = oldFirst
                    }
                }
            } else if (!result.secondToxicMessage || result.secondToxicMessage.matchCount < message.matchCount) {
                const oldSecond = result.secondToxicMessage
                result.secondToxicMessage = message
                if (oldSecond) {
                    if (!result.thirdToxicMessage || result.thirdToxicMessage.matchCount < oldSecond.matchCount) {
                        result.thirdToxicMessage = oldSecond
                    }
                }
            } else if (!result.thirdToxicMessage || result.thirdToxicMessage.matchCount < message.matchCount) {
                result.thirdToxicMessage = message
            }

            if (!result.lastToxicMessage || result.lastToxicMessage.matchCount >= matchCount) {
                result.lastToxicMessage = message
            }

            return result
        },
        {
            totalScore: 0,
        }
    )

const getMessageCardsTags = (message: ChallengeComponentHistory | null): JSX.Element => (
    <>
        {message?.inferences
            .filter((inference) => inference.results.some((result) => result.match))
            .map((inference, index) => (
                <a
                    key={index}
                    className="font-medium ml-2"
                    href={`${CAMBRIDGE_DICTIONARY}${INFERENCE_DICTIONARY_NAME.get(inference.label)}`}
                >
                    #{INFERENCE_CATEGORY_LABELS.get(inference.label)}
                </a>
            ))}
    </>
)

const ResultsComponent = ({ nextState }: ComponentsProps): JSX.Element => {
    const { resultState } = useResultState()
    const router = useRouter()

    const {
        totalScore: totalPuntuation,
        firstToxicMessage,
        secondToxicMessage,
        thirdToxicMessage,
        lastToxicMessage,
    } = getResult(resultState)

    const handleOnclick = async (): Promise<void> => {
        await router.push('/about')
    }

    return (
        <section className="flex flex-col items-center justify-around md:justify-between text-center w-full h-full text-yellow-text space-y-4">
            <div className="flex flex-col items-center space-y-2">
                <span className="text-3xl md:text-6xl animate-bounce">FINAL SCORE {totalPuntuation}</span>
                {firstToxicMessage && (
                    <div>
                        <span className="font-semibold text-xl md:text-4xl">First place </span>
                        <span className="bg-yellow-text bg-opacity-15 rounded-sm p-1">
                            {firstToxicMessage.sentence}
                        </span>
                        {getMessageCardsTags(firstToxicMessage)}
                    </div>
                )}
                {secondToxicMessage && (
                    <div>
                        <span className="font-semibold text-lg md:text-3xl">Second place </span>
                        <span className="bg-yellow-text bg-opacity-15 rounded-sm p-1">
                            {secondToxicMessage.sentence}
                        </span>
                        {getMessageCardsTags(secondToxicMessage)}
                    </div>
                )}
                {thirdToxicMessage && (
                    <div>
                        <span className="font-semibold md:text-3xl">Third place </span>
                        <span className="bg-yellow-text bg-opacity-15 rounded-sm p-1">
                            {thirdToxicMessage.sentence}
                        </span>
                        {getMessageCardsTags(thirdToxicMessage)}
                    </div>
                )}
                {lastToxicMessage && (
                    <div className="mt-5 hidden md:flex md:items-center md:space-x-2">
                        <span className="font-semibold md:text-2xl">Least toxic message</span>
                        <span className="bg-yellow-text bg-opacity-15 rounded-sm px-1">
                            {lastToxicMessage.sentence}
                        </span>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-center space-y-3">
                <a
                    href={X_URL_TO_SHARE_SCORE(totalPuntuation)}
                    className="animate-pulse text-xl md:text-2xl"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Share your score on X
                </a>
                <button
                    className="rounded-lg border border-yellow-text px-2 py-1 bg-gray-800 bg-opacity-30 hover:bg-gray-900 duration-1000 md:text-xl"
                    onClick={(): void => nextState()}
                >
                    TRY AGAIN
                </button>
                <button
                    className="border-b border-yellow-text hover:text-lg duration-1000 md:text-xl"
                    onClick={handleOnclick}
                >
                    Know more about us
                </button>
            </div>
        </section>
    )
}

export default ResultsComponent
