import type * as toxicity from '@tensorflow-models/toxicity'
import type { CategoryInference, InferenceProbability } from '~/server/lib/interfaces'

export function getSentenceToxicity(
    sentence: string | string[],
    loadedModel: toxicity.ToxicityClassifier
): Promise<CategoryInference[]> {
    return new Promise((resolve, reject) => {
        const inferenceSentence = (): void => {
            loadedModel
                .classify(sentence)
                .then((predictions: CategoryInference[]) => {
                    resolve(
                        predictions.map((prediction) => ({
                            label: prediction.label,
                            results: prediction.results.map((result) =>
                                parseResult(result.probabilities, result.match)
                            ),
                        }))
                    )
                })
                .catch(reject)
        }

        if (!sentence?.length) {
            resolve([])
        }

        inferenceSentence()
    })
}

function parseResult(probabilities: Float32Array, match: boolean): InferenceProbability {
    return {
        probabilities,
        match,
    }
}
