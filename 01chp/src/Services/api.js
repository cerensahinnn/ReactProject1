export async function WalletInfo(setItems) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("Token")}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    CommoditySuffix: 1,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch(
    "https://gatewaydev.goldtaggateway.com/Vendors/VendorWalletBalanceInfo",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      setItems(result.Data);
      console.log(typeof items); // bu kısım kontrol için yapılır, items arrayimiz oluşuyor mu
    })
    .catch((error) => console.error(error));
}

export async function GetHourly(
  startDate,
  endDate,
  setMes,
  setError,
  setErrorMessage
) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("Token")}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    CommoditySuffix: 1,
    StartDate: startDate,
    EndDate: endDate,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch(
    "https://gatewaydev.goldtaggateway.com/Vendors/GetPriceHistories",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.Success) {
        setMes(result.Data);
      } else {
        setErrorMessage(result.Message);
        setError(true);
      }
    })
    .catch((error) => {
      setMes([
        {
          Open: 0,
          Close: 0,
          High: 0,
        },
        {
          Open: 0,
          Close: 0,
          High: 0,
        },
        {
          Open: 0,
          Close: 0,
          High: 0,
        },
      ]);
    });
}
