const MODE = "dev"; // dev or prod
let SERVER_URL, SOCKET_URL;
if (MODE === "dev") {
  SERVER_URL = "http://localhost:8080";
  SOCKET_URL = "ws://localhost:8080";
} else if (MODE === "prod") {
  SERVER_URL = "https://asrcrime.herokuapp.com";
  SOCKET_URL = "wss://asrcrime.herokuapp.com";
}

export { SERVER_URL, SOCKET_URL };
