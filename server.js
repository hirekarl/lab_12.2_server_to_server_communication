const express = require("express")
const axios = require("axios")

const app = express()

const PORT = 3000
const ENDPOINT = "https://uselessfacts.jsph.pl/api/v2/facts/random"

app.get("/", (req, res) => {
  res.send(
    "<p>Why don't you try getting a <a href='/api/fun-fact'>fun fact?</a></p>"
  )
})

app.get("/api/fun-fact", async (req, res) => {
  try {
    const response = await axios.get(ENDPOINT)
    res.json({
      fact: response.data.text,
    })
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data)
    } else {
      console.error("Network Error:", error.message)
      res.status(500).json({ error: "Could not fetch fun fact." })
    }
  }
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
