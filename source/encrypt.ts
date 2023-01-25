const util = require('util')
const fs = require('fs')
import * as crypto from 'crypto'

const readFile = util.promisify(fs.readFile)

readFile('./secret.key', 'utf8').then((secretKey: string) => {
  readFile('./secret.enc', 'utf8').then((secretEnc: NodeJS.ArrayBufferView) => {
    const hash = crypto.createHash('sha256')
    const key = hash.update(secretKey).digest()

    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      key,
      '�����\f��(�ˍ+\'',
      { authTagLength: 16 }
    )

    const authTag = Buffer.from('�����D/ic�B�[RY');
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(secretEnc);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    console.log(decrypted.toString());
  })
})


