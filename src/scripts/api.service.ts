import storageService from '@/scripts/storage.service'
import type { homework } from '@/scripts/types/homework.interface'
import type { createHomeworkDto } from '@/scripts/types/create-homework.dto'
import type { foodScheduleEntry } from '@/scripts/types/food-schedule.interface'

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

      homeworks.sort((a, b) => a.dateDue.getTime() - b.dateDue.getTime())

      if (storageService.get_setting('localHomeworkStorage')) {
        const homework_string = JSON.stringify(homeworks)

        localStorage.setItem('homework', homework_string)
      }

      return homeworks
    } catch (e) {
      console.error('Error fetching data: ', e)
      throw e
    }
  }

  async updateHomework(id: number, completed: boolean) {
    if (storageService.get_setting('localHomeworkStorage')) {
      storageService.update_homework(id, completed)
    }

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

  async deleteHomework(id: number) {
    if (storageService.get_setting('localHomeworkStorage')) {
      storageService.delete_homework(id)
    }

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
      const response = await fetch(`${this.baseUrl}/homework/delete/${id}`, {
        method: 'GET',
        headers: options
      })

      if (response.status === 403) {
        throw new Error('403')
      }
    } catch (e) {
      console.error('Error fetching data: ', e)
      throw e
    }
  }

  async createHomework(homework: createHomeworkDto) {
    const authorization = storageService.retrieve_credentials()

    if (authorization === null) {
      throw new Error('403')
    }

    const options = new Headers({
      Authorization: authorization[1],
      'Content-Type': 'application/json'
    })

    try {
      const response = await fetch(`${this.baseUrl}/homework/create`, {
        method: 'POST',
        headers: options,
        body: JSON.stringify({
          subject: homework.subject,
          teacher: homework.teacher,
          text: homework.text,
          dateDue: homework.dateDue
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

  async getFood(): Promise<foodScheduleEntry[]> {
    try {
      const response = await fetch(`${this.baseUrl}/food/latest`, {
        method: 'GET'
      })

      if (response.status === 403) {
        throw new Error('403')
      }

      const data: foodScheduleEntry[] = await response.json()

      const foodSchedule: foodScheduleEntry[] = []

      data.forEach((element) => {
        const newHomework: foodScheduleEntry = {
          id: element.id,
          text: element.text,
          date: new Date(element.date)
        }

        foodSchedule.push(newHomework)
      })

      return foodSchedule
    } catch (e) {
      console.error('Error fetching data: ', e)
      throw e
    }
  }
}

const apiService = new ApiService('https://api.hausaufgaben.live/api')
// const apiService = new ApiService('http://localhost:3000/api')

export default apiService
