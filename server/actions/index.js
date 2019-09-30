const db = require('../../data/dbConfig')

module.exports = {

    users: {

        getUsers: _ => {
            return db('users')
        },

        getUserByUsername: username => {
            return db('users')
                .where({ username })
                .first()
        },

        createUser: async user => {
            await db('users').insert(user)

            return await db('users')
                .where({ username: user.username })
                .first()
        }

    },

    todo: {

        getTodosByUser: user_id => {

            return db('todo')
                .where({ user_id })

        },

        getTodoById: id => {

            return db('todo')
                .where({ id })
                .first()

        },

        addTodo: async todo => {

            await db('todo')
                .insert(todo)

            return await db('todo')
                .where({ user_id: todo.user_id })

        },

        delTodo: async id => {

            return await db('todo')
                .where({ id })
                .delete()

        },

        upTodo: async (id, updates) => {

            await db('todo')
                .where({ id })
                .update(updates)

            return await db('todo')
                .where({ id })
                .first()

        }

    }


}
