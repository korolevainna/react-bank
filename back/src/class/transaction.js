const { Notifications } = require('./notifications')
const { NOTIFICATION_TYPE } = require('../data/const')

class Transactions {
  static #list = []
  static #count = 1

  //функция которая создает  все данные для транзакции
  static createTransaction = ({
    date,
    userId,
    userEmail,
    sender,
    receiver,
    type,
    amount,
    paymentSystem,
  }) => {
    const transaction = {
      date,
      userId,
      userEmail,
      sender,
      receiver,
      type,
      amount,
      paymentSystem,
      id: Transactions.#count++,
    }

    this.#list.push(transaction)
    return transaction
  }

  // ==========Получить список транзакций
  static getAllTransactions = () => {
    return this.#list
  }

  static getBallanceByUserID = (userId) => {
    const userTransactions =
      Transactions.getTransactionsByUserID(userId)

    const balance = userTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    )

    return balance
  }

  static getTransactionsByUserID = (userId) => {
    const userTransactions = this.#list.filter(
      (transaction) => transaction.userId === userId,
    )

    return userTransactions
  }

  //===============Получить деньги=========

  static receiveMoney = (user, amount, paySys) => {
    const date = new Date()
    Transactions.createTransaction({
      date,
      userId: user.id,
      userEmail: user.email,
      receiver: user.email,
      sender: paySys,
      type: 'Reciving',
      amount: amount,
      paySys,
    })
    // Добавить уведомление получении====================

    Notifications.createNotification({
      userId: user.id,
      type: NOTIFICATION_TYPE.RECIVING,
      message: 'Cash receipts',
    })
  }
  //============Отправим денги=============
  static sendMoney = (user, amount, userPayTo) => {
    const date = new Date()

    // списаниe с user
    Transactions.createTransaction({
      date,
      userId: user.id,
      userEmail: user.email,
      receiver: user.email,
      sender: userPayTo.email,
      type: 'Sending',
      amount: -amount,
      paymentSystem: 'User',
    })

    // добавление к userPayTo
    Transactions.createTransaction({
      date,
      userIdPayTo: userPayTo.id,
      userEmailPayTo: userPayTo.email,
      receiver: userPayTo.email,
      sender: user.email,
      type: 'Recive',
      amount: amount,
      paymentSystem: 'User',
    })

    // Добавить уведомление ============================

    Notifications.createNotification({
      userId: user.id,
      type: NOTIFICATION_TYPE.SENDING,
      message: 'Spending of money',
    })

    // =========================================
  }
  static getTransactionById = (transactionId) => {
    const transaction = this.#list.find(
      (transaction) => transaction.id === transactionId,
    )
    return transaction
  }
}

module.exports = {
  Transactions,
}