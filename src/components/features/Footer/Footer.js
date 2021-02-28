import {
    Box
} from '@chakra-ui/react';
import {Container, Flex, SimpleGrid, Spacer} from '@chakra-ui/layout';

function Footer() {
    return (
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
    );
}

export default Footer;
