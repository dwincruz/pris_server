const database = require("../../config/database");

class User {
  constructor(firstName, middleName, lastName, email) {
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
  }
  async createUser() {
    const query = `INSERT INTO users(first_name, middle_name, last_name, email) VALUES('${this.firstName}','${this.middleName}', '${this.lastName}', '${this.email}')`;
    const rows = await database.execute(query);
    return rows;
  }
  static async fetchUser() {
    const query = `SELECT * FROM users`;
    const [rows, fields] = await database.execute(query);
    const filteredRows = rows.filter((row) => !Buffer.isBuffer(row._buff));
    return filteredRows;
  }

  //static is to  create/clone another object to a method

  //IF WITH STATIC
  //Call the static method on the class itself
  //const result = await ExampleClass.ExampleMethod(); or
  //const result = await ExampleClass.ExampleMethod('val');

  //IF WITHOUT STATIC
  // Create an instance of the class and call the method on the instance
  //const instance = new ExampleClass();
  //const result = await instance.ExampleMathod(); or
  //const result = await instance.ExampleMathod('val');

  async currentLoggedUser(id) {
    const query = `SELECT id FROM users WHERE email = '${id}'`;
    const [rows, fields] = await database.execute(query);
    const filteredRows = rows.filter((row) => !Buffer.isBuffer(row._buff));
    return filteredRows[0].id;
  }
}

module.exports = User;
