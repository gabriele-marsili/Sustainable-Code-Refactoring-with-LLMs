const BobResponse = [
  'Whatever.',
  'Sure.',
  'Whoa, chill out!',
  'Calm down, I know what I'm doing!',
  'Fine. Be that way!'
] as const;

enum MessageType {
  other,
  question,
  yell,
  yell_quesion,
  nothing
}

type Response<T> = T[keyof T];

export function hey(message: string): Response<typeof BobResponse> {
  const trimmed = message.trim();
  if (!trimmed) return BobResponse[MessageType.nothing];

  const isQuestion = trimmed.endsWith('?');
  const hasLetters = /[a-zA-Z]/.test(trimmed);
  const isYelling = hasLetters && trimmed === trimmed.toUpperCase();

  if (isYelling && isQuestion) return BobResponse[MessageType.yell_quesion];
  if (isYelling) return BobResponse[MessageType.yell];
  if (isQuestion) return BobResponse[MessageType.question];
  return BobResponse[MessageType.other];
}