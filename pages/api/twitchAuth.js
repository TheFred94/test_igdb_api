// twitchAuth.js

import axios from "axios";

const CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_TWITCH_SECRET;

const getToken = async () => {
  try {
    const response = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
      null, // Use null as the data
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "client_credentials",
        },
      }
    );

    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get Twitch access token");
  }
};

export default getToken;
