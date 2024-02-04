import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputLeftElement,
	SimpleGrid,
	Text,
} from '@chakra-ui/react'
import {
	Field,
	FieldInputProps,
	Form,
	Formik,
	FormikErrors,
	FormikTouched,
} from 'formik'
import {
	FaEnvelope,
	FaFacebook,
	FaGithub,
	FaGoogle,
	FaXTwitter,
} from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import * as Yup from 'yup'
import { MdLock } from 'react-icons/md'
import { useAppDispatch } from '../store/store'
import { checkUserLoggedIn, loginUser } from '../store/auth/AuthSlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const LoginSchema = Yup.object({
	password: Yup.string()
		.required('Please enter your password')
		.min(6, 'Password must be at least 6 characters'),
	identifier: Yup.string().required('Please enter your email'),
})

interface Values {
	password: string
	identifier: string
}

interface UserValues {
	id: number
	bio: string
	email: string
	username: string
	createdAt: string
	firstname: string
	surname: string
}

interface FetchedUser {
	jwt: string | null
	user: UserValues | null
}

interface CustomFieldProps {
	field: FieldInputProps<string>
	form: {
		errors: FormikErrors<Values>
		touched: FormikTouched<Values>
	}
}

const LoginPage = () => {
	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const loading = useSelector(
		(state: {
			user: { loading: 'idle' | 'pending' | 'succeeded' | 'failed' }
		}) => state.user.loading
	)

	const data = useSelector(
		(state: { user: { data: UserValues | null } }) => state.user.data
	)

	useEffect(() => {
		dispatch(checkUserLoggedIn())
		console.log(data)
		if (data) {
			navigate('/')
		}
	}, [data])

	console.log(data?.username)

	const initialValues = {
		password: '',
		identifier: '',
	}

	const login = (values: Values) => {
		dispatch(loginUser(values))

		if (loading === 'succeeded') {
			console.log(data)
			navigate('/')
		}

		console.log(values)
	}

	const isAuthenticated = useSelector(
		(state: { user: { isAuthenticated: boolean } }) =>
			state.user.isAuthenticated
	)

	console.log(isAuthenticated)

	return (
		<div>
			<SimpleGrid
				alignItems='center'
				height={'100vh'}
				margin={'2rem 0rem'}
				spacing={4}
			>
				<Box
					border='1px'
					borderColor='gray.200'
					width='30vw'
					padding='2rem'
					borderRadius='10px'
					margin='auto'
				>
					<Logo />
					<Text size='md' fontWeight={'500'} mb={'1rem'}>
						Login
					</Text>

					<Formik
						initialValues={initialValues}
						validationSchema={LoginSchema}
						onSubmit={(values: Values) => {
							console.log(values)
							login(values)
						}}
					>
						<Form>
							<SimpleGrid spacing={4}>
								<Field id='email' name='email'>
									{({ field, form }: CustomFieldProps) => (
										<FormControl
											isInvalid={
												!!(
													form.errors[field.name as keyof Values] &&
													form.touched[field.name as keyof Values]
												)
											}
										>
											<InputGroup>
												<InputLeftElement>
													<FaEnvelope color='gray' />
												</InputLeftElement>
												<Input
													{...field}
													placeholder='Email'
													name='identifier'
													type='email'
												/>
											</InputGroup>
											<FormErrorMessage fontSize='smaller'>
												{form.errors.identifier}
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>

								<Field id='password' name='password'>
									{({ field, form }: CustomFieldProps) => (
										<FormControl
											isInvalid={
												!!(
													form.errors[field.name as keyof Values] &&
													form.touched[field.name as keyof Values]
												)
											}
										>
											<InputGroup>
												<InputLeftElement>
													<MdLock color='gray' />
												</InputLeftElement>
												<Input
													{...field}
													placeholder='Password'
													name='password'
													type='password'
												/>
											</InputGroup>
											<FormErrorMessage fontSize='smaller'>
												{form.errors.password}
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>

								<Button
									colorScheme='btnPrimary'
									// color='white'
									bg='btnPrimary.100'
									isLoading={loading === 'pending' ? true : false}
									// isLoading={true}
									type='submit'
								>
									Login
								</Button>
							</SimpleGrid>
						</Form>
					</Formik>

					<Text
						fontSize={'smaller'}
						textAlign={'center'}
						mt={'1rem'}
						color={'gray.500'}
					>
						or continue with these social profiles
					</Text>

					<SimpleGrid
						columns={4}
						justifyContent={'center'}
						marginTop={'1rem'}
						spacing={'4'}
						display={'flex'}
					>
						<Box
							border={'1px'}
							borderColor={'gray.200'}
							height='2rem'
							width='2rem'
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
							borderRadius={'50%'}
							cursor={'pointer'}
						>
							<FaGoogle color='gray' />
						</Box>
						<Box
							border={'1px'}
							borderColor={'gray.200'}
							height='2rem'
							width='2rem'
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
							borderRadius={'50%'}
							cursor={'pointer'}
						>
							<FaFacebook color='gray' />
						</Box>
						<Box
							border={'1px'}
							borderColor={'gray.200'}
							height='2rem'
							width='2rem'
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
							borderRadius={'50%'}
							cursor={'pointer'}
						>
							<FaXTwitter color='gray' />
						</Box>
						<Box
							border={'1px'}
							borderColor={'gray.200'}
							height='2rem'
							width='2rem'
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
							borderRadius={'50%'}
							cursor={'pointer'}
						>
							<FaGithub color='gray' />
						</Box>
					</SimpleGrid>

					<Text
						fontSize={'smaller'}
						textAlign={'center'}
						mt={'1rem'}
						color={'gray.500'}
					>
						Don't have an account?{' '}
						<span>
							<Text color={'btnPrimary.100'}>
								{' '}
								<Link to={'/register'}>Register</Link>
							</Text>
						</span>
					</Text>
				</Box>
			</SimpleGrid>
		</div>
	)
}

export default LoginPage
