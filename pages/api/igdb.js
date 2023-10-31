import getToken from "./twitchAuth";
import axios from "axios";
const handler = async (req, res) => {
  try {
    const tokenData = await getToken();

    if (!tokenData || !tokenData.access_token) {
      res.status(500).json({ error: "Failed to retrieve access token" });
      return;
    }

    const accessToken = tokenData.access_token;
    console.log(accessToken);

    // Now, you have the access token, and you can use it to make a request to the IGDB API.
    const igdbResponse = await axios.post(
      "https://api.igdb.com/v4/games",
      null, // Use null as the data
      {
        headers: {
          "Client-ID": process.env.NEXT_PUBLIC_TWITCH_ID,
          Authorization: `Bearer ${accessToken}`,
          Body: "fields *;",
        },
      }
    );

    // Handle the IGDB API response as needed and send it back to the client.
    res.status(200).json(igdbResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
