import { addNewUser, deleteUserById, User, UserId } from '../store/users/slice'
import { useAppDispatch, useAppSelector } from './store'

export const useUserActions = () => {
	const dispatch = useAppDispatch()
	const users = useAppSelector((state) => state.users)

	const addUser = (user: User) => dispatch(addNewUser(user))
	const removeUser = (id: UserId) => dispatch(deleteUserById(id))

	return {
		users,
		addUser,
		removeUser,
	}
}
