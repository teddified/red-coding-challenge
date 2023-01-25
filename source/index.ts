import {getResponse} from './taskCalculations'

const http = require('http')

const server = http.createServer(async (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  const response = await getResponse()
  res.end(JSON.stringify(response))
})

const port = 3000
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

