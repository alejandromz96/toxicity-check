const PRODUCTION_URL = 'https://toxicitycheck.vercel.app'
const X_URL = 'https://x.com/'
const X_TEXT_FOR_URL = (score: number): string =>
    `I just got a ${score} toxicity score! Do you think you can be worse than me? Go and check how toxic can you be! ${PRODUCTION_URL}`
export const X_URL_TO_SHARE_SCORE = (score: number): string => `${X_URL}intent/tweet?text=${X_TEXT_FOR_URL(score)}`