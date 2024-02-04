import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { useEffect } from 'react'
import { useAppDispatch } from './store/store'
import { checkUserLoggedIn } from './store/auth/AuthSlice'
import PrivateRoutes from './utils/PrivateRoutes'
import { useSelector } from 'react-redux'
import Nav from './components/Nav'
import { Box } from '@chakra-ui/react'

function App() {
	const dispatch = useAppDispatch()

	interface Values {
		password: string
		identifier: string
	}

	interface FetchedUser {
		jwt: string | null
		user: Values | null
	}

	const data = useSelector(
		(state: { user: { data: FetchedUser | null } }) => state.user.data
	)

	console.log(data)

	useEffect(() => {
		dispatch(checkUserLoggedIn())
	}, [dispatch])

	return (
		<>
			<Router>
				<Nav />
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route path='/' element={<Home />} />
					</Route>
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
