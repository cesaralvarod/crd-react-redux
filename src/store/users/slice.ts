import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserId = string

export interface User {
	name: string
	email: string
	github: string
}

export interface UserState extends User {
	id: UserId
}

const DEFAULT_STATE: UserState[] = []

const initialState: UserState[] = (() => {
	const persistedState = localStorage.getItem('__redux__state__')
	if (persistedState) return JSON.parse(persistedState)?.users
	return DEFAULT_STATE
})() // EFI: initialState call another function

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID()
			return [...state, { id, ...action.payload }]
		},

		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload
			return state.filter((user) => user.id !== id)
		},

		rollbackUser: (state, action: PayloadAction<UserState>) => {
			const isUserAlreadyDefined = state.find(
				(user) => user.id === action.payload.id,
			)
			if (!isUserAlreadyDefined) return [...state, action.payload]
		},
	},
})

export default usersSlice.reducer

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions
