import * as toxicity from '@tensorflow-models/toxicity'
import { InferenceCategories, type CategoryInference, type InferenceProbability } from '~/server/lib'

// If the inference of the model is superior to 0.8 ( 80% )
// the results will be returned as a match.
const DEFAULT_THRESHOLD = 0.8
const TOXICITY_LABELS = Object.values(InferenceCategories)

let loadedModel: toxicity.ToxicityClassifier
let loadingModelPromise: Promise<toxicity.ToxicityClassifier>
let isLoadedModel: boolean = false

export const loadModel = (): Promise<toxicity.ToxicityClassifier> => {
    if (loadingModelPromise !== undefined) {
        return loadingModelPromise
    }

    return new Promise((resolve, reject) => {
        if (!isLoadedModel) {
            isLoadedModel = true
            loadingModelPromise = toxicity.load(DEFAULT_THRESHOLD, TOXICITY_LABELS)
            loadingModelPromise
                .then((model) => {
                    loadedModel = model
                    resolve(model)
                })
                .catch((error) => {
                    isLoadedModel = false
                    reject(error)
                })
        }
    })
}

export const isModelLoaded = (): boolean => isLoadedModel

export function getSentenceToxicity(sentence: string | string[]): Promise<CategoryInference[]> {
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
        if (!loadedModel) {
            loadModel()
                .then(() => inferenceSentence())
                // eslint-disable-next-line no-console
                .catch((error) => console.log(JSON.stringify(error))) // TODO : Establish error handling
        } else {
            inferenceSentence()
        }
    })
}

function parseResult(probabilities: Float32Array, match: boolean): InferenceProbability {
    return {
        probabilities,
        match,
    }
}
