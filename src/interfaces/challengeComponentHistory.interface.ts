import { type CategoryInference } from '~/server/lib/interfaces/categoryInference.interface'

export interface ChallengeComponentHistory {
    sentence: string
    inferences: CategoryInference[]
    response: string
    time: string
    matchCount: number
}
