import { list } from "../../script/list";

import { USER_ROLE } from "../../script/user";

class Userlist extends list {
    constructor () {
        super()

        this.element = document.querySelector('#user-list')
        if(!this.element) throw new Error('Element is null')

        this.loadData()
    }

    loadData = async () => {
        this.updateStatus(this.STATE.LOADING)

        // return null

        try {
            const res = await fetch('/user-list-data', {
                method: 'GET',
            })
            
            const data = await res.json()

            if(res.ok) {
                this.updateStatus(
                    this.STATE.SUCCESS,
                    this.convertData(data),
                )
            } else {
                this.updateStatus(this.STATE.ERROR, data)
            }
        } catch(error) {
            console.log(error)
            this.updateStatus(this.STATE.ERROR, {
                message: error.message,
            })
        }
    }

    convertData = (data) => {
        return {
            ...data,
            list: data.list.map((item) => ({
                ...user,
                role: USER_ROLE[user.role],
            }))
        }
    }

    updateView = () => {
        this.element.innerHTML = ''

        console.log(this.status, this.data)
 
        switch (this.status) {
            case this.STATE.LOADING:
               this.element.innerHTML = `
                 <div class="user">
                   <span class="user__title"></span>
                   <span class="user__sub"></span>
                 </div>
               `
            break

            case this.STATE.SUCCESS:
                this.data.list.forEach((item) => {
                    this.element.innerHTML += `
                     <a href="/user-item?id=${item.id}" class="user user--click">
                        <span class="user__title">${item.email}</span>
                        <span class="user__sub">${item.role}</span>
                     </a>
                    `
                });
            break

            case this.STATE.ERROR:
                this.element.innerHTML = `
                   <span class="alert alert--error">${this.data.message}</span>
                `
            break
        }
     }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
      if(!window.session || !window.session.user.isConfirm) {
         // location.assign('/')
     }
    } catch (err) {
       new Userlist()
    }
}) 