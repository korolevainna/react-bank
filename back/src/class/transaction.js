const { Notifications } = require('./notifications')
const { NOTIFICATION_TYPE } = require('../data/const')

class Transactions {
  static #list = []
  static #count = 1


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


    Notifications.createNotification({
      userId: user.id,
      type: NOTIFICATION_TYPE.RECIVING,
      message: 'Cash receipts',
    })
  }
 
  static sendMoney = (user, amount, userPayTo) => {
    const date = new Date()

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



    Notifications.createNotification({
      userId: user.id,
      type: NOTIFICATION_TYPE.SENDING,
      message: 'Spending of money',
    })

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