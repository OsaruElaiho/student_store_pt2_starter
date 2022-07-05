const db = require("../db")

class Order {
    // method will return all orders that the authenticated user has created.
    static async listOrdersForUser(user) {

    }
    
    // method will take a user's order and store it in the database
    static async createOrder({ order, user }) {

    }

}
module.exports = Order