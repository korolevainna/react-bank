class Confirm {
    static #list = []
  
    constructor(data) {
      this.code = Confirm.generateCode()
      this.data = data
    }
  
    //Генерация кода
    static generateCode = () =>
      Math.floor(Math.random() * 9000) + 1000
  
    static create = (data) => {
      this.#list.push(new Confirm(data))
  
      //код действителен 24 часа
      setTimeout(() => {
        this.delete(code)
      }, 24 * 60 * 60 * 1000) // 24 години у мілісекундах
  
      console.log('list---->', this.#list)
  
      //Confirm { code: 9478, data: 'test6@gmail.com' }
    }
  
    //удаление кода из списка
    static delete = (code) => {
      const length = this.#list.length
  
      this.#list = this.#list.filter(
        (item) => item.code !== code,
      )
  
      return length > this.#list.length
    }
    //получить код и сравнить с кодом в списке
    //если сходиться то выдать его, если нет то null
    static getData = (code) => {
      const obj = this.#list.find(
        (item) => item.code === Number(code),
      )
  
      return obj ? obj.data : null
    }
  
    static getCode = () => {
      if (this.#list.length > 0) {
        return this.#list[0].code
      } else {
        return null
      }
    }
  }
  
  module.exports = {
    Confirm,
  }
  // console.log('Your code -->', Confirm.create())