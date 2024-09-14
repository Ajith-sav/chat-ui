import React from 'react';
import { useChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/SideDrawer';

const ChatPage = () => {
  const { user } = useChatState();
  return (
    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Box>
        {/* {user && <MyChats/>}
        {user && <ChatBox/>} */}
      </Box>
    </div>
  );
};

export default ChatPage;
