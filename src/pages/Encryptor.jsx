import { useState } from "react"
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import "./App.css"
import axios from "axios"
import { guard } from "./services/axios.jsx"

export const Encryptor = () => {
  const [plainText, setPlainText] = useState("")
  const [plainKey, setPlainKey] = useState(0)
  const [plainResponse, setPlainResponse] = useState("")

 const [cipherText, setCipherText] = useState("")

  const handlePlainTextChange = (event) => {
    setPlainText(event.target.value)
  }

  const handleKeyChange = (event) => {
    setPlainKey(event.target.value)
  }

   const encryptText = async (plainText, plainKey) => {
    console.log(plainText, plainKey);
    try {
      const response = await axios.post(`http://localhost:9000/encrypt`, { plainText, plainKey });
      console.log(response.data);
      setPlainResponse(response.data)
    } catch (error) {
      console.error('Error encrypting text:', error);
    }
  };

  return (
    <>
      <Container>
        <Box className="container glass">
          <Typography variant="h2" textAlign={'center'} gutterBottom>Encrypt Text</Typography>
          <Stack direction={"row"}>
            <Stack spacing={2}>
              <Stack spacing={2} direction={"row"}>
                <TextField
                  variant="filled"
                  label="plain Text"
                  type="text"
                  value={plainText}
                  onChange={handlePlainTextChange}
                />
                <TextField
                  variant="filled"
                  label="plainKey"
                  type="number"
                  value={plainKey}
                  onChange={handleKeyChange}
                />
              </Stack>
              <Stack direction={"row-reverse"}>
                <Button variant="contained" onClick={() => encryptText(plainText, plainKey)}>encrypt</Button>
              </Stack>
            </Stack>
            <Stack textAlign={'center'} flex={1}>
              <Typography>encrypted  to: </Typography>
              <Typography > {plainResponse} </Typography>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </>
  )
}

