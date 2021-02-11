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
    Checkbox, Stack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
    Divider
} from '@chakra-ui/react';
import {useContext, useEffect, useState} from 'react';
import SpotifyContext from '../../../context/SpotifyContext';
import {useHistory, useParams} from 'react-router';
import {ChevronDownIcon, ChevronLeftIcon} from '@chakra-ui/icons';
import {Container} from '@chakra-ui/layout';

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
            <Td pl={0}>{name}</Td>
            <Td color={'gray.500'}>{albumName}</Td>
            <Td pr={0}>{release_date}</Td>
        </Tr>
    );
}
function ArtistScreen() {
    const { id } = useParams();

    const {
        getArtist,
        checkSession,
        getTracks,
        createSpotifyPlaylist,
        creatingSpotifyPlaylist
    } = useContext(SpotifyContext);
    const history = useHistory();


    const [artist, setArtist] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [showAlbums, setShowAlbums] = useState(true);
    const [showSingles, setShowSingles] = useState(true);
    const [sortOrder, setSortOrder] = useState('Oldest First');

    const loadArtistInfo = async (_id) => {
        const artistData = await getArtist(_id);

        if (!artistData) {
            checkSession();
            history.push('/');
            return;
        }

        setArtist(artistData);
    };

    const loadTrackInfo = async (_id, filter) => {
        // Load the artist tracks
        const tracks = await getTracks(_id, filter);
        setTracks(tracks);
    }

    useEffect(() => {
        let filter = '';
        if (showAlbums && showSingles) {
            filter='album,single'
        } else if (showAlbums) {
            filter='album'
        } else if (showSingles) {
            filter='single'
        }
        loadTrackInfo(id, filter);
    }, [id, showAlbums, showSingles]);


    useEffect(() => {
        loadArtistInfo(id);
    }, [id]);

    const hasTracks = tracks !== null && tracks.length > 0;

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
                <Stack direction={["column", "column", "row"]} justify="stretch" align="stretch" p={2}>
                    <HStack align={'top'}>
                        <Avatar src={images.length > 0 ? images[0].url : null} name={name} borderRadius={5} size={'xl'} mr={4} bg={'gray.500'}/>
                        <VStack justify={'center'} align={'start'}>
                            <Heading color={'gray.300'}>{name}</Heading>
                            <Text color={'gray.500'}>{tracks !== null ? `${tracks.length} tracks` : 'Loading tracks...'}</Text>
                        </VStack>
                        <Spacer />
                    </HStack>
                    <Spacer />
                    <Button colorScheme={'green'} onClick={() => {
                        createSpotifyPlaylist(tracks, `Artist Timeline: ${artist.name} // Timelineify`);
                    }}
                            disabled={creatingSpotifyPlaylist}
                    >Save Timeline as Playlist</Button>
                </Stack>
            </Box>
            <Box borderRadius={'5px'} bg={'gray.700'} boxShadow={'dark-lg'} overflow='hidden' mb={2} p={5}>
                <Stack direction={["column", "column", "row"]} justify="stretch" align="center">
                    <Heading size={'sm'} color={'gray.300'} mr={3}>Artist Timeline</Heading>
                    <Spacer />
                    <HStack>
                        <Checkbox size={'sm'} isChecked={showAlbums} onChange={() => setShowAlbums(!showAlbums)}>Albums</Checkbox>
                        <Checkbox size={'sm'} isChecked={showSingles} onChange={() => setShowSingles(!showSingles)}>Singles</Checkbox>
                        <Menu>
                            <MenuButton size={'sm'} variant={'minimal'} as={Button} rightIcon={<ChevronDownIcon />}>
                                {sortOrder}
                            </MenuButton>
                            <Spacer />
                            <MenuList>
                                <MenuItem onClick={() => setSortOrder('Oldest First')}>Oldest First</MenuItem>
                                <MenuItem onClick={() => setSortOrder('Newest First')}>Newest First</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                </Stack>
                <Divider mt={4} mb={4}/>
                <Spacer />
                <Table size="sm" mt={4}>
                    <Thead>
                        <Tr>
                            <Th pl={0}>Track Name</Th>
                            <Th>Album</Th>
                            <Th minW={'150px'} pr={0}>Release Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tracks !== null ? tracks.map((track, i) => <TrackRow track={track} index={i}/>)
                            : (
                                <>
                                    <Tr>
                                        <Td pl={0}><Skeleton>1</Skeleton></Td>
                                        <Td><Skeleton>Test Test Test</Skeleton></Td>
                                        <Td pr={0}><Skeleton>Test</Skeleton></Td>
                                    </Tr>
                                    <Tr>
                                        <Td pl={0}><Skeleton>1</Skeleton></Td>
                                        <Td><Skeleton>Test Test Test</Skeleton></Td>
                                        <Td pr={0}><Skeleton>Test</Skeleton></Td>
                                    </Tr>
                                    <Tr>
                                        <Td pl={0}><Skeleton>1</Skeleton></Td>
                                        <Td><Skeleton>Test Test Test</Skeleton></Td>
                                        <Td pr={0}><Skeleton>Test</Skeleton></Td>
                                    </Tr>
                                    <Tr>
                                        <Td pl={0}><Skeleton>1</Skeleton></Td>
                                        <Td><Skeleton>Test Test Test</Skeleton></Td>
                                        <Td pr={0}><Skeleton>Test</Skeleton></Td>
                                    </Tr>
                                </>
                            )}
                        {(tracks !== null && tracks.length === 0) && (

                            <Tr>
                                <Td colspan={3} pl={0} pr={0}>No tracks were found with this filter.</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </Box>
        </VStack>
    );
}

export default ArtistScreen;
