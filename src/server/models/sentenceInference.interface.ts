export enum InferenceCategories {
    SevereToxicity = "severe_toxicity",
    Obscene = "obscene",
    Insult = "insult",
    IdentityAttack = "identity_attack",
    SexualExplicit = "sexual_explicit",
    Threat = "threat",
    Toxicity = "toxicity"
}

export type InferenceProbability = {
    probabilities : Float32Array,
    match: boolean
}

export type CategoryInference = {
    label: string,
    results: InferenceProbability[]
}