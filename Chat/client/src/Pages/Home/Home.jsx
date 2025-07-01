import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000", {
    withCredentials: true
});

function Home() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
            .then((res) => {
                setUser(res.data.user);
                socket.emit("userConnected", res.data.user);
            })
            .catch(() => navigate("/login"));
    }, []);

    useEffect(() => {
        socket.on("activeUsers", (data) => {
           setUsers(data.filter((u) => u.id !== user?.id));
        });

        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("activeUsers");
            socket.off("receiveMessage");
        };
    }, [user]);

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            const msg = {
                userId: user.id,
                user: `${user.name} ${user.surname}`,
                text: message,
                time: new Date().toLocaleTimeString(),
            };

            socket.emit("sendMessage", msg);
            setMessage("");
        };
    };

    const handleLogout = () => {
        axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true })
            .then(() => navigate("/login"));
    };

    return (
        <div className="main-layout">
            <div className="header">
                <h2>Բարի գալուստ, {user?.name} {user?.surname}</h2>
                <button className="logout-btn" onClick={handleLogout}>Դուրս գալ</button>
            </div>
            <div className="chat-section">
                <div className="user-list">
                    <h3>Ակտիվ օգտվողներ</h3>
                    <ul className="user-name">
                        {
                            users.map((u, idx) => (
                                <li 
                                    key={idx} 
                                    onClick={() => {
                                            setSelectedUser(u)
                                            setMessages([])
                                        }
                                    }
                                    className="user-submit"
                                >{u.name} {u.surname}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="chat-box">
                    {
                        selectedUser ? (
                            <>
                                <h3 className="chat-partner-name">
                                    Նամակագրություն՝ {selectedUser.name} {selectedUser.surname}
                                </h3>
                            </>
                        ) : (
                            <div className="message-start">
                                Ընտրիր օգտվող՝ նամակագրություն սկսելու համար։
                            </div>
                        )
                    }
                    <div className="chat-messages">
                    {
                        messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.userId === user.id ? "me" : "other"}`}>
                                <strong>{msg.user}</strong>: {msg.text} <em>({msg.time})</em>
                            </div>
                        ))
                    }
                    </div>
                    <div className="chat-input-area">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Գրիր հաղորդագրություն..."
                        />
                        <button onClick={handleSendMessage}>Ուղարկել</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;