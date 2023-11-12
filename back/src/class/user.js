class User {
    // Задаємо масив в якому будемо зберегати списком інформацію про користувачів
    static #list = []
    static #count = 1
  
    constructor({ email, password }) {
      this.id = User.#count++
      this.email = String(email).toLowerCase()
      this.password = String(password)
      this.isConfirm = false
    }
  
    //Стат метод приймає данні data
    static create(data) {
      //Створює юзера
      const user = new User(data)
      //і додає його в масив list
      this.#list.push(user)
  
      // console.log(this.#list)
  
      return user
    }
  
    //Шукаємо користувача по email
    static getByEmail = (email) => {
      const user = this.#list.find(
        (user) => user.email === String(email).toLowerCase(),
      )
  
      if (user) {
        return user
      }
      return false
    }
  
    // getById - знаходить user по id
    static getById = (id) => {
      const user = this.#list.find(
        (user) => user.id === Number(id),
      )
      if (user) {
        return user
      }
      return false
    }
  
    //отримати список користуваців
    static getList = () => this.#list
  
    //Перевірка чи є такий такий email і надаємо значення isConfirm
    static confirmByEmail = (email) => {
      const user = this.getByEmail(email)
  
      if (user) user.isConfirm = true
    }
  
    //оновити email ======
    static updateEmail = (newEmail, oldEmail, password) => {
      const user = User.getByEmail(oldEmail)
  
      if (
        user &&
        user.password === password &&
        user.email === oldEmail
      ) {
        if (User.getByEmail(newEmail)) {
          return false
        }
        user.email = newEmail
  
        return user
      }
      return false
    }
    static updatePassword = (
      email,
      password,
      newPassword,
    ) => {
      const user = User.getByEmail(email)
  
      if (user && user.password === password) {
        user.password = newPassword
        user.isConfirm = false
  
        return user
      }
      return false
    }
  }
  console.log('====>', User.getList())
  module.exports = { User }