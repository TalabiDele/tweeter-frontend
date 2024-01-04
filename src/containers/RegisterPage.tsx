import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react'
import Logo from '../components/Logo'
import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa6'
import {
	Formik,
	Field,
	Form,
	FormikHelpers,
	FormikErrors,
	FormikTouched,
	FieldProps,
	FieldInputProps,
} from 'formik'
import { useState } from 'react'
import { MdLock } from 'react-icons/md'

interface Values {
	firstName: string
	surname: string
	password: string
	email: string
	phoneNumber: number
}

interface CustomFieldProps {
	field: FieldInputProps<string>
	form: {
		errors: FormikErrors<Values>
		touched: FormikTouched<Values>
	}
}

const RegisterPage = () => {
	const initialValues = {
		firstName: '',
		surname: '',
		password: '',
		email: '',
		phoneNumber: 0,
	}

	return (
		<div>
			<div className=''>
				<Logo />
				<Heading size='md'>Register</Heading>

				<Formik
					initialValues={initialValues}
					onSubmit={(
						values: Values,
						{ setSubmitting }: FormikHelpers<Values>
					) => {
						console.log(values)
						setSubmitting(false)
					}}
				>
					{(props) => (
						<Form>
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
											<FormErrorMessage>
												{form.errors.firstName}
											</FormErrorMessage>
										</InputGroup>
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
									</FormControl>
								)}
							</Field>

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
									</FormControl>
								)}
							</Field>

							<Button
								mt={4}
								colorScheme='teal'
								isLoading={props.isSubmitting}
								type='submit'
							>
								Submit
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default RegisterPage
