import storageService from '@/scripts/storage.service'

export interface homework {
  id: number
  dateAdded: Date
  dateDue: Date
  text: string
  remark: string
  teacher: string
  subject: string
  completed: boolean

/*  constructor(
    id: number,
    dateAdded: Date,
    dateDue: Date,
    text: string,
    remark: string,
    teacher: string,
    subject: string,
    completed: boolean
  ) {
    this.id = id
    this.dateAdded = dateAdded
    this.dateDue = dateDue
    this.text = text
    this.remark = remark
    this.teacher = teacher
    this.subject = subject
    this.completed = completed
  }*/
}

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
          Authorization: authorization,
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
      'Authorization': authorization[1],
        'Accept': 'application/json',
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

export default apiService
