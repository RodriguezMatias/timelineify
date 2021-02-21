import {
    Heading,
    Input,
    Text,
    Button,
    VStack,
    SimpleGrid,
    Box,
    HStack,
    Avatar,
    Spinner
} from '@chakra-ui/react';
import {InputGroup, InputRightElement} from '@chakra-ui/input';
import {ChevronRightIcon} from '@chakra-ui/icons';
import {useContext, useEffect, useState} from 'react';
import SpotifyContext from '../../../context/SpotifyContext';
import {useThrottle} from 'react-use';
import {useHistory} from 'react-router';

function ArtistRow({ artist }) {
    const {
        id,
        images,
        name
    } = artist;

    const history = useHistory();

    return (
        <Box borderRadius={'5px'} bg={'gray.700'} boxShadow={'dark-lg'} overflow='hidden' mb={2} onClick={() => {
            history.push(`/artist/${id}`);
        }}
             cursor={'pointer'}
        >
            <HStack p={0} align={'center'}>
                <Avatar src={images.length > 0 ? images[0].url : null} name={name} borderRadius={0} size={'lg'}/>

                <HStack p={2} align={'center'}>
                    <Text color={'gray.300'}>{name} <ChevronRightIcon /></Text>
                </HStack>
            </HStack>
        </Box>
    )
}

function SearchScreen() {
    const {
        startLogin,
        userData,
        loggedIn,
        logout,
        search
    } = useContext(SpotifyContext);

    const [value, setValue] = useState("");
    const throttledValue = useThrottle(value, 1000);
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const doSearch = async () => {
        setLoading(true);
        const searchResult = await search(value);
        setSearchResults(searchResult);
        setLoading(false);
    }
    useEffect(() => {
        if (throttledValue && throttledValue.length > 0) {
            doSearch(throttledValue);
        } else {
            setSearchResults(null);
        }
    }, [throttledValue])

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
                            <Text fontSize="sm" color="gray.500">We don't store your login info anywhere, or collect any information about your searches. Timelineify is contained in your browser.</Text>
                        </VStack>
                    </SimpleGrid>
                    <Heading mt={4} size="md" color="gray.500" mb={3}>Demo Video</Heading>
                    <iframe frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"width="788.54" height="443"
                        type="text/html"
                        src="https://www.youtube.com/embed/G603-ruJ3YQ?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0">
                    </iframe>
                </>
            )}
            {loggedIn && (
                <>
                    <Heading mt={4} size="md" color="gray.200">Search for an Artist...</Heading>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        doSearch();
                    }}>
                        <InputGroup size="lg" mt={4} mb={4}  boxShadow={'dark-lg'}>
                            <Input placeholder="Rick Astley" borderWidth={2} borderColor="gray.500"
                                   value={value}
                                   onChange={(event) => setValue(event.target.value)} />
                            {searchResults && (
                                <InputRightElement width="8rem">
                                    <Button h="1.75rem" size="sm" onClick={() => {
                                        setValue("");
                                        setSearchResults(null);
                                    }}>
                                        Clear Results
                                    </Button>
                                </InputRightElement>
                            )}
                        </InputGroup>
                    </form>
                    {searchResults && (
                        <HStack ml={5} mb={4} >
                            {loading && (
                                <Spinner size={'sm'} mr={0} color={'gray.500'}/>
                            )}
                            <Text align="left" color={'gray.500'}>
                                {searchResults.artists.items.length} artist{searchResults.artists.items.length > 1 ? 's' : ''} found
                            </Text>
                        </HStack>
                    )}
                    <VStack align="stretch">
                        {searchResults && searchResults.artists.items.map((artist) => (
                            <ArtistRow artist={artist} />
                        ))}
                    </VStack>
                </>
            )}
        </>
    );
}

export default SearchScreen;
