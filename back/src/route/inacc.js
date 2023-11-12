const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
const { Notifications } = require('../class/notifications')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')
const { NOTIFICATION_TYPE } = require('../data/const')
const { Transactions } = require('../class/transaction')

//==========================================

// Створимо користувача для зручності тестування
// User.create({
//   email: 'test5@gmail.com',
//   password: 'qwe123QWE',
// })
// User.create({
//   email: 'test4@gmail.com',
//   password: 'qwe123QWE',
// })
// User.create({
//   email: 'test3@gmail.com',
//   password: 'qwe123QWE',
// })

//============== ↙️ setting-email ================================

router.post('/settings-email', function (req, res) {
  // получаю newEmail, email, password из frontend

  const { newEmail, email, password } = req.body

  // console.log(newEmail, email, password)

  if (!email || !password || !newEmail) {
    return res.status(400).json({
      message: "Помилка. Немає обов'язкових полів",
    })
  }

  try {
    const user = User.updateEmail(newEmail, email, password)

    if (!user) {
      return res.status(400).json({
        message:
          'Пароль не збігається або нова електронна адреса вже існує',
      })
    }

    const session = Session.create(user)

    Confirm.create(newEmail)

    session.user.isConfirm = true

    Notifications.createNotification({
      userId: user.id,
      type: NOTIFICATION_TYPE.WARNING,
      message: 'Змінено електронну адресу',
    })

    return res.status(200).json({
      message: 'Електронну пошту змінено',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

//==========================================
router.post('/settings-pass', function (req, res) {
  // получаю newEmail, email, password из frontend

  const { email, password, newPassword } = req.body

  // console.log(email, password, newPassword)

  if (!email || !password || !newPassword) {
    return res.status(400).json({
      message: "Помилка. Немає обов'язкових полів",
    })
  }

  try {
    const user = User.updatePassword(
      email,
      password,
      newPassword,
    )
    if (!user) {
      return res.status(400).json({
        message: 'Пароль не збігається',
      })
    }
    const session = Session.create(user)

    Confirm.create(email)

    session.user.isConfirm = true

    Notifications.createNotification({
      userId: user.id,
      type: NOTIFICATION_TYPE.WARNING,
      message: 'Пароль змінено',
    })

    return res.status(200).json({
      message: 'Пароль змінено',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

//=========== Balance ================
router.post('/balance', function (req, res) {
  const { userId } = req.body

  // console.log('userId ------>', userId)

  if (!userId) {
    return res.status(400).json({
      message: 'Error. There are no required fields',
    })
  }

  try {
    // Достаем объект пользователя с заданым id
    const user = User.getById(Number(userId))

    const transactions =
      Transactions.getTransactionsByUserID(
        Number(user.id),
      ).reverse()

    const balance = Transactions.getBallanceByUserID(
      Number(user.id),
    )

    const session = {
      balance,
      transactions,
    }

    return res.status(200).json({
      message: 'Data received',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

//=========== recive ==========
router.post('/recive', function (req, res) {
  const { sum, email, paySys } = req.body

  // console.log(sum, email, paySys)

  if (!sum || !paySys || !email) {
    return res.status(400).json({
      message: "Помилка. Немає обов'язкових полів",
    })
  }

  try {
    const user = User.getByEmail(email)

    Transactions.receiveMoney(user, sum, paySys)

    return res.status(200).json({
      message: 'Гроші отримані',
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

//===================== sendPage =====
router.post('/send', function (req, res) {
  const { sum, email, payTo } = req.body

  // console.log(sum, email, payTo)

  if (!sum || !email || !payTo) {
    return res.status(400).json({
      message: "Помилка. Немає обов'язкових полів",
    })
  }

  try {
    const user = User.getByEmail(email)

    const userPayTo = User.getByEmail(payTo)

    if (!userPayTo) {
      return res.status(400).json({
        message:
          'Помилка. Електронна адреса, на яку ви надсилаєте гроші, не існує',
      })
    }

    Transactions.sendMoney(user, sum, userPayTo)

    return res.status(200).json({
      message: 'Гроші надіслано',
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

//====================

router.get('/transaction/:id', function (req, res) {
  const { id } = req.params

  // console.log('transaction:id--->', id)

  try {
    const transaction = Transactions.getTransactionById(
      Number(id),
    )
    if (!transaction) {
      return res.status(404).json({
        message: 'Транзакція не знайдена',
      })
    }
    const session = { transaction }

    return res.status(200).json({
      message: 'Підключено',
      session,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
})

//======================================

router.post('/notifications', function (req, res) {
  const { userId } = req.body

  // console.log('userId===>', userId)

  if (!userId) {
    return res.status(400).json({
      message: 'Ошибка. Нет обязательных полей',
    })
  }

  try {
    const user = User.getById(Number(userId))

    const notifications = Notifications.getByUserId(
      user.id,
    ).reverse()

    // console.log('/notifications--->', notifications) //????

    const session = { notifications }
    return res.status(200).json({
      message: 'Гроші надіслано',
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
