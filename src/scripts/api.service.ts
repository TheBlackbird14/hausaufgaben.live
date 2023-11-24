import storageService from '@/scripts/storage.service'

class ApiService {
  private baseUrl: string

  constructor(apiUrl: string) {
    this.baseUrl = apiUrl
  }

  async load(username: string, password: string) {
    const authorization = await storageService.encryptString(username, password)

    try {
      const response = await fetch(`${this.baseUrl}/homework/load`, {
        method: 'GET',
        headers: {
          Authorization: authorization
        }
      })

      if (response.status === 403) {
        throw new Error('403')
      }


    } catch (e) {

      console.error('Error fetching data: ', e)
      throw e;

    }
  }
}

const apiService = new ApiService('https://api.hausaufgaben.live/api')

export default apiService
