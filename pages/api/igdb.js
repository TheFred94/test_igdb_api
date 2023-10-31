import getToken from "./twitchAuth";

const handler = async (req, res) => {
  try {
    const tokenData = await getToken();

    if (!tokenData || !tokenData.access_token) {
      res.status(500).json({ error: "Failed to retrieve access token" });
      return;
    }

    const accessToken = tokenData.access_token;
    console.log(accessToken);

    // Now, you have the access token, and you can use it to make a request to the IGDB API using the fetch function.
    const igdbResponse = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.NEXT_PUBLIC_TWITCH_ID,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;",
    });

    if (!igdbResponse.ok) {
      throw new Error("Failed to fetch data from IGDB API");
    }

    // Parse the response as JSON and send it back to the client.
    const igdbData = await igdbResponse.json();
    res.status(200).json(igdbData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
