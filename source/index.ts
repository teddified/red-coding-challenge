import {getResponse} from './taskCalculations'

const https = require('https')
const fs = require('fs')

const options = {
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt')
}

const server = https.createServer(options, async (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  const response = await getResponse()
  res.end(JSON.stringify(response))
})

const port = 3000
server.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`)
})

