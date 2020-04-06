const FirebaseAuthErrorTranslator = (error) => {
    switch (error.code) {
        
        case "auth/wrong-password":
            return "Неверный пароль"

        case "auth/user-not-found":
            return "Пользователя с такой почтой не существует"

        case "auth/invalid-email":
            return "Неверный формат почты"

        case "auth/weak-password":
            return "Пароль должен содержать не менее 6 символов"

        case "auth/email-already-in-use":
            return "Пользователь с такой почтой уже зарегистрирован"

        case "auth/too-many-requests":
            return "Было выполнено большое количество неуспешных попыток входа. Попробуйте еще раз позже"

        case "auth/internal-error":
            return "Неверный формат нового адреса электронной почты"

        default:
            return error.message
    }
}

export default FirebaseAuthErrorTranslator