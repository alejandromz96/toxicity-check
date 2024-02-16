export enum InferenceCategories {
    SevereToxicity = 'severe_toxicity',
    Obscene = 'obscene',
    Insult = 'insult',
    IdentityAttack = 'identity_attack',
    SexualExplicit = 'sexual_explicit',
    Threat = 'threat',
    Toxicity = 'toxicity',
}

export const getInferenceCategoryName = (enumValue: InferenceCategories): string => {
    switch (enumValue) {
        case InferenceCategories.SevereToxicity:
            return 'Severe toxicity'
        case InferenceCategories.Obscene:
            return 'Obscene'
        case InferenceCategories.Insult:
            return 'Insult'
        case InferenceCategories.IdentityAttack:
            return 'Identity attack'
        case InferenceCategories.SexualExplicit:
            return 'Sexual explicity'
        case InferenceCategories.Threat:
            return 'Threat'
        case InferenceCategories.Toxicity:
            return 'Toxicity'
        default:
            return 'Unknown'
    }
}
