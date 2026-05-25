import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: "hello", sender: "john" },
    { text: "hi, how can I help?", sender: "admin" },
  ]);

  const [input, setInput] = useState("");
  const [activeUser, setActiveUser] = useState("john");

  const sendMessage = () => {
    if (!input) return;

    setMessages([
      ...messages,
      { text: input, sender: "admin" },
    ]);

    setInput("");
  };

  return (
    <div className="flex flex-col md:flex-row h-[80vh] bg-white rounded-2xl border shadow-sm overflow-hidden">

      {/* 👥 USERS LIST */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r p-3 md:p-4 space-y-2 bg-slate-50 flex md:block overflow-x-auto md:overflow-visible">

        {["john", "sara", "alex"].map((user, i) => (
          <div
            key={i}
            onClick={() => setActiveUser(user)}
            className={`px-3 py-2 rounded-lg cursor-pointer whitespace-nowrap ${
              activeUser === user
                ? "bg-indigo-100 text-indigo-600 font-medium"
                : "hover:bg-white text-slate-600"
            }`}
          >
            {user}
          </div>
        ))}
      </div>

      {/* 💬 CHAT AREA */}
      <div className="flex flex-col flex-1">

        {/* HEADER (ACTIVE USER) */}
        <div className="px-4 py-3 border-b bg-slate-50 text-sm font-medium capitalize">
          chatting with {activeUser}
        </div>

        {/* MESSAGES */}
        <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto">

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[75%] sm:max-w-xs p-3 rounded-lg text-sm ${
                msg.sender === "admin"
                  ? "ml-auto bg-indigo-500 text-white"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              {msg.text}
            </div>
          ))}

        </div>

        {/* INPUT */}
        <div className="p-3 border-t flex gap-2">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type message..."
            className="flex-1 px-3 sm:px-4 py-2 border rounded-lg outline-none text-sm"
          />

          <button
            onClick={sendMessage}
            className="bg-indigo-500 text-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-indigo-600 transition"
          >
            send
          </button>

        </div>

      </div>
    </div>
  );
}