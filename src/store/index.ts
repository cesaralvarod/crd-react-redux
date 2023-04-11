import { configureStore, type Middleware } from '@reduxjs/toolkit'
import { toast } from 'sonner'

import usersReducer, { rollbackUser, UserState } from './users/slice'

// Middlewares

const persistanceMiddleware: Middleware = (store) => (next) => (action) => {
	next(action)
	localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action
	const previousState = store.getState()

	next(action)

	if (type === 'users/deleteUserById') {
		const userToRemove = previousState.users.find((user:UserState) => user.id === payload)

		fetch(`https://jsonplaceholder.typicode.com[aaaa]/users/${payload}`, {
			method: 'DELETE',
		})
			.then((res) => {
				if (res.ok) toast.success(`User ${payload} removed successfully`)

				throw new Error('Error occurred while removing user')
			})
			.catch((err) => {
				toast.error(`Error occurred while removing user ${payload}`)
				if (userToRemove) store.dispatch(rollbackUser(userToRemove))
				console.error(err)
			})
	}
}

// Save all reducers, like a box
export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceMiddleware],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
