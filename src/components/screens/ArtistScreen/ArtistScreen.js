import {
    Heading,
    HStack,
    Avatar, Box,
    VStack,
    Button,
    Spacer,
    Skeleton,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react';
import {useContext, useEffect, useState} from 'react';
import SpotifyContext from '../../../context/SpotifyContext';
import {useHistory, useParams} from 'react-router';
import {ChevronLeftIcon} from '@chakra-ui/icons';

function TrackRow({ track, index }) {
    const {
        name,
        type,
        albumMetadata
    } = track;

    const {
        name: albumName,
        release_date,
        momentDate
    } = albumMetadata;

    return (
        <Tr>
            <Td color={'gray.500'}>{index + 1}.</Td>
            <Td>{name}</Td>
            <Td color={'gray.500'}>{albumName}</Td>
            <Td>{release_date}</Td>
        </Tr>
    );
}
function ArtistScreen() {
    const { id } = useParams();

    const {
        getArtist,
        checkSession,
        getTracks
    } = useContext(SpotifyContext);
    const history = useHistory();


    const [artist, setArtist] = useState(null);
    const [tracks, setTracks] = useState(null);

    const loadArtistInfo = async (_id) => {
        const artistData = await getArtist(_id);

        if (!artistData) {
            checkSession();
            history.push('/');
            return;
        }

        setArtist(artistData);

        // Load the artist tracks
        const tracks = await getTracks(_id);
        setTracks(tracks);
    };

    useEffect(() => {
        loadArtistInfo(id);
    }, [id]);


    if (!artist) {
        return (
            <VStack align={'stretch'}>
                <Box align={'right'} color={'gray.500'}>
                    <Button size='sm' onClick={() => history.push('/')} variant={'minimal'}><ChevronLeftIcon mr={2}/> Back to Search</Button>
                </Box>
                <Box borderRadius={'5px'} bg={'gray.700'} boxShadow={'dark-lg'} overflow='hidden' mb={2} p={2}>
                    <HStack p={2} align={'top'}>
                        <Skeleton>
                            <Avatar borderRadius={5} size={'2xl'} mr={4}/>
                        </Skeleton>
                        <Skeleton h={8}>
                            <Heading color={'gray.300'}>Artist Name</Heading>
                            {tracks !== null && (
                                <Text>{tracks.length} tracks</Text>
                            )}
                        </Skeleton>
                        <Spacer />
                    </HStack>
                </Box>
            </VStack>
        )
    }

    const {
        name,
        images
    } = artist;

    return (
        <VStack align={'stretch'}>
            <Box align={'right'} color={'gray.500'}>
                <Button size='sm' onClick={() => history.push('/')} variant={'minimal'}><ChevronLeftIcon mr={2}/> Back to Search</Button>
            </Box>
            <Box borderRadius={'5px'} bg={'gray.700'} boxShadow={'dark-lg'} overflow='hidden' mb={2} p={2}>
                <HStack p={2} align={'top'}>
                    <Avatar src={images.length > 0 ? images[0].url : null} name={name} borderRadius={5} size={'2xl'} mr={4} bg={'gray.500'}/>
                    <Heading color={'gray.300'}>{name}</Heading>
                    <Spacer />
                </HStack>
            </Box>
            <Box borderRadius={'5px'} bg={'gray.700'} boxShadow={'dark-lg'} overflow='hidden' mb={2} p={5}>
                <Heading size={'sm'} color={'gray.300'}>Artist Timeline</Heading>
                <Spacer />
                <Table size="sm" mt={4}>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Track Name</Th>
                            <Th >Album</Th>
                            <Th minW={'150px'}>Release Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tracks !== null ? tracks.map((track, i) => <TrackRow track={track} index={i}/>)
                            : (
                                <>
                                    <Tr>
                                        <Td><Skeleton>1</Skeleton></Td>
                                        <Td><Skeleton>Test Test Test</Skeleton></Td>
                                        <Td><Skeleton>Test Test</Skeleton></Td>
                                        <Td><Skeleton>Test</Skeleton></Td>
                                    </Tr>
                                    <Tr>
                                        <Td><Skeleton>1</Skeleton></Td>
                                        <Td><Skeleton>Test Test Test</Skeleton></Td>
                                        <Td><Skeleton>Test Test</Skeleton></Td>
                                        <Td><Skeleton>Test</Skeleton></Td>
                                    </Tr>
                                    <Tr>
                                        <Td><Skeleton>1</Skeleton></Td>
                                        <Td><Skeleton>Test Test Test</Skeleton></Td>
                                        <Td><Skeleton>Test Test</Skeleton></Td>
                                        <Td><Skeleton>Test</Skeleton></Td>
                                    </Tr>
                                    <Tr>
                                        <Td><Skeleton>1</Skeleton></Td>
                                        <Td><Skeleton>Test Test Test</Skeleton></Td>
                                        <Td><Skeleton>Test Test</Skeleton></Td>
                                        <Td><Skeleton>Test</Skeleton></Td>
                                    </Tr>
                                </>
                            )}
                    </Tbody>
                </Table>
            </Box>
        </VStack>
    );
}

export default ArtistScreen;
