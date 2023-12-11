class Confirm {
    static #list = []
  
    constructor(data) {
      this.code = Confirm.generateCode()
      this.data = data
    }
  
  
    static generateCode = () =>
      Math.floor(Math.random() * 9000) + 1000
  
    static create = (data) => {
      this.#list.push(new Confirm(data))
  
      
      setTimeout(() => {
        this.delete(code)
      }, 24 * 60 * 60 * 1000) 
  
      console.log('list---->', this.#list)
  
      //Confirm { code: 2305, data: 'test66@gmail.com' }
    }
  
    
    static delete = (code) => {
      const length = this.#list.length
  
      this.#list = this.#list.filter(
        (item) => item.code !== code,
      )
  
      return length > this.#list.length
    }
 l
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
  
  module.exports = { Confirm, }
