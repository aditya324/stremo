import { StreamChat } from "stream-chat";

import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("stream api key or secreat is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);

    return userData;
  } catch (error) {
    console.log("error creating stream user", error);
  }
};


export const generateStreamToken = (userId)=>{

  try {
    const userId=userId.toString()
    return streamClient.createToken(userId);
  } catch (error) {
    
    console.log("error creating stream token", error);
  }
}
