import React, { useEffect, useState } from "react";
import "./App.css";
import Input from "./Components/Input";
import Messages from "./Components/Messages";
import { randomColor, randomName } from "./Components/dataNameAndColor";

const serverId = "dLKflhddRs7041eD";
const roomId = "observable-chatapp";

//member setup
const member = {
  username: randomName(),
  color: randomColor(),
};

const drone = new window.Scaledrone(serverId, { data: member });
const room = drone.subscribe(roomId);

export default function App() {
  const [memberId, setMemberId] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      let newMember = memberId;
      newMember.id = drone.clientId;
      setMemberId(newMember);
    });

    room.on("message", (message) => {
      const { data, id, member, timestamp } = message;
      let copyChat = messages;
      copyChat.push({ member: member, text: data, id: id, time: timestamp });
      let newMessages = [...copyChat];
      setMessages(newMessages);
    });
  }, []);

  const sendMessage = (message) => {
    drone.publish({
      room: roomId,
      message,
    });
    console.log("test-primljeno");
  };

  return (
    <div className="App">
      <div className="App-header">
        <h2>Message App</h2>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={sendMessage} />
    </div>
  );
}
