import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlesubscribe = async () => {
    if (!email) return toast.error("Email is required");

    let toastId;

    try {
      setLoading(true);

      // LOADING TOAST
      toastId = toast.loading("Subscribing...");

      const res = await API.post(
        "/subscriber/subscribe",
        { email }
      );

      // SUCCESS TOAST
      toast.success(
        res.data.message || "Subscribed successfully",
        {
          id: toastId,
        }
      );

      setEmail("");

    } catch (err) {

      // ERROR TOAST
      toast.error(
        err.response?.data?.message ||
          "Subscription failed",
        {
          id: toastId,
        }
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        w-full
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        p-5
        sm:p-6
        md:p-7
      "
    >

      {/* HEADER */}
      <div className="mb-5">

        <p className="
          text-xs
          uppercase
          tracking-[3px]
          text-indigo-500
          font-semibold
        ">
          Newsletter
        </p>

        <h2 className="
          text-xl
          sm:text-2xl
          font-bold
          text-slate-800
          mt-2
        ">
          Stay Updated
        </h2>

        <p className="
          text-sm
          text-slate-500
          mt-2
          leading-relaxed
        ">
          Get notified whenever a new blog is published.
        </p>

      </div>

      {/* FORM */}
      <div className="
        flex
        flex-col
        sm:flex-row
        gap-3
      ">

        {/* INPUT */}
        <div className="flex-1">

          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              h-12
              rounded-2xl
              border
              border-slate-300
              bg-slate-50
              px-4
              text-sm
              transition-all
              duration-300
              placeholder:text-slate-400
              focus:outline-none
              focus:ring-4
              focus:ring-indigo-100
              focus:border-indigo-400
            "
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={handlesubscribe}
          disabled={loading}
          className="
            h-12
            sm:min-w-[140px]
            px-6
            rounded-2xl
            bg-gradient-to-r
            from-indigo-600
            to-violet-600
            text-white
            font-medium
            text-sm
            shadow-lg
            shadow-indigo-500/20
            hover:scale-[1.02]
            hover:shadow-indigo-500/30
            transition-all
            duration-300
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Please wait..." : "Subscribe"}
        </button>

      </div>
    </div>
  );
}