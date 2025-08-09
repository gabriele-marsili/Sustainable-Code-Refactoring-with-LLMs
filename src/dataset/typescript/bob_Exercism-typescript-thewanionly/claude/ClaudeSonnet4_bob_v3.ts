const BobResponse = [
  'Whatever.',
  'Sure.',
  'Whoa, chill out!',
  `Calm down, I know what I's doing!`,
  'Fine. Be that way!'
] as const

type Response<T> = T[keyof T]

export function hey(message: string): Response<typeof BobResponse> {
  const trimmed = message.trim()
  
  if (!trimmed) {
    return BobResponse[4]
  }
  
  const isQuestion = trimmed.endsWith('?')
  const hasLetters = /[a-zA-Z]/.test(trimmed)
  const isYelling = hasLetters && trimmed === trimmed.toUpperCase()
  
  if (isYelling && isQuestion) {
    return BobResponse[3]
  }
  
  if (isYelling) {
    return BobResponse[2]
  }
  
  if (isQuestion) {
    return BobResponse[1]
  }
  
  return BobResponse[0]
}