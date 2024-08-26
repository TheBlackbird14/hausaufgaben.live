import storageService from '@/scripts/storage.service'
import type { homework } from '@/scripts/types/homework.interface'
import type { createHomeworkDto } from '@/scripts/types/create-homework.dto'
import type { foodScheduleEntry } from '@/scripts/types/food-schedule.interface'

class ApiService {
  private readonly baseUrl: string

  constructor(apiUrl: string) {
    this.baseUrl = apiUrl
  }

  async login(username: string, password: string, stayLoggedIn: boolean) {
    try {
        const response = await fetch(`${this.baseUrl}/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            username: username,
            password: password,
            stayLoggedIn: stayLoggedIn
            }),
          credentials: 'include'
        })

        if (response.status === 403) {
            throw new Error('403')
        }

        const data = await response.text()

      console.log(data)

    } catch (e) {
      console.error('Error fetching data: ', e)
      throw e
    }

  }

  async load() {

    try {
      const response = await fetch(`${this.baseUrl}/homework/load`, {
        method: 'GET',
        credentials: 'include'
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

    if (storageService.retrieve_username() === null) {
      throw new Error('403')
    }

    try {
      const response = await fetch(`${this.baseUrl}/homework/all`, {
        method: 'GET',
        credentials: 'include'
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



    if (storageService.retrieve_username() === null) {
      throw new Error('403')
    }

    const options = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })

    try {
      const response = await fetch(`${this.baseUrl}/homework/${id}`, {
        method: 'PUT',
        headers: options,
        body: JSON.stringify({
          completed: completed
        }),
        credentials: 'include'
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



    if (storageService.retrieve_username() === null) {
      throw new Error('403')
    }

    const options = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })

    try {
      const response = await fetch(`${this.baseUrl}/homework/delete/${id}`, {
        method: 'GET',
        headers: options,
        credentials: 'include'
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


    if (storageService.retrieve_username() === null) {
      throw new Error('403')
    }

    const options = new Headers({
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
        }),
        credentials: 'include'
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
        method: 'GET',
        credentials: 'include'
      })

      if (response.status === 403) {
        throw new Error('403')
      }

      const data: foodScheduleEntry[] = await response.json()

      const foodSchedule: foodScheduleEntry[] = []

      data.forEach((element) => {
        const newFood: foodScheduleEntry = {
          id: element.id,
          text: element.text,
          date: new Date(element.date),
          probability: element.probability
        }

        foodSchedule.push(newFood)
      })

      foodSchedule.sort((a, b) => a.id - b.id)

      return foodSchedule
    } catch (e) {
      console.error('Error fetching data: ', e)
      throw e
    }
  }
}

// const apiService = new ApiService('https://api.hausaufgaben.live/api')
const apiService = new ApiService('http://localhost:3000/api')

export default apiService
