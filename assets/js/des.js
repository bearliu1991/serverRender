import cryptoJs from 'crypto-js'

const desKey = 'MF1#npeonwFQFX0g'
// 随机生成指定数量的16进制key
export const generatekey = (num) => {
  const library =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let key = ''
  for (let i = 0; i < num; i++) {
    const randomPoz = Math.floor(Math.random() * library.length)
    key += library.substring(randomPoz, randomPoz + 1)
  }
  return key
}
// DES加密
export const encryptDes = (message, key) => {
  const keys = key || desKey
  const keyHex = cryptoJs.enc.Utf8.parse(keys)
  const option = { mode: cryptoJs.mode.ECB, padding: cryptoJs.pad.Pkcs7 }
  const encrypted = cryptoJs.DES.encrypt(message, keyHex, option)
  return encrypted.ciphertext.toString()
}

// DES解密
export const decryptDes = (message, key) => {
  const keys = key || desKey
  const keyHex = cryptoJs.enc.Utf8.parse(keys)
  const decrypted = cryptoJs.DES.decrypt(
    {
      ciphertext: cryptoJs.enc.Hex.parse(message),
    },
    keyHex,
    {
      mode: cryptoJs.mode.ECB,
      padding: cryptoJs.pad.Pkcs7,
    }
  )
  return decrypted.toString(cryptoJs.enc.Utf8)
}
