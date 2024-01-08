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
import Logo from '../components/Logo'
import {
	FaEnvelope,
	FaFacebook,
	FaGithub,
	FaGoogle,
	FaPhone,
	FaUser,
	FaXTwitter,
} from 'react-icons/fa6'
import {
	Formik,
	Field,
	Form,
	FormikErrors,
	FormikTouched,
	FieldInputProps,
} from 'formik'
import { MdLock } from 'react-icons/md'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../store/store'
import { registerUser } from '../store/auth/AuthSlice'
import { useSelector } from 'react-redux'

const RegisterSchema = Yup.object({
	username: Yup.string().required('Please a username'),
	firstName: Yup.string().required('Please enter your first name'),
	surname: Yup.string().required('Please enter your surname'),
	password: Yup.string()
		.required('Please enter your password')
		.min(6, 'Password must be at least 6 characters'),
	email: Yup.string().required('Please enter your email'),
	phoneNumber: Yup.number()
		.required('Please enter your phone number')
		.min(11, 'Please give 11 characters long'),
})

interface Values {
	username: string
	firstName: string
	surname: string
	password: string
	email: string
	phoneNumber: number
}

interface FetchedUser {
	jwt: string | null
	user: Values | null
}

interface CustomFieldProps {
	field: FieldInputProps<string>
	form: {
		errors: FormikErrors<Values>
		touched: FormikTouched<Values>
	}
}

const RegisterPage = () => {
	const dispatch = useAppDispatch()

	const loading = useSelector(
		(state: {
			user: { loading: 'idle' | 'pending' | 'succeeded' | 'failed' }
		}) => state.user.loading
	)

	const data = useSelector(
		(state: { user: { data: FetchedUser | null } }) => state.user.data
	)

	const register = (values: Values) => {
		dispatch(registerUser(values))

		if (loading === 'succeeded') {
			console.log(data?.user)
			// if (data?.data) {
			// 	console.log(data)
			// }
		}
	}

	const initialValues = {
		username: '',
		firstName: '',
		surname: '',
		password: '',
		email: '',
		phoneNumber: 0,
	}

	return (
		<SimpleGrid alignItems='center' height={'100vh'} margin={'2rem 0rem'}>
			<Box
				border='1px'
				borderColor='gray.200'
				width='30vw'
				padding='2rem'
				borderRadius='10px'
				margin='auto'
			>
				<Logo />
				<Text size='md' fontWeight={'500'}>
					Register
				</Text>

				<Formik
					initialValues={initialValues}
					validationSchema={RegisterSchema}
					onSubmit={(values: Values) => {
						console.log(values)
						register(values)
					}}
				>
					<Form>
						<SimpleGrid spacing='4' marginTop={'1rem'}>
							<Field id='username' name='username'>
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
												<FaUser color='gray' />
											</InputLeftElement>
											<Input
												{...field}
												name='username'
												placeholder='Username'
												type='text'
												// onChange={() => console.log(...field)}
											/>
										</InputGroup>
										<FormErrorMessage fontSize='smaller'>
											{form.errors.username}
										</FormErrorMessage>
									</FormControl>
								)}
							</Field>

							<SimpleGrid
								columns={2}
								justifyContent={'center'}
								// marginTop={'1rem'}
								spacing={'4'}
								display={'flex'}
							>
								<Field id='firstName' name='firstName'>
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
													<FaUser color='gray' />
												</InputLeftElement>
												<Input
													{...field}
													name='firstName'
													placeholder='First name'
													type='text'
													// onChange={() => console.log(...field)}
												/>
											</InputGroup>
											<FormErrorMessage fontSize='smaller'>
												{form.errors.firstName}
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>

								<Field id='surname' name='surname'>
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
													<FaUser color='gray' />
												</InputLeftElement>
												<Input
													{...field}
													name='surname'
													placeholder='Surname'
													type='text'
												/>
											</InputGroup>
											<FormErrorMessage fontSize='smaller'>
												{form.errors.surname}
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>
							</SimpleGrid>

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
												name='email'
												type='email'
											/>
										</InputGroup>
										<FormErrorMessage fontSize='smaller'>
											{form.errors.email}
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

							<Field id='phoneNumber' name='phoneNumber'>
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
												<FaPhone color='gray' />
											</InputLeftElement>
											<Input
												{...field}
												name='phoneNumber'
												placeholder='Phone number'
												type='number'
											/>
										</InputGroup>
										<FormErrorMessage fontSize='smaller'>
											{form.errors.phoneNumber}
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
								Submit
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
					Already a member?{' '}
					<span>
						<Text color={'btnPrimary.100'}>
							{' '}
							<Link to={'/login'}>Login</Link>
						</Text>
					</span>
				</Text>
			</Box>
		</SimpleGrid>
	)
}

export default RegisterPage
