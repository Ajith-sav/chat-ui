import React, { useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
  } from "@chakra-ui/react";

const Login = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleClick = () => setShow(!show) 
  const submitHandler = () => {}

  return <>
  <VStack spacing={"5px"}>
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
            type={show ? "text" : "password"}
              placeholder="Enter your Password."
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <InputRightElement width={"4.5rem"}>
              <Button h="1.75rem" size={"sm"} onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        >
            Login
        </Button>
        <Button
        variant={"solid"}
        colorScheme="red"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={()=>{
            setEmail("guest@email.com");
            setPassword("guest@1")
        }}
        >
            Get Guest User Credentials
        </Button>
      </VStack>
  </>;
};

export default Login;
