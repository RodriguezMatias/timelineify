import {
    Flex,
    Box,
    Heading,
    Spacer,
    Button,
    Avatar,
    HStack,
    Text,
    Stack
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {Container} from '@chakra-ui/layout';
import {useContext} from 'react';
import SpotifyContext from '../../../context/SpotifyContext';

function UserAvatar({ userData }) {
    const {
        images,
        display_name
    } = userData;

    return (
        <HStack mr={4}>
            <Avatar size="sm" name={display_name} src={images.length > 0 ? images[0].url : ''} />
            <Text fontSize="lg">{display_name}</Text>
        </HStack>
    );
}

function Menu() {
    const {
        startLogin,
        userData,
        loggedIn,
        logout
    } = useContext(SpotifyContext);

    return (
        <Box flex="0 0 auto" bg="gray.900" mt={"5px"} mb={10}>
            <Container maxW={"1000px"} pl={5} pr={5}>
                <Stack direction={["column", "column", "row"]} spacing={3} justify="stretch" align="center" mt={10} mb={10}>
                    <Link to="/">
                        <Heading size="lg">Timelineify 🎧</Heading>
                    </Link>
                    <Spacer />
                    <HStack align={'center'} justify={'end'}>
                        <Spacer />
                    {loggedIn && (
                        <>
                            <UserAvatar userData={userData} />
                            <Button variant='outline' onClick={() => {
                                logout();
                            }}>
                                Log out
                            </Button>
                        </>
                    )}
                    {!loggedIn && (
                        <Button colorScheme="green" onClick={() => {
                            startLogin();
                        }}>
                            Log in with Spotify
                        </Button>
                    )}
                    </HStack>
                </Stack>
            </Container>
        </Box>
    );
}

export default Menu;
