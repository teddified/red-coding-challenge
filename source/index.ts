import * as util from 'util'
import * as fs from 'fs'

const readFile = util.promisify(fs.readFile)
const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

readFile('./clear_smaller.txt', 'utf8').then((data) => {
  // 2
  console.log(getSumOfNumberCharsInString(data))
  // 3
  console.log(getValueOfVocals(data))
  // 4
  console.log(getSumOfNumbersPerSentence(data))
  // 4 a)
  console.log(getBiggestSentenceValuesInText(data))
})

const getSumOfNumberCharsInString = (string: string): number =>
  [...string].reduce((acc, cur) =>
    NUMBERS.includes(cur)
      ? acc += Number(cur)
      : acc
  , 0)

const getValueOfVocals = (string: string) => {
  const charsToFindWithValue = { a: 2, e: 4, i: 8, o: 16, u: 32 }

  return [...string].reduce((acc, cur) =>
    Object
      .keys(charsToFindWithValue)
      .includes(cur)
      ? acc += charsToFindWithValue[cur]
      : acc
  , 0)
}

const getSumOfNumbersPerSentence = (string: string) =>
  getEachSentence(string).map((sentence) =>
    getSumOfNumberCharsInString(sentence)
  )

const getBiggestSentenceValuesInText = (string: string) => {
  const sumOfNumbersPerSentence = getSumOfNumbersPerSentence(string)
  const tenHighest = getTenHighestDigitsWithoutSorting(sumOfNumbersPerSentence)

  return reduceNumberArrayByTheirIndex(tenHighest)
}

const reduceNumberArrayByTheirIndex = (digits: number[]) => digits.map((digit, index) => digit - index)

const getTenHighestDigitsWithoutSorting = (digits: number[]) => {
  return digits.reduce((acc, cur) => {
    const currentLowestIndex = acc.indexOf(Math.min(...acc))

    return acc.length >= 10 && currentLowestIndex > -1 && cur > acc[currentLowestIndex]
      ? [
        ...acc.slice(0, currentLowestIndex),
        ...acc.slice(currentLowestIndex + 1),
        cur
      ]
      : acc.length >= 10
        ? acc
        : [...acc, cur]
  }, [] as number[])
}

const getEachSentence = (string: string): string[] => string.split('.')
