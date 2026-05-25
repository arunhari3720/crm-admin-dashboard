import { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

export default function AttendanceChat({
  messages,
  loading,
}) {

  const navigate =
    useNavigate();

  const bottomref =
    useRef(null);

  // ======================================================
  // AUTO SCROLL
  // ======================================================

  useEffect(() => {

    bottomref.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);

  return (
    <div
      className="
        flex
        h-full
        flex-col
      "
    >
      {/* CHAT AREA */}

      <div
        className="
          flex-1
          overflow-y-auto
          space-y-6
          pr-2
        "
      >
        {messages.map(
          (msg, index) => (

            <div
              key={index}
              className={`
                flex
                ${
                  msg.type === "user"

                    ? "justify-end"

                    : "justify-start"
                }
              `}
            >
              {/* USER */}

              {msg.type ===
              "user" ? (

                <div
                  className="
                    max-w-[85%]
                    rounded-[24px]
                    rounded-br-md
                    bg-gradient-to-r
                    from-indigo-500
                    to-violet-500
                    px-5
                    py-4
                    text-sm
                    leading-7
                    text-white
                    shadow-lg
                    sm:max-w-[70%]
                    sm:text-base
                  "
                >
                  {msg.text}
                </div>

              ) : (

                // AI

                <div
                  className="
                    max-w-[90%]
                    rounded-[24px]
                    rounded-bl-md
                    bg-slate-100
                    px-5
                    py-4
                    text-sm
                    leading-7
                    text-slate-700
                    shadow-sm
                    sm:max-w-[75%]
                    sm:text-base
                  "
                >
                  <div
                    className="
                      mb-3
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-r
                        from-indigo-500
                        to-violet-500
                        text-lg
                        text-white
                      "
                    >
                      🤖
                    </div>

                    <div>
                      <h3
                        className="
                          text-sm
                          font-bold
                          text-slate-800
                        "
                      >
                        Attendance AI
                      </h3>

                      <p
                        className="
                          text-xs
                          text-slate-400
                        "
                      >
                        Smart assistant
                      </p>
                    </div>
                  </div>

                  <p className="whitespace-pre-line">
                    {msg.text}
                  </p>

                  {/* CTA */}

                  {msg.showbutton && (

                    <button
                      onClick={() =>
                        navigate(
                          "/attendance-monitor"
                        )
                      }
                      className="
                        mt-5
                        rounded-2xl
                        bg-gradient-to-r
                        from-indigo-500
                        to-violet-500
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      Check Employees Attendance
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        )}

        {/* LOADING */}

        {loading && (

          <div className="flex justify-start">
            <div
              className="
                rounded-[24px]
                rounded-bl-md
                bg-slate-100
                px-5
                py-4
                text-slate-500
              "
            >
              AI is thinking...
            </div>
          </div>
        )}

        <div ref={bottomref} />
      </div>
    </div>
  );
}