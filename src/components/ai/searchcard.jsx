// src/components/searchcard.jsx

import { Search, Send, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AICard from "./aicard";

import {
  getModules,
  getMyPermissions,
} from "../../services/api";

export default function SearchCard(props) {
  const { item } = props;

  const navigate = useNavigate();

  const [chatOpen, setChatOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [allModules, setAllModules] = useState([]);
  const [userPermissions, setUserPermissions] =
    useState([]);

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "👋 Hi! Where do you want to go?",
    },
  ]);

// 🔥 GET ROLE FROM LOCAL STORAGE
const role = localStorage
  .getItem("role")
  ?.trim()
  ?.toLowerCase();

  // 🔥 FETCH DATA
 
  const fetchPermissions = async () => {
    try {
      const [modulesRes, permissionsRes] =
        await Promise.all([
          getModules(),
          getMyPermissions(),
        ]);

      const modules =
        modulesRes?.data?.data ||
        modulesRes?.data ||
        [];

      const permissions =
        permissionsRes?.data?.data ||
        permissionsRes?.data ||
        [];

      setAllModules(modules);
      setUserPermissions(permissions);
    } catch (error) {
      console.log(error);
    }
  };
 useEffect(() => {
    fetchPermissions();
  }, []);

  // 🔥 ALLOWED MODULES
  const allowedModules = useMemo(() => {
    return userPermissions.map((mod) =>
      mod.name?.toLowerCase()
    );
  }, [userPermissions]);

  // 🔥 SEND CHAT
  const handleSearch = () => {
    if (!message.trim()) return;

    const typedMessage = message.trim();

    // 🔥 USER MESSAGE
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: typedMessage,
      },
    ]);

    const searchText =
      typedMessage.toLowerCase();

    // 🔥 CHECK MODULE
    const moduleExists = allModules.find(
      (mod) =>
        mod.name?.toLowerCase() === searchText
    );

    // ❌ MODULE NOT FOUND
    if (!moduleExists) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: `❌ "${typedMessage}" module not found.`,
        },
      ]);

      setMessage("");
      return;
    }

    // ❌ ACCESS DENIED
    if (
      !allowedModules.includes(searchText)
    ) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: `🚫 You don't have access to "${typedMessage}" module.`,
        },
      ]);

      setMessage("");
      return;
    }

    // ✅ ACCESS GRANTED
    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        text: `✅ "${typedMessage}" module is available for your role.`,
        button: true,
        path: moduleExists.path,
      },
    ]);

    setMessage("");
  };

  return (
    <>
      <AICard {...props}>
        {/* 🔥 IMAGE */}
        <img
          src={item.image}
          alt={item.title}
          className="h-20 w-20 rounded-2xl object-cover"
        />

        {/* 🔥 TITLE */}
        <h2 className="mt-6 text-2xl font-bold text-gray-800">
          {item.title}
        </h2>

        {/* 🔥 DESCRIPTION */}
        <p className="mt-2 text-sm leading-7 text-gray-500">
          {item.description}
        </p>

        {/* 🔥 SEARCH BAR */}
        <div
          onClick={() => setChatOpen(true)}
          className="mt-6 flex cursor-pointer items-center gap-3 rounded-2xl bg-white/70 px-4 py-3"
        >
          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search modules..."
            className="pointer-events-none w-full bg-transparent outline-none"
          />
        </div>
      </AICard>

      {/* 🔥 POPUP CHAT */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative flex h-[650px] w-[95%] max-w-2xl flex-col rounded-3xl bg-white shadow-2xl">
            {/* 🔥 HEADER */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-xl font-bold">
                  AI Module Assistant
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Logged in as {role}
                </p>
              </div>

              <button
                onClick={() =>
                  setChatOpen(false)
                }
                className="rounded-full p-2 transition hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* 🔥 CHAT AREA */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    msg.type === "user"
                      ? "ml-auto bg-black text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* 🔥 NAVIGATE BUTTON */}
                  {msg.button && (
                    <button
                      onClick={() =>
                        navigate(msg.path)
                      }
                      className="mt-3 rounded-xl bg-black px-4 py-2 text-xs font-medium text-white"
                    >
                      Click Here To Navigate
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* 🔥 INPUT AREA */}
            <div className="border-t p-5">
              <div className="flex items-center gap-3 rounded-2xl border px-4 py-3">
                <input
                  type="text"
                  placeholder="Type module name..."
                  className="w-full outline-none"
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />

                <button
                  onClick={handleSearch}
                  className="rounded-xl bg-black p-3 text-white"
                >
                  <Send size={18} />
                </button>
              </div>

              {/* 🔥 MODULES */}
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700">
                  Accessible Modules
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {userPermissions.map((mod) => (
                    <span
                      key={mod._id}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs"
                    >
                      {mod.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}