class StorageService {
  /* returns username or null */
  retrieve_username(): string | undefined {
    return document.cookie.split('; ').find(row => row.startsWith('username='));
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
