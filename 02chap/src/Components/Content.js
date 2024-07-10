import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { WeatherFetch } from "../Services/api";
import { useState } from "react";
import { citiesOfTurkey } from "../utils/datas";
import bg from "../Assets/Photos/pexels-brett-sayles-1431822.jpg";

const Content = () => {
  const defaultCity = citiesOfTurkey.find((city) => city.name === "Ankara");

  const [city, setCity] = useState(() => {
    const storedCity = localStorage.getItem("selectedCity");
    return storedCity ? JSON.parse(storedCity) : defaultCity.latitude;
  });

  const [latitude, setLatitude] = useState(defaultCity.latitude);
  const [longitude, setLongitude] = useState(defaultCity.longitude);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [temp, setTemp] = useState("");
  const [des, setDes] = useState("");
  const [nem, setNem] = useState("");
  const [wind, setWind] = useState("");
  const [seaLevel, setSeaLevel] = useState("");
  const [feels, setFeels] = useState("");
  const [days, setDays] = useState({
    list: [
      {
        main: {
          temp: 273,
        },
      },
    ],
  });
  const daysOfWeek = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];
  useEffect(() => {
    localStorage.setItem("selectedCity", JSON.stringify(city));
  }, [city]);

  useEffect(() => {
    WeatherFetch(latitude, longitude, setDays);
  }, []);

  const handleChange = async (e) => {
    const selectedCity = citiesOfTurkey.find(
      (city) => city.latitude === e.target.value
    );
    setCity(e.target.value);
    setLatitude(selectedCity.latitude);
    setLongitude(selectedCity.longitude);
    localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
  };

  useEffect(() => {
    if (latitude !== "" && longitude !== "") {
      console.log({ latitude, longitude });

      const fetchWeather = async () => {
        await WeatherFetch(
          latitude,
          longitude,
          setTemp,
          setDes,
          setNem,
          setFeels,
          setWind,
          setSeaLevel
        );
      };
      fetchWeather();
      WeeklyWeatherFetch(latitude, longitude);
    }
  }, [latitude, longitude]);

  function WeeklyWeatherFetch(lat, lon) {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=054f22eb00ac34df5f998078cb6c63af`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result) {
          const specificDates = [
            "2024-07-10 00:00:00",
            "2024-07-10 03:00:00",
            "2024-07-10 06:00:00",
            "2024-07-10 09:00:00",
            "2024-07-10 12:00:00",
          ];
          console.log(specificDates);

          const filteredData = result.list.filter((item) =>
            specificDates.includes(item.dt_txt)
          );

          console.log(filteredData);
          console.log(filteredData[1].main.temp);
          setDays(filteredData);
        }
      })

      .catch((error) => console.error(error));
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            // backgroundColor: "dodgerblue",
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "900px",
            width: "600px",
            borderRadius: "20px",
            gap: "30px",
          }}
        >
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "dodgerblue",
              borderRadius: "20px",
              height: "200px",
              width: "200px",
              gap: "20px",
            }}
          >
            <Button onClick={() => localStorage.clear()}>
              <Typography>Kaydı sil.</Typography>
            </Button>
            <Box sx={{ minWidth: 120, backgroundColor: "#ffffff9f" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Bir şehir seç
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  label="Age"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {citiesOfTurkey?.map((ceren) => (
                    <MenuItem key={ceren.latitude} value={ceren.latitude}>
                      {ceren.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {temp !== null ? (
              <Typography
                fontSize={"50px"}
                fontFamily={"Times New Roman"}
                sx={{
                  backgroundColor: "#ffffff9f",
                  borderRadius: "20px",
                  width: "190px",
                  height: "250px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {Math.floor(temp - 273.15)} °C
              </Typography>
            ) : (
              <Typography>No temperature data available.</Typography>
            )}
          </Box>
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <TableContainer>
              <Table sx={{ minWidth: 700 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#ffffff8b" }}>
                  <TableRow>
                    <TableCell align="center"> Hissedilen Sıcaklık </TableCell>
                    <TableCell align="center"> Hava Durumu</TableCell>
                    <TableCell align="center"> Nem </TableCell>
                    <TableCell align="center"> Rüzgar Hızı </TableCell>
                    <TableCell align="center"> Deniz Seviyesi</TableCell>
                    <TableCell align="center"> Nem </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody sx={{ backgroundColor: "#ffffff8b" }}>
                  <TableRow
                  // key={cer.Open}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      {Math.floor(feels - 273.15)} °C
                    </TableCell>
                    <TableCell align="center">{des}</TableCell>
                    <TableCell align="center">{nem}</TableCell>
                    <TableCell align="center">{wind}</TableCell>
                    <TableCell align="center">{seaLevel}</TableCell>
                    <TableCell align="center">{des}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box>
            <Table
              sx={{
                minWidth: 500,
                maxWidth: 800,
                backgroundColor: "#a7dff489",
                margin: "0 auto",
              }}
              aria-label="simple table"
            >
              <TableHead fontFamily={"Times New Roman"}>
                <TableRow>
                  <TableCell align="center">Gün</TableCell>
                  <TableCell align="center"> Sıcaklık </TableCell>
                  <TableCell align="center"> Hissedilen Sıcaklık</TableCell>
                  <TableCell align="center"> Hava Durumu </TableCell>
                  <TableCell align="center"> Nem </TableCell>
                </TableRow>
              </TableHead>

              <TableBody fontFamily={"Times New Roman"}>
                {daysOfWeek.map((day, index) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={index}
                  >
                    <TableCell align="center">{day}</TableCell>
                    <TableCell align="center">
                      {" "}
                      {/* buradaki kontrol çok önemli, tek tek days, days[index] vs var mı ona göre ilerle dedik. */}
                      {days &&
                        days[index] &&
                        days[index].main &&
                        Math.floor(days[index].main.temp - 273.15)}{" "}
                      °C
                    </TableCell>
                    <TableCell align="center">
                      {Math.floor(feels - 273.15)} °C
                    </TableCell>
                    <TableCell align="center">{des}</TableCell>
                    <TableCell align="center">{nem}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Content;
