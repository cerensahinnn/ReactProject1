export function WeatherFetch(
  lat,
  lon,
  setTemp,
  setDes,
  setNem,
  setFeels,
  setWind,
  setSea
) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=054f22eb00ac34df5f998078cb6c63af`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result) {
        setTemp(result.main.temp);
        setDes(result.weather[0].description);
        setNem(result.main.humidity);
        setFeels(result.main.feels_like);
        setWind(result.wind.speed);
        setSea(result.main.sea_level);
      }
    })
    .catch((error) => console.error(error));
}

export function WeeklyWeatherFetch(lat, lon, setDays) {
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
        setDays(filteredData);
      }
    })

    .catch((error) => console.error(error));
}
