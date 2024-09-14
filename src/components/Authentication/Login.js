import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axiosBaseUrl from '../../config/axiosUrl';

const Login = () => {
  const [show, setShow] = useState(false);
  // const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please Fill all the Field',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axiosBaseUrl.post(
        '/api/user/login',
        { email, password },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));

      setLoading(false);

      navigate('/chats');
    } catch (error) {
      toast({
        title: 'Error in SignUp',
        description: `${error}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
    }
  };

  const guest = () => {
    setEmail('guest@email.com');
    setPassword('guest@1');
  };

  return (
    <>
      <VStack spacing={'5px'}>
        {/* <FormControl id="username" isRequired>
          <FormLabel>User Name</FormLabel>
          <Input
            placeholder="Enter your name."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl> */}

        <FormControl id="email" isRequired>
          <FormLabel>E-mail</FormLabel>
          <Input
            placeholder="Enter your email."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>

        <FormControl id="Password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              placeholder="Enter your Password."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <InputRightElement width={'4.5rem'}>
              <Button h="1.75rem" size={'sm'} onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="blue"
          width={'100%'}
          style={{ marginTop: 15 }}
          isLoading={loading}
          onClick={submitHandler}
        >
          Login
        </Button>
        <Button
          variant={'solid'}
          colorScheme="red"
          width={'100%'}
          style={{ marginTop: 15 }}
          isLoading={loading}
          onClick={guest}
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </>
  );
};

export default Login;
