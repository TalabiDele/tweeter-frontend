import {
	Box,
	Button,
	Card,
	Flex,
	Heading,
	Image,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Stack,
	StackDivider,
	Text,
	Textarea,
	useDisclosure,
	Icon,
	Portal,
} from '@chakra-ui/react'
import userImg from '../assets/userImage.jpg'
import { FaRegImage } from 'react-icons/fa'
import { FaGlobeAmericas } from 'react-icons/fa'

const TweetInput = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<div>
			<Card maxW={'50vw'} margin={'2rem auto'} padding={'1rem'}>
				<Stack divider={<StackDivider />} spacing={'3'}>
					<Heading size={'sm'} fontWeight={'500'}>
						Tweet something
					</Heading>
					<Flex>
						<Image
							src={userImg}
							alt=''
							height={'3rem'}
							width={'3rem'}
							objectFit={'contain'}
							rounded={'full'}
						/>
						<Box marginLeft={'1rem'} width={'full'}>
							<Textarea
								// value={value}
								// onChange={handleInputChange}
								placeholder="What's happening?"
								size='sm'
								variant={'unstyled'}
								marginBottom={'1rem'}
								resize={'none'}
							/>
							<Popover
								returnFocusOnClose={false}
								isOpen={isOpen}
								onOpen={onOpen}
								onClose={onClose}
								placement='bottom'
								closeOnBlur={false}
							>
								<Flex alignItems={'center'} justifyContent={'space-between'}>
									<Flex alignItems={'center'} gap={'3'} color={'#2F80ED'}>
										<Icon as={FaRegImage} cursor={'pointer'} />
										<PopoverTrigger>
											<Icon as={FaGlobeAmericas} cursor={'pointer'} />
										</PopoverTrigger>
										<Portal>
											<PopoverContent>
												<PopoverHeader fontWeight='semibold'>
													Confirmation
												</PopoverHeader>
												<PopoverBody>
													Are you sure you want to continue with your action?
												</PopoverBody>
											</PopoverContent>
										</Portal>
										<Text>Everyone can reply</Text>
									</Flex>

									<Button colorScheme='blue'>Tweet</Button>
								</Flex>
							</Popover>
						</Box>
					</Flex>
				</Stack>
			</Card>
		</div>
	)
}

export default TweetInput
