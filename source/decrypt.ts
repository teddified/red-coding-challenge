const util = require('util')
const fs = require('fs')
import * as crypto from 'crypto'

const readFile = util.promisify(fs.readFile)

export const getDecryptedFile = async (): Promise<string | null> => {
  const promises = [
    readFile('./secret.key', 'utf8'),
    readFile('./secret.enc', 'utf8'),
    readFile('./auth.txt', 'utf8'),
    readFile('./iv.txt', 'utf8')
  ]

  const [secretKey, secretEnc, auth, iv] = await Promise.all(promises)

  try {
    const hash = crypto.createHash('sha256')
    const key = hash.update(secretKey).digest()

    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      key,
      iv,
      { authTagLength: 16 }
    )

    const authTag = Buffer.from(auth)
    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(secretEnc)
    decrypted = Buffer.concat([decrypted, decipher.final()])

    console.log(decrypted.toString())

  } catch (err) {
    console.log('no decryption was possible', err)
  }

  return null
}



