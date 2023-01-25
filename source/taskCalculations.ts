import * as fs from 'fs'
import * as util from 'util'
import {getDecryptedFile} from './decrypt'

const readFile = util.promisify(fs.readFile)
const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

export const getResponse = async () => {
  const data = await getFileData()

  return {
    task2: getSumOfNumberCharsInString(data),
    task3: getValueOfVocals(data),
    task4: getSumOfNumbersPerSentence(data),
    task4a: getBiggestSentenceValuesInText(data)
  }
}

const getFileData = async () => {
  return await getDecryptedFile() ??
    await readFile('./clear_smaller.txt', 'utf8')
}

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
