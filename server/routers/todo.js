const router = require('express').Router()
const Todo = require('../actions').todo

const { restricted } = require('../actions/middleware')
const { catchErrorHandler, mapTruthyCheck } = require('./functions')

router.get('/', restricted, async (req, res) => {

    const { user_id, username } = req.decoded

    try {

        const todos = await Todo.getTodosByUser(user_id)

        if (!todos || !todos.length) res.status(404).json({ message: `'${username}' does not currently have any todos. Make one, pls.` })

        else res.status(200).json(mapTruthyCheck(todos))

    } catch (err) {

        catchErrorHandler(res)

    }

})

router.post('/', restricted, async (req, res) => {

    const { user_id } = req.decoded
    const { title } = req.body

    try {

        if (title) {
            const newTodo = {
                user_id,
                title,
                completed: false
            }

            const todos = await Todo.addTodo(newTodo)

            res.status(201).json(mapTruthyCheck(todos))

        } else {

            res.status(400).json({ message: 'You must include a field called title in your request.' })

        }


    } catch (err) {

        catchErrorHandler(res)

    }

})

router.put('/:id', restricted, async (req, res) => {

    const { user_id } = req.decoded
    const { id } = req.params
    const { body } = req

    try {

        const todo = await Todo.getTodoById(id)

        if (todo.user_id === user_id) {

            const updatedTodo = await Todo.upTodo(id, body)

            res.status(202).json(updatedTodo)

        } else {

            res.status(401).json({ message: 'You are not the right user.' })

        }

    } catch (err) {

        catchErrorHandler(res, err)

    }

})

router.delete('/:id', restricted, async (req, res) => {

    const { user_id } = req.decoded
    const { id } = req.params

    try {

        const todo = await Todo.getTodoById(id)

        if (todo.user_id === user_id) {

            await Todo.delTodo(id)

            res.status(200).json({ message: 'Todo has been deleted.' })

        } else {

            res.status(401).json({ message: 'You are not the right user.' })

        }

    } catch (err) {

        catchErrorHandler(res)

    }

})

module.exports = router
