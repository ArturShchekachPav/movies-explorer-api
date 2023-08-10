const CREATED_CODE = 201;
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

const serverErrorMessage = 'На сервере произошла ошибка';
const authNeedMessage = 'Необходима авторизация';
const authDataErrorMessage = 'Неправильные почта или пароль';
const authSuccessMessage = 'Успешная авторизация';
const dublicateEmailErrorMessage = 'Пользователь с такой почтой уже зарегистрирован';
const incorrectRequestErrorMessage = 'Переданы некорректные данные';
const userNotFoundMessage = 'Запрашиваемый пользователь не найден';
const movieNotFoundMessage = 'Запрашиваемый фильм не найден';
const noAccessErrorMessage = 'У вас не прав на эту операцию';

module.exports = {
  CREATED_CODE,
  urlRegex,
  serverErrorMessage,
  authNeedMessage,
  authDataErrorMessage,
  authSuccessMessage,
  dublicateEmailErrorMessage,
  incorrectRequestErrorMessage,
  userNotFoundMessage,
  noAccessErrorMessage,
  movieNotFoundMessage,
};
