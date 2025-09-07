const MIN_CHAR_CODE = 97
const MAX_CHAR_CODE = 122
const OFFSET = MAX_CHAR_CODE - MIN_CHAR_CODE
const MULTIPLIER = 2
const GROUP_LENGTH = 5
const GROUP_SEPARATOR = ' '

const cipherLetter = (charCode: number): string => {
  if (charCode >= 48 && charCode <= 57) return String.fromCharCode(charCode)
  return String.fromCharCode(charCode + (OFFSET - (charCode - MIN_CHAR_CODE) * MULTIPLIER))
}

const transcode = (text: string): string => {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i)
    if ((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || (charCode >= 48 && charCode <= 57)) {
      const normalizedCode = charCode >= 65 && charCode <= 90 ? charCode + 32 : charCode
      result += cipherLetter(normalizedCode)
    }
  }
  return result
}

export function encode(plainText: string): string {
  const transcoded = transcode(plainText)
  let result = ''
  
  for (let i = 0; i < transcoded.length; i++) {
    if (i > 0 && i % GROUP_LENGTH === 0) {
      result += GROUP_SEPARATOR
    }
    result += transcoded[i]
  }
  
  return result
}

export function decode(cipherText: string): string {
  return transcode(cipherText)
}