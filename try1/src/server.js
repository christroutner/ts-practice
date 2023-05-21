/*
  This file starts the REST API server.
*/
import ServerLib from './serverLib.js';
function startServer() {
    const serverLib = new ServerLib();
    serverLib.start();
}
startServer();
