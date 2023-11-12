const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
const { Notifications } = require('../class/notifications')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')
const { NOTIFICATION_TYPE } = require('../data/const')

//==========================================

// Створимо користувача для зручності тестування
User.create({
  email: 'test5@gmail.com',
  password: 'qwe123QWE',
})
User.create({
  email: 'test4@gmail.com',
  password: 'qwe123QWE',
})
User.create({
  email: 'test3@gmail.com',
  password: 'qwe123QWE',
})

//============== ↙️ Sign Up ================================

router.post('/signup', function (req, res) {
  // получаю email, password из frontend

  const { email, password } = req.body

  // console.log(email, password)

  //Проверка, если нет одного из, то ошибка
  if (!email || !password) {
    return res.status(400).json({
      message: 'Помилка. Обовязкові поля відсутні',
    })
  }

  // дальше заходим в try для отслеживание ошибок в процессе работы приложения
  try {
    //Проверка есть ли пользователь с таким email  в базе
    //Функцию getByEmail достаем из класса User
    const user = User.getByEmail(email)

    // console.log(user) //OK!

    //Проверка, если такой пользователь уже есть, то ошибка
    if (user) {
      return res.status(400).json({
        message: 'Такий користувач вже існує',
      })
    }
    //Если email в базе нет, то создаем нового пользователя
    //функция create из класса User
    const newUser = User.create({ email, password })

    // console.log(newUser) //OK!

    //Функция создания уведомлений
    // класс Notifications
    // внутри класса Notifications функция createNotification для уведомлений
    Notifications.createNotification({
      userId: newUser.id,
      type: NOTIFICATION_TYPE.ANNOUNCEMENT,
      message: 'Створено новий акаунт',
    })

    //Session - класс сессии с функцией создания токена
    const session = Session.create(newUser)

    //Confirm - Класс для создания и контроля кода
    Confirm.create(email)
    // console.log('Your code====>>>', Confirm.generateCode())

    console.log('session======>>>>', session)
    return res.status(200).json({
      message: 'Користувач успішно зареєстрований',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка створення користувача',
    })
  }
})

//================= Sign Up confirm ====================

router.post('/signup-confirm', function (req, res) {
  const { code, token } = req.body

  // console.log(code, token) // OK!

  //Проверка, если нет одного из, то ошибка
  if (!code || !token) {
    return res.status(400).json({
      message: 'Помилка. Обовязкові поля відсутні',
    })
  }

  try {
    const session = Session.get(token)

    // console.log('Token===>', token)

    if (!session) {
      return res.status(400).json({
        message: 'Помилка. Неавторизований користувач',
      })
    }
    const email = Confirm.getData(code)
    if (!email) {
      return res.status(400).json({
        message: 'Не вірний код',
      })
    }

    if (email !== session.user.email) {
      return res.status(400).json({
        message: 'Код не дійсний',
      })
    }

    session.user.isConfirm = true

    User.confirmByEmail(email)

    return res.status(200).json({
      message: 'Вітаємо! Ваш е-mail підтверджено!',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

//==================== SignIn =================

router.post('/signin', function (req, res) {
  //....
  const { email, password } = req.body

  // console.log(email, password) // OK!

  if (!email || !password) {
    return res.status(400).json({
      message: 'Помилка. Обовязкові поля відсутні',
    })
  }

  try {
    const user = User.getByEmail(email)

    // console.log('id---->', user.id) //OK!

    if (!user) {
      return res.status(400).json({
        message:
          'Помилка. Користувача з таким e-mail не існує',
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Помилка. Невірний пароль.',
      })
    }

    Notifications.createNotification({
      userId: user.id,
      type: NOTIFICATION_TYPE.ANNOUNCEMENT,
      message: 'Ви увійшли в систему',
    })

    const session = Session.create(user)

    session.user.isConfirm = true

    return res.status(200).json({
      message: 'Ви увійшли в систему',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

//============== ↙️ Recovery ================================

router.post('/recovery', function (req, res) {
  // получаю email, password из frontend

  const { email } = req.body

  // console.log(email) // OK!

  //Проверка, если нет одного из, то ошибка
  if (!email) {
    return res.status(400).json({
      message: 'Помилка. Обовязкові поля відсутні',
    })
  }

  // дальше заходим в try для отслеживание ошибок в процессе работы приложения
  try {
    //Проверка есть ли пользователь с таким email  в базе
    //Функцию getByEmail достаем из класса User
    const user = User.getByEmail(email)

    // console.log(user) //OK!

    //Проверка, если такой пользователь уже есть, то ошибка
    if (!user) {
      return res.status(400).json({
        message:
          ' Користувача з такою електронною поштою в базі не існує',
      })
    }

    Session.create(user)

    //Confirm - Класс для создания и контроля кода
    Confirm.create(email)
    // console.log('Code =====>>>>', Confirm.getCode())

    return res.status(200).json({
      message:
        'На вашу електронну пошту надіслано код відновлення пароля',
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка ',
    })
  }
})

//================== Recovery-confirm ===================
router.post('/recovery-confirm', function (req, res) {
  const { code, password } = req.body

  // console.log(code, password) // OK!

  //Проверка, если нет одного из, то ошибка
  if (!code || !password) {
    return res.status(400).json({
      message: 'Помилка. Обовязкові поля відсутні',
    })
  }

  try {
    const email = Confirm.getData(Number(code))
    if (!email) {
      return res.status(400).json({
        message: 'Не вірний код',
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message:
          'Користувача з такою адресою електронної пошти не існує',
      })
    }

    user.password = password

    const session = Session.create(user)

    return res.status(200).json({
      message: 'Ваш паспорт поновлено',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})
//=====================
module.exports = router
