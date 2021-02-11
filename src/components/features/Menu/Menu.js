import {
    Flex,
    Box,
    Heading,
    Spacer,
    Button,
    Avatar,
    AvatarBadge,
    AvatarGroup,
    HStack,
    Text
} from '@chakra-ui/react';
import {BrowserRouter, Link} from 'react-router-dom';
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
            <Container maxW={"1000px"}>
                <Flex justify="center" align="center" mt={10} mb={10}>
                    <Link to="/">
                        <Heading size="lg">Timelineify 🎧</Heading>
                    </Link>
                    <Spacer />
                    {loggedIn && (
                        <>
                            <UserAvatar userData={userData} />
                            <Button colorScheme="green" onClick={() => {
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
                </Flex>
            </Container>
        </Box>
    );
}

export default Menu;
