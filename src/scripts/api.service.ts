import storageService from '@/scripts/storage.service'
import type { homework } from '@/scripts/types/homework.interface'

class ApiService {
  private readonly baseUrl: string

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
      throw e
    }
  }

  async all(): Promise<homework[]> {
    const authorization = storageService.retrieve_credentials()

    if (authorization === null) {
      throw new Error('403')
    }

    try {
      const response = await fetch(`${this.baseUrl}/homework/all`, {
        method: 'GET',
        headers: {
          Authorization: authorization[1]
        }
      })

      if (response.status === 403) {
        throw new Error('403')
      }

      const data: homework[] = await response.json()

      const homeworks: homework[] = []

      data.forEach((element) => {
        const newHomework: homework = {
          id: element.id,
          dateAdded: new Date(element.dateAdded),
          dateDue: new Date(element.dateDue),
          text: element.text,
          remark: element.remark,
          teacher: element.teacher,
          subject: element.subject,
          completed: element.completed
        }

        homeworks.push(newHomework)
      })

      return homeworks
    } catch (e) {
      console.error('Error fetching data: ', e)
      throw e
    }
  }

  async updateHomework(id: number, completed: boolean) {
    const authorization = storageService.retrieve_credentials()

    if (authorization === null) {
      throw new Error('403')
    }

    const options = new Headers({
      Authorization: authorization[1],
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })

    try {
      const response = await fetch(`${this.baseUrl}/homework/${id}`, {
        method: 'PUT',
        headers: options,
        body: JSON.stringify({
          completed: completed
        })
      })

      if (response.status === 403) {
        throw new Error('403')
      }
    } catch (e) {
      console.error('Error fetching data: ', e)
      throw e
    }
  }
}

const apiService = new ApiService('https://api.hausaufgaben.live/api')
// const apiService = new ApiService('http://localhost:3000/api')

export default apiService
