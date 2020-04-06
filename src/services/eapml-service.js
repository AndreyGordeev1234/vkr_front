
export default class EapmlService {

    data = {
        profiles: {
            byId: {
                "test10": {
                    username: "test10",
                    firstName: "Андрей",
                    secondName: "Гордеев",
                    companyName: "ВятГу",
                    email: "test1@test.com",
                    password: "test1"
                },
                "Юлечка": {
                    username: "Юлечка",
                    firstName: "Андрей",
                    secondName: "Гордеев",
                    companyName: "ВятГу",
                    email: "test1@test.com",
                    password: "test1"
                },
                "prolodgy": {
                    account: {
                        first_name: "Андрей",
                        second_name: "Гордеев",
                        company_name: "ВятГу",
                    },
                    username: "prolodgy",
                    email: "test1@test.com"
                }
            }
        }
    }

    getProfile(username) {
        const userData = this.data.profiles.byId[username]
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (userData === undefined) reject(new Error("Что-то пошло не так"))
                else resolve(userData)
            }, 1000)
        })
    }

    postProfile() {
        const user = {
            username: "prolodgy",
            email: "test1@test.com"
        }

        fetch('http://127.0.0.1:5000/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }
}