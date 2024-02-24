import * as toxicity from '@tensorflow-models/toxicity'
import { InferenceCategories } from '~/server/lib/enums/inferenceCategories.enum'
import type { CategoryInference } from '~/server/lib/interfaces/categoryInference.interface'
import type { InferenceProbability } from '~/server/lib/interfaces/inferenceProbability.interface'

// If the inference of the model is superior to 0.8 ( 80% )
// the results will be returned as a match.
const DEFAULT_THRESHOLD = 0.8
const TOXICITY_LABELS = Object.values(InferenceCategories)

let loadedModel: toxicity.ToxicityClassifier;
let isLoadedModel : boolean = false;


export const loadModel = (): Promise<void> => new Promise((resolve, reject) => {
            if(!isLoadedModel){
                isLoadedModel = true;
                toxicity
                .load(DEFAULT_THRESHOLD, TOXICITY_LABELS)
                .then((model) => {
                    loadedModel = model
                    resolve()
                })
                .catch((error) => {
                    isLoadedModel = false
                    reject(error)
                })
            }
    })

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
        if(!loadedModel){
            // eslint-disable-next-line no-console
            loadModel().then(() => inferenceSentence()).catch(error => console.log(JSON.stringify(error))) // TODO : Establish error handling
        }else{
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
