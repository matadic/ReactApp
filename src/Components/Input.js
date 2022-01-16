import React from "react";
import { useState } from "react";

export default function Input({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const changeText = (e) => {
    const chatMessage = e.target.value;
    setMessage(chatMessage.trimStart());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          onChange={changeText}
          value={message}
          type="text"
          placeholder="Enter message here and press Enter!"
        ></input>
        <button type="submit" onSubmit={handleSubmit} className="button">
          Send
        </button>
      </form>
    </>
  );
}
