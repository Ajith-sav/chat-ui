import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Login from '../components/Authentication/Login';
import SignUp from '../components/Authentication/Signup';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) navigate('/chats');
  });

  return (
    <>
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg={'white'}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="1g"
          borderWidth="1px"
        >
          <Text
            textAlign={'center'}
            fontSize="4xl"
            fontFamily="SUSE"
            sans-serif
            fontWeight={600}
          >
            A-One Chat
          </Text>
        </Box>
        <Box
          bg={'white'}
          w={'100%'}
          p={4}
          borderRadius={'1g'}
          borderWidth={'1px'}
        >
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList mb={'1em'}>
              <Tab width={'50%'}>Login</Tab>
              <Tab width={'50%'}>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
