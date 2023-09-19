const CREATED_CODE = 201;
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

const serverErrorMessage = 'На сервере произошла ошибка';
const authNeedMessage = 'Необходима авторизация';
const tokenNotFoundMessage = "При авторизации произошла ошибка. Токен не передан или передан не в том формате."
const incorrectTokenMessage = 'При авторизации произошла ошибка. Переданный токен некорректен.'
const authDataErrorMessage = 'Неправильные почта или пароль.';
const authSuccessMessage = 'Успешная авторизация';
const dublicateEmailErrorMessage = 'Пользователь с таким email уже существует.';
const registerErrorMessage = 'При регистрации пользователя произошла ошибка.';
const incorrectRequestErrorMessage = 'Переданы некорректные данные';
const userNotFoundMessage = 'Запрашиваемый пользователь не найден';
const movieNotFoundMessage = 'Запрашиваемый фильм не найден';
const noAccessErrorMessage = 'У вас не прав на эту операцию';
const updateUserErrorMessage = 'При обновлении профиля произошла ошибка.';

module.exports = {
  CREATED_CODE,
  urlRegex,
  serverErrorMessage,
  authNeedMessage,
  authDataErrorMessage,
  tokenNotFoundMessage,
  incorrectTokenMessage,
  authSuccessMessage,
  dublicateEmailErrorMessage,
  incorrectRequestErrorMessage,
  userNotFoundMessage,
  noAccessErrorMessage,
  movieNotFoundMessage,
  registerErrorMessage,
  updateUserErrorMessage
};
