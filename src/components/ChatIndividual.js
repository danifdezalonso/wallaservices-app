import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatIndividual.module.scss";
import Message from "./Message.js";
import { db } from "../fire";
import firebase from "firebase";
import stylesButton from "../components/Buttons/ButtonNavBar.module.scss";
import IconSend from "./Buttons/ButtonIcons/IconSend";
import ChatAside from "./ChatAside";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);

  useEffect(() => {
    setUsername(prompt("Com et dius?"));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() =>
      elementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    );
    return <div ref={elementRef} />;
  };

  return (
    <>
      {/* contingut aqui */}
      <div className={styles.chat__layout}>
        <div className={styles.chat__layout__leftside}>
          <h4>Bandeja de entrada</h4>
          <ChatAside />
        </div>

        <div className={styles.chat__layout__rightside}>
          <h2>Hola {username}</h2>
          <div className={styles.container}>
            <div className={styles.chat__scroll}>
              <ul>
                {messages.map((message) => (
                  <li>
                    <Message username={username} message={message} />
                  </li>
                ))}
                <AlwaysScrollToBottom />
              </ul>
            </div>
            <div className={styles.chat__button}>
              <form onSubmit={sendMessage}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  placeholder="Envia missatge..."
                />
              </form>
              <button className="button--navbar" onClick={sendMessage}>
                <span className={stylesButton.button__icon}>
                  <IconSend />
                </span>
                <span className={stylesButton.button__text}>Enviar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
