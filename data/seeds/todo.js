
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo').insert([
        { id: 1, title: 'Mow Lawn', completed: false, user_id: 1 },
        { id: 2, title: 'Drink Water', completed: false, user_id: 1 },
        { id: 3, title: 'Brush Teeth', completed: false, user_id: 1 }
      ]);
    });
};
