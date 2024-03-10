import type { CategoryInference } from '~/server/lib/interfaces'

export default interface ChallengeComponentHistory {
    sentence: string
    inferences: CategoryInference[]
    response: string
    time: string
    matchCount: number
}
