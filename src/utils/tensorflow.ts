import { InferenceCategories } from "~/server/models/sentenceInference.interface";
import type {CategoryInference, InferenceProbability }from "~/server/models/sentenceInference.interface";
import * as toxicity from '@tensorflow-models/toxicity';

// If the inference of the model is superior to 0.8 ( 80% )
// the results will be returned as a match. 
const DEFAULT_THRESHOLD = 0.8;
const TOXICITY_LABELS = [
    InferenceCategories.SevereToxicity,
    InferenceCategories.Obscene,
    InferenceCategories.Insult,
    InferenceCategories.IdentityAttack,
    InferenceCategories.SexualExplicit,
    InferenceCategories.Threat,
    InferenceCategories.Toxicity,
];

export function getSentenceToxicity(sentence: string | string[]): Promise<CategoryInference[]> {
    return new Promise((resolve, reject) => {
        if(sentence.length === 0 || !sentence){
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