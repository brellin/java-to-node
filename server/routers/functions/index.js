module.exports = {

    catchErrorHandler: (res, err) => res.status(500).json({ message: 'Something broke on my end. Sorry...', err }),

    mapTruthyCheck: todos => todos.map(todo => ({ ...todo, completed: todo.completed === 1 }))

}