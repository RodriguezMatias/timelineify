import {
    Heading,
    Input,
    Text,
    Button,
    VStack,
    SimpleGrid
} from '@chakra-ui/react';
import {InputGroup, InputRightElement} from '@chakra-ui/input';
import {Search2Icon} from '@chakra-ui/icons';
import {useContext} from 'react';
import SpotifyContext from '../../../context/SpotifyContext';

function SearchScreen() {
    const {
        startLogin,
        userData,
        loggedIn,
        logout
    } = useContext(SpotifyContext);

    return (
        <>
            {!loggedIn && (
                <>
                    <Heading mt={4} size="md" color="gray.500">What?</Heading>
                    <Text mt={1} fontSize="lg">Create a playlist containing a Spotify artist's discography in chronological order.</Text >
                    <Heading mt={4} size="md" color="gray.500">Why?</Heading>
                    <Text mt={1} fontSize="lg">
                        Spotify messes with the order of albums & singles, making it impossible to hear an artist's works in the order they were released without creating a playlist by hand.<br/><br />
                        "If all you have is a hammer, everything looks like a nail"... 10 hours later, here we are. 😀
                    </Text >
                    <Heading mt={4} size="md" color="gray.500">How?</Heading>
                    <SimpleGrid columns={[1, null, 2]}>
                        <VStack align="stretch">
                            <Button mt={3} mb={1} onClick={startLogin}>Log in with Spotify to get started</Button>
                            <Text fontSize="sm" color="gray.500">We don't store your login info anywhere, or collect any information. Timelineify is contained in your browser.</Text>
                        </VStack>
                    </SimpleGrid>
                </>
            )}
            {loggedIn && (
                <>
                    <Heading mt={4} size="md" color="gray.200">Search for an Artist...</Heading>
                    <InputGroup size="lg">
                        <Input size="lg" mt={4} mb={4} placeholder="Rick Astley" borderWidth={2} borderColor="gray.500"/>
                    </InputGroup>
                </>
            )}
        </>
    );
}

export default SearchScreen;
