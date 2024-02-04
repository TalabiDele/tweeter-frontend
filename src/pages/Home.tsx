import { useEffect } from 'react'
import { useAppDispatch } from '../store/store'
import { checkUserLoggedIn } from '../store/auth/AuthSlice'
import { useSelector } from 'react-redux'
import TweetInput from '../components/TweetInput'

const Home = () => {
	const dispatch = useAppDispatch()

	interface Values {
		id: number
		bio: string
		email: string
		username: string
		createdAt: string
		firstname: string
		surname: string
		confirmed: boolean
	}

	const data = useSelector(
		(state: { user: { data: Values | null } }) => state.user.data
	)

	useEffect(() => {
		// dispatch(checkUserLoggedIn())
	}, [])

	return (
		<div>
			<TweetInput />
		</div>
	)
}

export default Home
