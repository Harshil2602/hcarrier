import React, { useState, useEffect, useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import debounce from "lodash/debounce";
import axios from "axios";
import { useMyContext } from "@/Context/userInfo/UserInfoContext";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiaHJwaXBhbGl5YSIsImEiOiJjbGxhcHc4bGgxdDA1M2Rta2trMWpzOGIwIn0.f7dxbVAqITPMkxSho7mNLQ"; // Replace with your Mapbox access token

const geocodingService = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    access_token: MAPBOX_ACCESS_TOKEN,
  },
});

export default function AutoFill({ label, onData }) {
  const { dAddress, setdAddress, pAddress, setpAddress } = useMyContext();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const fetch = useMemo(
    () =>
      debounce((input, callback) => {
        geocodingService
          .get("/geocoding/v5/mapbox.places/" + input + ".json", {
            params: {
              country: "IN",
              types: "place",
              limit: 10,
            },
          })
          .then((response) => {
            const features = response.data.features;

            callback(features);
          })
          .catch((error) => {
            console.error("Error fetching locations:", error);
            callback([]);
          });
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(inputValue, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="mapbox-autocomplete"
      options={options}
      getOptionLabel={(option) => option.place_name}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        const data = newValue.place_name;
        onData(data);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      // {...(label == "Pickup Address" ? setpAddress(value) : setdAddress(value))}
      renderInput={(params) => <TextField {...params} label={label} />}
      renderOption={(props, option) => {
        const parts = parse(option.place_name, []);
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Typography
                    key={index}
                    component="span"
                    variant="body2"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
