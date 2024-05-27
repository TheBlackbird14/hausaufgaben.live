class StorageService {
  key = 'Z3bdat/AhyxCaVwoh5nRbwurIRq8hemCK2C4ObIcEEs='

  /* mostly ChatGPT bs here, don't judge */

  private generateIV(): Uint8Array {
    const iv = new Uint8Array(16)
    crypto.getRandomValues(iv)
    return iv
  }

  private stringToUint8Array(str: string): Uint8Array {
    const encoder = new TextEncoder()
    return encoder.encode(str)
  }
  private base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)

    for (let i = 0; i < len; ++i) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    return bytes
  }

  private uint8ArrayToHexString(arr: Uint8Array): string {
    return Array.from(arr)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
  }

  async encryptString(username: string, password: string): Promise<string> {
    let input = username + ':' + password

    input = btoa(input)

    const key = await crypto.subtle.importKey(
      'raw',
      this.base64ToUint8Array(this.key),
      { name: 'AES-CBC', length: 256 },
      false,
      ['encrypt']
    )

    const iv = this.generateIV()
    const encodedInput = this.stringToUint8Array(input)

    const algorithm: AesCbcParams = { name: 'AES-CBC', iv: iv }
    const ciphertext = await crypto.subtle.encrypt(algorithm, key, encodedInput)

    // Combine IV and ciphertext into a single Uint8Array
    const encryptedBytes = new Uint8Array(iv.length + ciphertext.byteLength)
    encryptedBytes.set(iv)
    encryptedBytes.set(new Uint8Array(ciphertext), iv.length)

    // Convert IV and ciphertext to hex strings
    const ivHex = this.uint8ArrayToHexString(iv)
    const ciphertextHex = this.uint8ArrayToHexString(new Uint8Array(ciphertext))

    // Combine IV and ciphertext hex strings
    return ciphertextHex + ivHex
  }

  /* now the good stuff */

  async store_credentials(username: string, password: string) {
    /* removing legacy cookies from old website */
    localStorage.removeItem('username')
    localStorage.removeItem('password')

    const encrypted_credentials = await this.encryptString(username, password)

    localStorage.setItem('username', username)
    localStorage.setItem('credentials', encrypted_credentials)
  }

  /* returns [username, credentials] or null */
  retrieve_credentials(): [string, string] | null {
    const username = localStorage.getItem('username')
    const credentials = localStorage.getItem('credentials')

    if (username === null || credentials === null) {
      return null
    } else {
      return [username, credentials]
    }
  }

  async logout() {
    const settings = ['localHomeworkStorage']

    settings.forEach((setting) => {
      localStorage.removeItem(setting)
    })

    localStorage.removeItem('username')
    localStorage.removeItem('credentials')
    localStorage.removeItem('homework')

    sessionStorage.removeItem('username')
    sessionStorage.removeItem('credentials')
  }

  update_homework(id: number, completed: Boolean) {
    const homework = localStorage.getItem('homework')
    if (homework === null) {
      return
    }

    const parsed_homework = JSON.parse(homework)
    const index = parsed_homework.findIndex((element: any) => element.id === id)
    if (index === -1) {
      return
    }

    parsed_homework[index].completed = completed
    localStorage.setItem('homework', JSON.stringify(parsed_homework))
  }

  delete_homework(id: number) {
    const homework = localStorage.getItem('homework')
    if (homework === null) {
      return
    }

    const parsed_homework = JSON.parse(homework)
    const index = parsed_homework.findIndex((element: any) => element.id === id)
    if (index === -1) {
      return
    }

    parsed_homework.splice(index, 1)
    localStorage.setItem('homework', JSON.stringify(parsed_homework))
  }

  set_setting(setting: string, value: boolean) {
    localStorage.setItem(setting, value.toString())
  }

  get_setting(setting: string): boolean {
    const value = localStorage.getItem(setting)
    if (value === null) {
      return false
    } else {
      return value === 'true'
    }
  }
}

const storageService = new StorageService()

export default storageService
