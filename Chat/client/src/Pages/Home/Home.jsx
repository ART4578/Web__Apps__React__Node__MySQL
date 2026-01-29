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
    const [hoveredMessage, setHoveredMessage] = useState(null);
    const [editingMessageId, setEditingMessageId] = useState(null);
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

        socket.on("editMessage", (updatedMsg) => {
            setMessages((prev) =>
                prev.map((m) => (m.id === updatedMsg.id ? updatedMsg : m))
            );
        });

        socket.on("deleteMessageForBoth", (deletedId) => {
            setMessages((prev) => prev.filter((m) => m.id !== deletedId));
        });

        return () => {
            socket.off("activeUsers");
            socket.off("receiveMessage");
            socket.off("editMessage");
            socket.off("deleteMessageForBoth");
        };
    }, [user]);

    const handleSendMessage = () => {
        if (!selectedUser) {
            alert("First, select a user to send a message to.");
            return;
        };

        if (message.trim() === "") return;

        if (editingMessageId) {
            const updatedMsg = {
                id: editingMessageId,
                userId: user.id,
                user: `${user.name} ${user.surname}`,
                text: message,
                time: new Date().toLocaleTimeString(),
                to: selectedUser.id
            };

            socket.emit("editMessage", updatedMsg);

            setMessages((prev) =>
                prev.map((m) => (m.id === updatedMsg.id ? updatedMsg : m))
            );

            setEditingMessageId(null);
        } else {
            const msg = {
                id: Date.now(),
                userId: user.id,
                user: `${user.name} ${user.surname}`,
                text: message,
                time: new Date().toLocaleTimeString(),
                to: selectedUser.id
            };

            socket.emit("sendMessage", msg);
        };

        setMessage("");
        setHoveredMessage(null);
    };

    const handleLogout = () => {
        axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true })
            .then(() => navigate("/login"));
    };

    const handleCopy = (text) => {
        if (!text) {
            alert("Missing text to copy.");
            return;
        };

        navigator.clipboard.writeText(text)
            .then(() => {
                alert("Message copied.");
            })
            .catch((err) => {
                console.error("Copy error.", err);
                alert("Could not copy message.");
            });

        setHoveredMessage(null);    
    };

    const handleEdit = (msg) => {
        setMessage(msg.text);
        setEditingMessageId(msg.id);
        setHoveredMessage(null);
    };

    const handleDelete = (index, msg) => {
        const choice = window.prompt(
            `How do you want to delete the message:՝\n` +
            `1 — Delete from you only\n` +
            `2 — Delete from everyone\n\n` +
            `Enter 1 or 2`
        );

        if (choice === "1") {
            setMessages((prev) => prev.filter((m) => m.id !== msg.id));
        } else if (choice === "2") {
            socket.emit("deleteMessageForBoth", msg.id, msg.userId, msg.to);
            setMessages((prev) => prev.filter((m) => m.id !== msg.id));
        } else {
            alert("Delete canceled.");
        };

        setHoveredMessage(null);
    };

    return (
        <div className="main-layout">
            <div className="header">
                <h2>Welcome, {user?.name} {user?.surname}</h2>
                <button className="logout-btn" onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#f44336" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                    </svg>
                </button>
            </div>
            <div className="chat-section">
                <div className="user-list">
                    <h3>Active users</h3>
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
                                    Correspondence: {selectedUser.name} {selectedUser.surname}
                                </h3>
                            </>
                        ) : (
                            <div className="message-start">
                                Select a user to start a conversation.
                            </div>
                        )
                    }
                    <div className="chat-messages">
                        {
                            messages.map((msg, idx) => (
                                <div 
                                    key={idx}
                                    className={`message ${msg.userId === user.id ? "me" : "other"}`}
                                    onMouseEnter={() => setHoveredMessage(idx)}
                                    onMouseLeave={() => setHoveredMessage(null)}
                                >
                                    <strong>{msg.user}</strong> {msg.text}
                                    <em>({msg.time})</em>
                                    {
                                        hoveredMessage === idx && (
                                            <div className={`message-options ${msg.userId === user.id ? "me-options" : "other-options"}`}>
                                                <button className="copy" onClick={() => handleCopy(msg.text)}>📋 Copy</button>
                                                <button className="edit" onClick={() => handleEdit(msg)}>✏️ Edit</button>
                                                <button className="delete" onClick={() => handleDelete(idx, msg)}>❌ Delete</button>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className="chat-input-area">
                        {
                            editingMessageId && (
                                <div className="editing-banner">
                                    <div className="editing-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#856404" viewBox="0 0 24 24">
                                            <path d="M4 21h17v-2H4v2zm1.94-4.06l1.06 1.06L18 7.94l-1.06-1.06L4.94 16.94zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/>
                                        </svg>
                                        <span>Are you editing the letter?</span>
                                    </div>
                                    <button className="cancel-edit" onClick={() => {
                                        setEditingMessageId(null);
                                        setMessage("");
                                    }}>❌</button>
                                </div>
                            )
                        }
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write a message..."
                        />
                        <button className="send-btn" onClick={handleSendMessage}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;