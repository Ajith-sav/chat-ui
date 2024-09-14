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
import axios from 'axios';
import axiosBaseUrl from '../../config/axiosUrl';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [profilePic, setProfilePic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    if (pics.type !== 'image/jpeg' && pics.type !== 'image/png') {
      toast({
        title: 'Please Select a JPEG or PNG Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
      return;
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'chat-pic');
      data.append('cloud_name', 'dpmeh2fxo');
      axios
        .post('https://api.cloudinary.com/v1_1/dpmeh2fxo/image/upload', data)
        .then((response) => {
          console.log('Cloudinary response:', response);
          setProfilePic(response.data.url.toString());
          setLoading(false);
          toast({
            title: 'Image uploaded successfully!',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top',
          });
        })
        .catch((error) => {
          console.log('Cloudinary error:', error);
          setLoading(false);
        });
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast({
        title: 'Password Do Not Match',
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
        '/api/user',
        { name, email, password, profilePic },
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

  return (
    <>
      <VStack spacing={'5px'}>
        <FormControl id="username" isRequired>
          <FormLabel>User Name</FormLabel>
          <Input
            placeholder="Enter your name."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel>E-mail</FormLabel>
          <Input
            placeholder="Enter your email."
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

        <FormControl id="ConfirmPassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              placeholder="Re-enter your Password."
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <InputRightElement width={'4.5rem'}>
              <Button h="1.75rem" size={'sm'} onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="Profile">
          <FormLabel>Upload your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => {
              postDetails(e.target.files[0]);
            }}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          width={'100%'}
          style={{ marginBottom: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Sign Up
        </Button>
      </VStack>
    </>
  );
};

export default SignUp;
