import {
    Box, SlideFade, Stack,
} from '@chakra-ui/react';
import {Container, Flex, LinkBox, LinkOverlay, SimpleGrid, Spacer} from '@chakra-ui/layout';
import {Alert, AlertDescription, AlertIcon} from '@chakra-ui/alert';
import {CloseButton} from '@chakra-ui/close-button';
import {useState} from 'react';
import {Image} from '@chakra-ui/image';

function Footer() {

    const [alertVisible, setAlertVisible] = useState(true);
    return (
        <>
            <Box flex="0 0 auto" bg="gray.900">
                <Container flex="0 0 auto" maxW={"1000px"} pl={5} pr={5}>
                        <LinkBox mt={10} mb={4} p={5} borderRadius={'5px'} bg={'gray.700'} boxShadow={'dark-lg'} cursor="pointer" fontSize={16}>
                            <LinkOverlay href="https://www.buymeacoffee.com/chrisdalke" target="_blank">

                                <Stack direction={["column", "row", "row"]} spacing={3} justify="stretch" align="flex-start">
                                <div>
                                    Timelineify is free because of your support!<br />
                                    ☕<b>Like it? Buy me a coffee!</b>
                                </div>
                                    <Spacer />
                                <Image
                                    height="100px"
                                    borderRadius={5}
                                    src="https://img.buymeacoffee.com/api/?url=aHR0cHM6Ly9pbWcuYnV5bWVhY29mZmVlLmNvbS9hcGkvP3VybD1hSFIwY0hNNkx5OWpaRzR1WW5WNWJXVmhZMjltWm1WbExtTnZiUzkxY0d4dllXUnpMM0J5YjJacGJHVmZjR2xqZEhWeVpYTXZNakF5TVM4d05DOWtaRGt6TVRNMlltVXlaR014TTJJeE1UazVOakl3TW1JeE5EY3pZbVpoTnk1cWNHYz0mc2l6ZT0zMDAmbmFtZT1DaHJpcytEYWxrZQ==&creator=Chris+Dalke&is_creating=building%20web%20applications,%20data%20visualization%20tools,%20and%20whatever%20else&design_code=1&design_color=%235F7FFF&slug=chrisdalke" />


                                </Stack>
                                </LinkOverlay>
                        </LinkBox>
                </Container>
            </Box>
        <Box flex="0 0 auto" bg="gray.900">
            <Container maxW={"1000px"} mb={6} mt={6} pl={7} pr={7}>
                <Flex align='center'>
                    <Box color={"gray.600"} mr={3}>
                        Built by Chris Dalke &middot; <a href="https://github.com/chrisdalke">github.com/chrisdalke</a>
                    </Box>
                    <Spacer />
                    <Box>
                        <a
                            href="https://www.producthunt.com/posts/timelineify?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-timelineify"
                            target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=286264&theme=dark"
                                                 alt="Timelineify - Create Spotify playlists of an artist's full discography | Product Hunt"
                                                 style={{
                                                     width: '250px',
                                                     height: '54px'
                                                 }}
                                                 width="250"
                                                 height="54" /></a>
                    </Box>
                </Flex>
            </Container>
        </Box>

            </>
    );
}

export default Footer;
