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
	FaUser,
	FaXTwitter,
} from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import * as Yup from 'yup'
import { MdLock } from 'react-icons/md'

const LoginSchema = Yup.object({
	password: Yup.string()
		.required('Please enter your password')
		.min(6, 'Password must be at least 6 characters'),
	email: Yup.string().required('Please enter your email'),
})

interface Values {
	password: string
	email: string
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

const LoginPage = () => {
	const initialValues = {
		password: '',
		email: '',
	}

	return (
		<div>
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
						validationSchema={LoginSchema}
						onSubmit={(values: Values) => {
							console.log(values)
							register(values)
						}}
					>
						<Form>
							<SimpleGrid>
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
		</div>
	)
}

export default LoginPage
