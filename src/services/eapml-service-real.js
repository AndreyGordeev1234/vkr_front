
export default class EapmlServiceReal {

    local_url = 'http://127.0.0.1:8000'
    nginx_url = 'https://api.eapml.ml'
    
    current_url = this.nginx_url

    getProfile(f_uid) {
        return fetch(`${this.current_url}/api/v1/users/${f_uid}`)
            .then((response) => response.json())
            .catch(() => new Error("Что-то пошло не так"))
    }

    postUser(f_uid) {
        const user = { f_uid }
        return fetch(`${this.current_url}/api/v1/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }

    changeUserInfo({f_uid='', first_name='', second_name='', company_name=''}) {
        const user = { first_name, second_name, company_name }
        return fetch(`${this.current_url}/api/v1/users/${f_uid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }

}