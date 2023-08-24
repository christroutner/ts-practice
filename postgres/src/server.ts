
/*
  This file starts the REST API server.
*/

import ServerLib from './serverLib.js'

function startServer (): void {
  const serverLib = new ServerLib()

  const startServer = async (): Promise<void> => {
    await serverLib.start()
  }
  startServer().then(() => {}).catch((err) => { console.log(err) })
}
startServer()
