import {
    Heading,
    Spinner,
    HStack,
    Text, Avatar, Box,
    VStack,
    Button,
    Spacer,
    Skeleton
} from '@chakra-ui/react';
import {useContext, useEffect, useState} from 'react';
import SpotifyContext from '../../../context/SpotifyContext';
import {useHistory, useParams} from 'react-router';
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';

function ArtistScreen() {
    const { id } = useParams();

    const {
        getArtist,
        checkSession
    } = useContext(SpotifyContext);
    const history = useHistory();


    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState(null);

    const loadArtistInfo = async (_id) => {
        const artistData = await getArtist(_id);

        if (!artistData) {
            checkSession();
            history.push('/');
            return;
        }

        setArtist(artistData);
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
                <Heading size={'sm'} color={'gray.300'}>Timeline</Heading>
                <Spacer />
            </Box>
        </VStack>
    );
}

export default ArtistScreen;
