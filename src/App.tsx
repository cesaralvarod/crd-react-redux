import { Toaster } from 'sonner'

import CreateNewUser from './components/CreateNewUser'
import ListOfUsers from './components/ListOfUsers'

function App() {
	return (
		<div className='container mx-auto py-10'>
			<ListOfUsers />
			<CreateNewUser />

			<Toaster richColors />
		</div>
	)
}

export default App
