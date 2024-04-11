'use client'
import { TextInput, Button, Group, Box,Text,Notification } from "@mantine/core";



import { useState,useEffect } from "react";
import axios from "axios";

const Registration :React.FC = ()=> {
  const [isValid, setValid] = useState(true);
  const [isUrl, setUrl] = useState(true);
  const [isUserCreated,setCreated]= useState(false) ;
  const [isError,setError] = useState(false) ;
  const [userEmail, setUserEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

   



  const handleEmail = (e: { target: { value: string } }) => {
    const email = e.target.value;
    setUserEmail(email);
    setValid(validateEmail(email));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUrl = (e: { target: { value: string } }) => {
    const url = e.target.value;
    setAvatarUrl(url);
    setUrl(checkUrl(url));
  };
  const checkUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const createUser = () => {
    try {

      if(userEmail == "" && avatarUrl ==""){
         setError(true) ;
      }else{

         axios
           .post(
             "https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users",
             { email:userEmail,avatar:avatarUrl },
             {
               headers: {
                 "Content-Type": "application/json",
               },
             }
           )
           .then((res) => {
             if(res.status == 201)
               setCreated(true);
           });
      

      }
       
    } catch (error) {

      
       
    }
  
  };

  return (
    <Box maw={340} mx="auto">
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: "blue", to: "pink", deg: 90 }}
        style={{ textAlign: "center" }}
      >
        User Creation Form
      </Text>
      <TextInput
        label="Email"
        placeholder="Email"
        onChange={handleEmail}
        value={userEmail}
        error={!isValid}
      />
      <TextInput
        mt="md"
        label="Avatar Url"
        placeholder="Avatar Url"
        value={avatarUrl}
        onChange={handleUrl}
        error={!isUrl}
      />

      <Group justify="center" mt="xl">
        <Button onClick={createUser}>Create New User</Button>
      </Group>
      {isUserCreated && (
        <Notification
          color="green"
          title="Success"
          onClose={() => setCreated(false)}
        >
          User Created Successfully
        </Notification>
      )}
      {isError && (
        <Notification
          color="red"
          title="Error"
          onClose={() => setError(false)}
        >
          Please Fill the Full Form
        </Notification>
      )}
    </Box>
  );
}
export default Registration ;
