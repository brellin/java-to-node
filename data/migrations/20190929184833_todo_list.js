
exports.up = function (knex) {

    return knex.schema.createTable('todo', todo => {

        todo.increments()

        todo
            .string('title')
            .notNullable()

        todo
            .boolean('completed')
            .notNullable()

        todo
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

    })

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('todo')
};
