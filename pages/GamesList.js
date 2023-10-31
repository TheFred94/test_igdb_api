import React, { useEffect, useState } from "react";

function YourComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/igdb");
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error("API request failed.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      console.log("Data received from the API:", data);
    }
  }, [data]);

  return <div>{/* Your component rendering logic */}</div>;
}

export default YourComponent;
