/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { InferenceCategories, getInferenceCategoryName } from '~/server/lib/enums/inferenceCategories.enum'
import type { CategoryInference } from '~/server/lib/interfaces/categoryInference.interface'
import type { InferenceProbability } from '~/server/lib/interfaces/inferenceProbability.interface'

type Props = {
    inferenceCallback: (sentence: string) => Promise<CategoryInference[]>
    sentence: string
    setSentence: (string: string) => void
}

const ResultsComponent = ({ sentence, setSentence, inferenceCallback }: Props): React.JSX.Element => {
    const [history, setHistory] = useState(new Map<string, Map<string, InferenceProbability[]>>())

    const getInferenceMap = (inferences: CategoryInference[]): Map<string, InferenceProbability[]> => {
        const inferencesMap = new Map<string, InferenceProbability[]>()
        inferences.forEach((value) => inferencesMap.set(value.label, value.results))

        return inferencesMap
    }

    const getInferencedRows = (): React.JSX.Element[] => {
        const inferencedRows: React.JSX.Element[] = []

        history.forEach((inferences, sentence) => {
            inferencedRows.push(
                <tr>
                    <td>{sentence}</td>
                    {Object.values(InferenceCategories).map((category) => (
                        <td
                            key={category}
                        >{`${inferences.get(category)?.at(0)?.match ? 'YES' : inferences.get(category)?.at(0) !== null ? 'NO' : 'UNKNOWN'}`}</td>
                    ))}
                </tr>
            )
        })

        return inferencedRows
    }

    useEffect(() => {
        if (sentence && !history.has(sentence)) {
            inferenceCallback(sentence)
                .then((inferences: CategoryInference[]) => {
                    setHistory(history.set(sentence, getInferenceMap(inferences)))
                })
                .catch((reason) => console.log(reason)) // commented, this component will be refactored in the final version
            setSentence('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sentence])

    return (
        <div className="w-100 h-100 bg-white rounded m-2">
            <table className="border-separate border-spacing-3">
                <tbody>
                    <tr>
                        <th>Sentence</th>
                        {Object.values(InferenceCategories).map((value) => (
                            <th key={value}>{getInferenceCategoryName(value)}</th>
                        ))}
                    </tr>
                    {getInferencedRows()}
                </tbody>
            </table>
        </div>
    )
}

export default ResultsComponent
