import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useMyContext } from "@/Context/userInfo/UserInfoContext";

const MapSearchBox = ({ label, onData, wi }) => {
  const {} = useMyContext();
  const [searchText, setSearchText] = useState(null);
  const [options, setOptions] = useState([]);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");

  const handleSearch = (text) => {
    if (text) {
      // Replace 'YOUR_MAPBOX_ACCESS_TOKEN' with your actual Mapbox access token
      const mapboxAccessToken =
        "pk.eyJ1IjoiaHJwaXBhbGl5YSIsImEiOiJjbGxhcHc4bGgxdDA1M2Rta2trMWpzOGIwIn0.f7dxbVAqITPMkxSho7mNLQ";
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?country=IN&access_token=${mapboxAccessToken}`;

      axios
        .get(endpoint)
        .then((response) => {
          const places = response.data.features.map((place) => ({
            label: place.place_name,
            coordinates: place.geometry.coordinates,
          }));
          setOptions(places);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setOptions([]);
    }
  };

  const handleSelect = (event, value) => {
    if (value) {
      // Get the coordinates of the selected place
      const { coordinates, label } = value;
      onData({ coordinates, label });

      // You can perform actions with the selected place and coordinates here
    }
  };

  return (
    <Autocomplete
      id="search-box"
      sx={{ width: wi }}
      options={options}
      getOptionLabel={(option) => option.label}
      autoComplete
      includeInputInList
      filterSelectedOptions
      isOptionEqualToValue={(option, value) => option.label === value.label}
      onInputChange={(event, newInputValue) => {
        setSearchText(newInputValue);
        handleSearch(newInputValue);
        const data = newInputValue;
        // onData(data);
      }}
      onChange={handleSelect}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default MapSearchBox;
