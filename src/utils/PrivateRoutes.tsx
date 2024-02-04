import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkUserLoggedIn } from '../store/auth/AuthSlice'

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

interface FetchedUser {
	jwt: string | null
	user: Values | null
}

const PrivateRoutes = () => {
	const dispatch = useDispatch()

	const data = useSelector(
		(state: { user: { data: Values | null } }) => state.user.data
	)
	console.log(data)

	const isAuthenticated = useSelector(
		(state: { user: { isAuthenticated: boolean } }) =>
			state.user.isAuthenticated
	)

	console.log(isAuthenticated)

	const loading = useSelector(
		(state: {
			user: { loading: 'idle' | 'pending' | 'succeeded' | 'failed' }
		}) => state.user.loading
	)

	useEffect(() => {
		dispatch(checkUserLoggedIn())
	}, [])

	const handle = () => {
		if (loading === 'idle') {
			// dispatch(checkUserLoggedIn())
			console.log(loading)
		} else if (loading === 'pending') {
			// dispatch(checkUserLoggedIn())
			console.log(loading)
		} else if (loading === 'succeeded') {
			if (data) {
				return <Outlet />
			} else {
				return <Navigate to={'/login'} />
			}
		}
	}

	return (
		<>
			{/* {loading === 'idle' && <div className=''>Loading...</div>}
			{loading === 'pending' && <div className=''>Loading...</div>} */}
			{/* {handle()} */}
			{/* {loading === 'pending' ? (
				<div className=''>Loading...</div>
			) : data ? (
				<Outlet />
			) : (
				<Navigate to={'/login'} />
			)} */}

			{data ? <Outlet /> : <Navigate to={'/login'} />}
			{/* { && <Navigate to={'/login'} />} */}
		</>
	)
}

export default PrivateRoutes
