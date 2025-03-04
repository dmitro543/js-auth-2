const { use } = require("../route/auth")

class Session {
    static #list = []
 
    constructor(data) {
      this.token = Session.generateCode()
      this.user = {
        email: user.email,
        isConfirm: user.isConfirm,
        role: user.role,
        id: user.id,
      }
    }
 
    static generateCode = () => {
        const length = 6
        const characters = 'ABCDFGHJKJHGFERTYHGFDSDFGHBV0123456789'

        let result = ''

        for(let i = 0; i < length; i++) {
            const randomIndex = Math.floor(
                Math.random() * characters.length
            )
            result += characters[randomIndex]
        }

        return result
    }
 
    static create = (user) => {
       const session = new Session(user)

       this.#list.push(session)

       return session
    }
 
    static get = (token) => {
       return (
         this.#list.find((item) => item.token === token) ||
         null
       )
    }
 }
 
 module.exports = {
    Session
 }

console.log(Session.generateCode())