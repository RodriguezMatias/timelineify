import {
    Flex,
    Box,
    Heading,
    Spacer,
    Button
} from '@chakra-ui/react';
import {Container, List, SimpleGrid, VStack} from '@chakra-ui/layout';
import {BrowserRouter, Link} from 'react-router-dom';

function Footer() {
    return (
        <Box flex="0 0 auto" bg="gray.900">
            <Container maxW={"1000px"} mb={5} mt={5}>
                <SimpleGrid columns={1}>
                    <Box color={"gray.600"}>
                        Built by Chris Dalke &middot; <a href="https://github.com/chrisdalke">github.com/chrisdalke</a>
                    </Box>
                </SimpleGrid>
            </Container>
        </Box>
    );
}

export default Footer;
