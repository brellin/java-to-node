const bcryptjs = require('bcryptjs');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'jim', password: bcryptjs.hashSync('Yeah', 12) },
        { id: 2, username: 'bob', password: bcryptjs.hashSync('Yeah', 12) },
        { id: 3, username: 'joe', password: bcryptjs.hashSync('Yeah', 12) }
      ]);
    });
};
