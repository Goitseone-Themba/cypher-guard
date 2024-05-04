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

function App() {
  const [plainText, setPlainText] = useState("")
  const [encryptionKey, setEncryptionKey] = useState(0)
  const [cipherText, setCipherText] = useState("")

  const [encryptedText, setEncryptedText] = useState("")
  const [decryptionKey, setDecryptionkey] = useState(0)
  const [decryptedText, setDecryptedText] = useState("")

  const [selectedFile, setSelectedFile] = useState(null);

  const handlePlainTextChange = (event) => {
    setPlainText(event.target.value)
  }

  const handleEKeyChange = (event) => {
    setEncryptionKey(event.target.value)
  }

  const handleETextChange = (event) => { 
    setEncryptedText(event.target.value)
   }

   const handleDKeyChange = (event) => { 
    setDecryptionkey(event.target.value)
    }

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0])
    }

   const encryptText = async (plainText, key) => {
    console.log(plainText, key);
    try {
      const response = await axios.post(`http://localhost:9000/encrypt`, { plainText, key });
      console.log(response.data);
      setCipherText(response.data)
    } catch (error) {
      console.error('Error encrypting text:', error);
    }
  }

  const decryptText = async (cipherText, key) => {
    try {
      const response = await axios.post(`http://localhost:9000/decrypt`, { cipherText, key });
      console.log(response.data)
      setDecryptedText(response.data)
    } catch (error) {
      console.error('Error decrypting text:', error);
    }
  }

  const handleFileAnalyse = (fileName) => { 
    
   }

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
                  label="encryptionKey"
                  type="number"
                  value={encryptionKey}
                  onChange={handleEKeyChange}
                />
              </Stack>
              <Stack direction={"row-reverse"}>
                <Button variant="contained" onClick={() => encryptText(plainText, encryptionKey)}>encrypt</Button>
              </Stack>
            </Stack>
            <Stack textAlign={'center'} flex={1}>
              <Typography>encrypted  to: </Typography>
              <Typography > {cipherText} </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box className="container glass">
          <Typography variant="h2" textAlign={'center'} gutterBottom>Decrypt Text</Typography>
          <Stack direction={"row"}>
            <Stack spacing={2}>
              <Stack spacing={2} direction={"row"}>
                <TextField
                  variant="filled"
                  label="encrypted text"
                  type="text"
                  value={encryptedText}
                  onChange={handleETextChange}
                />
                <TextField
                  variant="filled"
                  label="decryption key"
                  type="number"
                  value={decryptionKey}
                  onChange={handleDKeyChange}
                />
              </Stack>
              <Stack direction={"row-reverse"}>
                <Button variant="contained" onClick={() => decryptText(encryptedText, decryptionKey)}>Decrypt</Button>
              </Stack>
            </Stack>
            <Stack textAlign={'center'} flex={1}>
              <Typography>Decrypted  to: </Typography>
              <Typography > {decryptedText} </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box className="container glass">
        <input type="file" onChange={handleFileChange} />
        <Button onClick={handleFileAnalyse} >Decrypt</Button>
        </Box>
      </Container>
    </>
  )
}

export default App
