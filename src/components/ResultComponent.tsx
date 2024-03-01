import { FaceFrownIcon, FaceSmileIcon } from '@heroicons/react/24/solid'
import React, { type JSX } from 'react'
import useResultState from '~/hooks/useResultState'
import { type ChallengeComponentHistory } from '~/interfaces/challengeComponentHistory.interface'
import { InferenceCategories } from '~/server/lib/enums/inferenceCategories.enum'
import { ComponentsProps } from './WizardStateComponent'

interface Result {
    totalPuntuation: number
    lessToxicMessage: ChallengeComponentHistory | null
    mostToxicMessage: ChallengeComponentHistory | null
}

export const INFERENCE_CATEGORY_LABELS = new Map<string, string>([
    [InferenceCategories.SevereToxicity, 'SevereToxicity'],
    [InferenceCategories.Obscene, 'OBSCENE'],
    [InferenceCategories.Insult, 'LittleInsults'],
    [InferenceCategories.IdentityAttack, 'identityATTACK'],
    [InferenceCategories.SexualExplicit, 'SEXual'],
    [InferenceCategories.Threat, 'THREAT'],
    [InferenceCategories.Toxicity, 'Toxic'],
])

const getResult = (history: ChallengeComponentHistory[]): Result =>
    history.reduce(
        (acc: Result, historyMessage) => {
            acc.totalPuntuation += historyMessage.matchCount * 100
            if (!acc.lessToxicMessage) {
                acc.lessToxicMessage = historyMessage
            } else if (acc.lessToxicMessage.matchCount > historyMessage.matchCount) {
                acc.lessToxicMessage = historyMessage
            }

            if (!acc.mostToxicMessage) {
                acc.mostToxicMessage = historyMessage
            } else if (acc.mostToxicMessage.matchCount < historyMessage.matchCount) {
                acc.mostToxicMessage = historyMessage
            }

            return acc
        },
        {
            totalPuntuation: 0,
            lessToxicMessage: null,
            mostToxicMessage: null,
        }
    )

interface MessageCardProps {
    message: ChallengeComponentHistory | null
    isLessToxic: boolean
}

const MessageCard = ({ message, isLessToxic }: MessageCardProps): JSX.Element => (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
        {isLessToxic ? <FaceFrownIcon className="w-full" /> : <FaceSmileIcon className="w-full" />}
        <div className="px-6 py-4 bg-white">
            <div className="font-bold text-xl mb-2">
                {isLessToxic ? 'Your least toxic message...' : 'Your MOST toxic message!'}
            </div>
            <p className="text-gray-700 text-base">
                <i>{message?.sentence}</i>
            </p>
        </div>
        <div className="px-6 pt-4 pb-2 bg-white">
            {message?.inferences
                .filter((inference) => inference.results.some((result) => result.match))
                .map((inference, index) => (
                    <span
                        key={index}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                        #{INFERENCE_CATEGORY_LABELS.get(inference.label)}
                    </span>
                ))}
        </div>
    </div>
)

const ResultComponent = ({ nextState }: ComponentsProps): JSX.Element => {
    const { resultState } = useResultState()

    const finalResult = getResult(resultState)

    return (
        <div className="grid grid-cols-2 grid-flow-row gap-4">
            <div className="col-span-2 text-5xl text-center">FINAL PUNTUATION</div>
            <div className="col-span-2 text-8xl text-center">{finalResult.totalPuntuation}</div>
            {finalResult?.lessToxicMessage && (
                <div className="col-span-1">
                    <MessageCard message={finalResult.lessToxicMessage} isLessToxic={true} />
                </div>
            )}
            {finalResult?.mostToxicMessage && (
                <div className="col-span-1">
                    <MessageCard message={finalResult.mostToxicMessage} isLessToxic={false} />
                </div>
            )}
            <div className="flex col-span-2 items-center justify-center">
                <button
                    className="mt-10 rounded-md border border-gray-400 p-1.5 hover:bg-gray-900"
                    onClick={(): void => nextState()}
                >
                    RETRY
                </button>
            </div>
        </div>
    )
}

export default ResultComponent
