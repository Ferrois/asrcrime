import { useContext, createContext, useState, useEffect, useRef } from "react";
import { SOCKET_URL } from "../config";
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useColorMode } from "@chakra-ui/react";

const Context = createContext(null);

export function useAuth() {
  return useContext(Context);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [token, setToken] = useLocalStorage("token", null);
  //user
  const [score, setScore] = useState({});
  const [group, setGroup] = useState(null); //group number
  const [clues,setClues] = useState([])

  //chat
  const [chat, setChat] = useState([]);

  //admin
  const [adminTeams, setAdminTeams] = useState([]);
  const [gamename, setGameName] = useState(null);
  const [gamenumber, setGameNumber] = useState(null);
  const [adminview, setAdminview] = useState([]);


  const socketRef = useRef(null);
  useEffect(() => {
    if (socketRef.current == null) {
      socketRef.current = io(SOCKET_URL + "/");
      // socketRef.current = io(SOCKET_URL+"/", { auth: { token } });
    }
    const socket = socketRef.current;
    socket.open();
    socket.on("unlocked", (data) => {
      if (data.unlocked) {
        navigate("/home");
        setToken(data.code);
        setGroup(data.group);
      }
    });
    socket.on("admin-unlocked", (data) => {
      if (data.unlocked) {
        navigate("/interface");
        setToken(data.code);
        setGameName(data.gamename);
        setGameNumber(data.gamenumber);
      }
    });

    socket.on("admin-response", (data) => {
      setAdminTeams(data);
    });
    socket.on("alert", (data) => {
      toast(data.message, { type: data.type || "success" });
    });
    socket.on("relay", (data) => {
      socketRef.current?.emit(data, { token });
    });
    socket.on("updatescore", (data) => {
      setScore(data);
    });
    socket.on("updateclues",(data)=>{
      setClues(data)
    })
    socket.on("updatechat" , (data)=>{
      setChat(data)
    })
    socket.on("incomingchat", (data) => {
      setChat((prev) => [...prev, data]);
    });
    socket.on("adminview-response", (data) => {
      setAdminview(data);
    });
    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (token != null && pathname == "/") {
      socketRef.current?.emit("login", { payload: token });
    }
    if (token == null && (pathname != "/" && pathname != "/admin" && pathname != "/adminview")){
      navigate("/")
    }
  },[]);

  const logout = (dir) => {
    setToken(null);
    if (dir) return navigate(dir);
    navigate("/");
  };

  const emit = (endpoint, payload) => {
    if (token == null) {
      socketRef.current?.emit(endpoint, { payload });
    } else {
      socketRef.current?.emit(endpoint, { payload, token });
    }
  };
  return <Context.Provider value={{ adminview, chat, score, emit, logout, adminTeams, gamename, group,clues, token }}>{children}</Context.Provider>;
}
