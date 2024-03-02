const PRODUCTION_URL = 'https://toxicitycheck.vercel.app'
const X_URL = 'https://twitter.com/'
const X_TEXT_FOR_URL = (score: number): string =>  `I just got a score of ${score} on this amazing app! Visit ${PRODUCTION_URL} to try it yourself.`
export const X_URL_TO_SHARE_SCORE = (score: number): string => `${X_URL}intent/tweet?text=${X_TEXT_FOR_URL(score)}`