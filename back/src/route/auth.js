const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
const { Notifications } = require('../class/notifications')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')
const { NOTIFICATION_TYPE } = require('../data/const')

User.create({
  email: 'test23@gmail.com',
  password: '123asdASD',
})
User.create({
  email: 'test43@gmail.com',
  password: '123qweASD',
})
User.create({
  email: 'test33@gmail.com',
  password: '123asdASDE',
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

  try {
    const user = User.getByEmail(email)

    // console.log(user) //OK!

    if (user) {
      return res.status(400).json({
        message: 'Такий користувач вже існує',
      })
    }
   
    const newUser = User.create({ email, password })

    // console.log(newUser) //OK!

   
    Notifications.createNotification({
      userId: newUser.id,
      type: NOTIFICATION_TYPE.ANNOUNCEMENT,
      message: 'Створено новий акаунт',
    })

  
    const session = Session.create(newUser)

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
        message: 'Невірний код',
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

//==============================================

router.post('/recovery', function (req, res) {

  const { email } = req.body

  // console.log(email) // OK!

  if (!email) {
    return res.status(400).json({
      message: 'Помилка. Обовязкові поля відсутні',
    })
  }

  try {
    const user = User.getByEmail(email)

    // console.log(user) //OK!

    if (!user) {
      return res.status(400).json({
        message:
          ' Користувача з такою електронною поштою в базі не існує',
      })
    }

    Session.create(user)

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

//=====================================
router.post('/recovery-confirm', function (req, res) {
  const { code, password } = req.body

  // console.log(code, password) // OK!

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
      message: 'Ваш код поновлено',
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
