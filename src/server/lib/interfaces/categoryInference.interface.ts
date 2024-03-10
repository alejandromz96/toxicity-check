import type { InferenceProbability } from '.'

export default interface CategoryInference {
    label: string
    results: InferenceProbability[]
}
