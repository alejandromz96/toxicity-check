import * as toxicity from '@tensorflow-models/toxicity';
import { InferenceCategories } from '~/server/lib/enums/inferenceCategories.enum';
import type { CategoryInference } from '~/server/lib/interfaces/categoryInference.interface';
import type { InferenceProbability } from '~/server/lib/interfaces/inferenceProbability.interface';

// If the inference of the model is superior to 0.8 ( 80% )
// the results will be returned as a match. 
const DEFAULT_THRESHOLD = 0.8;
const TOXICITY_LABELS = Object.values(InferenceCategories);

export function getSentenceToxicity(sentence: string | string[]): Promise<CategoryInference[]> {
    return new Promise((resolve, reject) => {
        if(!sentence?.length){
            resolve([]);
        }
        toxicity.load(DEFAULT_THRESHOLD, TOXICITY_LABELS).then(model => {
            model.classify(sentence).then(predictions => {
                resolve(predictions.map(prediction => {
                    return {
                        label: prediction.label,
                        results: prediction.results.map(result => parseResult(result.probabilities, result.match))
                    }
                }));
            }).catch(reject)
        }).catch(reject);
    });
}

function parseResult(probabilities: Float32Array, match: boolean): InferenceProbability {
    return {
        probabilities,
        match
    }
}