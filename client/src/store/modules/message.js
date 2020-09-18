// import Vue from 'vue';
import { SnackbarProgrammatic as Snackbar } from "buefy";

export default {
    namespaced: true,
    mutations: {
        snackbar(state, { message, type }) {
            Snackbar.open({
                message: message,
                type: type,
            });
        },
    },
    actions: {
        // Доступ разрешен
        async accessAllowed() {
            Snackbar.open({
                message: "Вход осуществлен.",
                type: "is-success",
            });
        },
        // В доступе отказано
        async accessDenied() {
            Snackbar.open({
                message: "В доступе отказано, введен неверный пароль или логин.",
                type: "is-danger",
            });
        },
        // Почта или логин не найдены
        async loginNotFound() {
            Snackbar.open({
                message: "Такая почта или логин не найдены.",
                type: "is-danger",
            });
        },
        // Сессия завершена 
        async sessionEnded() {
            Snackbar.open({
                message: "Сессия завершена, повторите вход.",
                type: "is-warning",
            });
        },  
        // Неизвестная ошибка 
        async error() {
            Snackbar.open({
                message: "Неизвестная ошибка.",
                type: "is-warning",
            });
        },  
        // регистрация
        // Успешная регистрация
        async accessSignin() {
            Snackbar.open({
                message: "Вы зарегистрированы",
                type: "is-success",
            });
        },
        // Такой логин или email уже зарегистрирваны
        async doubleSignin() {
            Snackbar.open({
                message: "Такой логин или email уже зарегистрированы",
                type: "is-warning",
            });
        },
        // Пароль в обоих полях должен быть одинаковым
        async passwordNotEquivalent() {
            Snackbar.open({
                message: "Пароль в обоих полях должен быть одинаковым.",
                type: "is-warning",
            });
        },
        // Длина пароля должна быть не меньше 8 символов
        async shortPassword() {
            Snackbar.open({
                message: "Длина пароля должна быть не меньше 8 символов.",
                type: "is-warning",
            });
        },
        // ошибка бд на сервере
        async errorDB() {
            Snackbar.open({
                message: "Ошибка сервера БД",
                type: "is-warning",
            });
        },
        // 
        async dataSigninTooLong() {
            Snackbar.open({
                message: "Данные для регистрации должны быть меньше 40 символов.",
                type: "is-warning",
            });
        },
        // 
        // Выход
        async exit() {
            Snackbar.open({
                message: "Вы вышли.",
                type: "is-success",
            });
        },
        // 
        // Посты
        // Ошибка 
        async errorPosts() {
            Snackbar.open({
                message: "Ошибка получения постов",
                type: "is-danger",
            });
        },
        // ошибка удаления поста
        async postDeletedError() {
            Snackbar.open({
                message: "Ошибка удаления поста.",
                type: "is-danger",
            });
        },
        // Пост удален
        async postDeleted() {
            Snackbar.open({
                message: "Пост удален.",
                type: "is-success",
            });
        },
        // Ошибка добавления поста
        async errorInsertPost() {
            Snackbar.open({
                message: "Ошибка добавления поста.",
                type: "is-danger",
            });
        },
        // Ошибка добавления поста
        async insertPost() {
            Snackbar.open({
                message: "Пост добавлен",
                type: "is-success",
            });
        },
        async updateLengthError() {
            Snackbar.open({
                message: "Длина сообщения должна быть больше 5 и меньше 1000 символов.",
                type: "is-warning",
            });
        },
        async errorUpdate() {
            Snackbar.open({
                message: "Возникла ошибка при обновлении.",
                type: "is-danger",
            });
        },
        async postUpdated() {
            Snackbar.open({
                message: "Пост обновлен.",
                type: "is-success",
            });
        },
        async errorParse() {
            Snackbar.open({
                message: "Введены данные, содержащие запрещенные символы или SQL-инъекции.",
                type: "is-success",
            });
        },
    },
};
