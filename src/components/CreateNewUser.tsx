import { ChangeEvent, useState } from 'react'
import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { useUserActions } from '../hooks/useUsersActions'

export default function CreateNewUser() {
	const { addUser } = useUserActions()
	const [result, setResult] = useState<'ok' | 'ko' | null>(null)

	const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()

		setResult(null)

		const form = event.target
		const formData = new FormData(form)

		const name = formData.get('name') as string
		const email = formData.get('email') as string
		const github = formData.get('github') as string

		if (!name || !email || !github) return setResult('ko')

		addUser({ name, email, github })
		setResult('ok')
		form.reset()
	}

	return (
		<Card className='mt-5'>
			<Title>Create New User</Title>

			<form className="mt-4" onSubmit={handleSubmit}>
				<TextInput name="name" placeholder='Name' />
				<TextInput name="email" placeholder='Email' />
				<TextInput name="github" placeholder='Github' />

				<div>
					<Button type='submit' className='mt-4'>
						Create user
					</Button>

					<span>
						{result === 'ok' && <Badge color='green'>Saved successfully</Badge>}
						{result === 'ko' && <Badge color='red'>Error ocurred</Badge>}
					</span>
				</div>
			</form>
		</Card>
	)
}
