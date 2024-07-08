import {
  Alert,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { formatDate } from "../utils/helper";
import { GetHourly, WalletInfo } from "../Services/api";

const Content = () => {
  const [items, setItems] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mes, setMes] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    WalletInfo(setItems);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "600px",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            borderRadius: 10,
            boxShadow: "70px",
            backgroundColor: "white",
          }}
        >
          {/* {items ? (
          <Box>
            <Typography>{items.TotalWallet}</Typography>
            <Typography>{items.TotalBalance}</Typography>
          </Box>
        ) : (
          <Typography> Loading...</Typography>
        )} */}

          {/* <DatePicker
            label="Choose a Start Date"
            value={startDate}
            onChange={(e) => {
              const value = formatDate(e);

              setStartDate(value);
            }}
          />
          <DatePicker
            label="Choose an End Date"
            value={endDate}
            onChange={(e) => {
              const value = formatDate(e);

              setEndDate(value);
            }}
          /> */}
          <DatePicker
            showIcon
            selected={startDate}
            onChange={(e) => {
              const value = formatDate(e);

              setStartDate(value);
            }}
          />
          <DatePicker
            showIcon
            selected={endDate}
            onChange={(e) => {
              const value = formatDate(e);

              setEndDate(value);
            }}
          />
          {error && (
            <Box>
              <Alert severity="error">{errorMessage}</Alert>
            </Box>
          )}
          <Button
            onClick={() =>
              GetHourly(startDate, endDate, setMes, setError, setErrorMessage)
            }
            variant="contained"
          >
            Send
          </Button>
          <Table
            sx={{
              minWidth: 650,
              backgroundColor: "yellow",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="right"> Open</TableCell>
                <TableCell align="right"> Close </TableCell>
                <TableCell align="right"> High </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {mes?.map((cer) => (
                <TableRow
                  key={cer.Open}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{cer.Open}</TableCell>
                  <TableCell align="right">{cer.Close}</TableCell>
                  <TableCell align="right">{cer.High}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Content;
