require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const lyricsFinder = require("lyrics-finder")
const SpotifyWebApi = require("spotify-web-api-node")
const path = require('path') //newwww

const app = express()

app.use(cors())
//app.use(cors({origin: "*",}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'build'))) //newwww

// app.get('/products/:id', cors(), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for a Single Route'});
// });

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.post("/refresh", (req, res) => { //rather than logging in every hour
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  })
  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })
})

app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
  res.json({ lyrics })
})

// app.get("/playlist", (req, res) => {
//   //res.header("Access-Control-Allow-Origin", "*");
//   const spotifyApi = new SpotifyWebApi({
//     redirectUri: process.env.REDIRECT_URI,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//   })
  
//   spotifyApi.getPlaylist({ playlistId: req.query.playlistId })
//     .then(data => {
//       res.json({data})
      
//     })
//     .catch(err => {
//       res.sendStatus(err)
//     })
// })

app.get('/*', (req, res) => { //newww
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

//app.listen(3001) //run backend on localhost/3001
app.listen(3001, () => {
  console.log('Listening on port 3001');
})