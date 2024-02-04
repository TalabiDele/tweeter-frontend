import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/tweeter_logo.png'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import userImg from '../assets/userImage.jpg'
// import { useAppDispatch } from '../store/store'
import { useSelector } from 'react-redux'
import { FaCaretDown } from 'react-icons/fa'

interface UserValues {
	id: number
	bio: string
	email: string
	username: string
	createdAt: string
	firstname: string
	surname: string
}

const Nav = () => {
	// const dispatch = useAppDispatch()
	const location = useLocation()

	console.log(location.pathname)

	const user = useSelector(
		(state: { user: { data: UserValues | null } }) => state.user.data
	)

	return (
		<Box bgColor={'#fff'}>
			<Flex
				align={'center'}
				justifyContent={'space-between'}
				width={'90%'}
				marginX={'auto'}
				// bgColor={'#fff'}
				height={'5rem'}
			>
				<Image
					src={logo}
					alt=''
					height={'3rem'}
					width={'8rem'}
					objectFit={'contain'}
				/>
				<Flex justify={'space-between'} width={'25rem'}>
					<Link to={'/'}>
						<Box
							justifyContent={'space-between'}
							display={'flex'}
							flexDirection={'column'}
							alignItems={'center'}
							position={'relative'}
							width={'7rem'}
						>
							<Text
								color={location?.pathname === '/' && '#2F80ED'}
								fontWeight={location?.pathname === '/' && '500'}
							>
								Home
							</Text>
							{location?.pathname === '/' && (
								<Box
									bgColor={'#2F80ED'}
									height={'0.3rem'}
									width={'7rem'}
									borderTopRadius={'5px'}
									top={'3rem'}
									position={'absolute'}
								/>
							)}
						</Box>
					</Link>
					<Link to={'/explore'}>
						<Box
							justifyContent={'space-between'}
							display={'flex'}
							flexDirection={'column'}
							alignItems={'center'}
							position={'relative'}
							width={'7rem'}
						>
							<Text
								color={location?.pathname === '/explore' && '#2F80ED'}
								fontWeight={location?.pathname === '/explore' && '500'}
							>
								Explore
							</Text>
							{location?.pathname === '/explore' && (
								<Box
									bgColor={'#2F80ED'}
									height={'0.3rem'}
									width={'7rem'}
									borderTopRadius={'5px'}
									top={'3rem'}
									position={'absolute'}
								/>
							)}
						</Box>
					</Link>
					<Link to={'/bookmarks'}>
						<Box
							justifyContent={'space-between'}
							display={'flex'}
							flexDirection={'column'}
							alignItems={'center'}
							position={'relative'}
							width={'7rem'}
						>
							<Text
								color={location?.pathname === '/bookmarks' && '#2F80ED'}
								fontWeight={location?.pathname === '/bookmarks' && '500'}
							>
								Bookmarks
							</Text>
							{location?.pathname === '/bookmarks' && (
								<Box
									bgColor={'#2F80ED'}
									height={'0.3rem'}
									width={'7rem'}
									borderTopRadius={'5px'}
									top={'3rem'}
									position={'absolute'}
								/>
							)}
						</Box>
					</Link>
				</Flex>

				<Flex align={'center'} gap={'0.5rem'}>
					<Image
						src={userImg}
						alt=''
						rounded={'full'}
						height={'3rem'}
						width={'3rem'}
					/>
					<Text>
						{user?.firstname} {user?.surname}
					</Text>
					<FaCaretDown />
				</Flex>
			</Flex>
		</Box>
	)
}

export default Nav
