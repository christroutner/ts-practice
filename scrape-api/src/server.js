/*
  This file starts the REST API server.
*/
import ServerLib from './serverLib.js'
function startServer () {
  const serverLib = new ServerLib()
  const startServer = async () => {
    await serverLib.start()
  }
  startServer().then(() => { }).catch((err) => { console.log(err) })
}
startServer()
