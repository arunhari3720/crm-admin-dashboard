// src/pages/pricing/paymentpage.jsx

import {
  ShieldCheck,
  ChevronRight,
  X,
  CreditCard,
  Wallet,
  Landmark,
  BadgeIndianRupee,
  CheckCircle2,
  Lock,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import Confetti from "react-confetti";

import { useNavigate } from "react-router-dom";

/* ====================================================== */
/* PAYMENT METHODS */
/* ====================================================== */

const methods = [
  {
    id: "upi",
    title: "UPI",
    subtitle: "Instant Payment",
    Icon: Wallet,
  },

  {
    id: "card",
    title: "Cards",
    subtitle: "Debit / Credit Cards",
    Icon: CreditCard,
  },

  {
    id: "netbanking",
    title: "Net Banking",
    subtitle: "All Banks",
    Icon: Landmark,
  },

  {
    id: "emi",
    title: "EMI",
    subtitle: "Easy Installments",
    Icon: BadgeIndianRupee,
  },
];

/* ====================================================== */
/* PROCESSING */
/* ====================================================== */

function ProcessingAnimation() {
  const [step, setStep] = useState(0);

  const steps = [
    "Initializing secure payment...",
    "Connecting to bank servers...",
    "Verifying transaction...",
    "Awaiting confirmation...",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev < 3) {
          return prev + 1;
        }

        clearInterval(timer);

        return prev;
      });
    }, 900);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        flex
        min-h-[600px]
        flex-col
        items-center
        justify-center
        px-4
      "
    >
      {/* SPINNER */}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        className="
          flex
          h-28
          w-28
          items-center
          justify-center
          rounded-full
          border-4
          border-blue-100
          border-t-blue-600
        "
      >
        <Lock
          size={38}
          className="text-blue-600"
        />
      </motion.div>

      {/* TITLE */}

      <h1
        className="
          mt-8
          text-center
          text-3xl
          font-black
          text-slate-800
          sm:text-4xl
        "
      >
        Processing Payment
      </h1>

      <p
        className="
          mt-3
          text-center
          text-sm
          text-slate-500
        "
      >
        Please wait while we complete your
        transaction.
      </p>

      {/* STEPS */}

      <div
        className="
          mt-10
          w-full
          max-w-md
          space-y-4
          rounded-3xl
          border
          bg-white
          p-6
          shadow-sm
        "
      >
        {steps.map((item, index) => (
          <div
            key={item}
            className="
              flex
              items-center
              gap-4
            "
          >
            <div
              className={`
                h-3
                w-3
                rounded-full
                ${
                  index <= step
                    ? "bg-green-500"
                    : "bg-slate-300"
                }
              `}
            />

            <p className="text-sm text-slate-700">
              {item}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ====================================================== */
/* SUCCESS */
/* ====================================================== */

function SuccessAnimation() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        relative
        flex
        min-h-[650px]
        flex-col
        items-center
        justify-center
        overflow-hidden
        px-4
      "
    >
      {/* CONFETTI */}

      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={250}
      />

      {/* SUCCESS ICON */}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 10,
        }}
        className="
          flex
          h-32
          w-32
          items-center
          justify-center
          rounded-full
          bg-green-100
        "
      >
        <CheckCircle2
          size={70}
          className="text-green-600"
        />
      </motion.div>

      {/* TITLE */}

      <h1
        className="
          mt-8
          text-center
          text-4xl
          font-black
          text-slate-800
        "
      >
        Payment Successful 🎉
      </h1>

      <p
        className="
          mt-4
          max-w-md
          text-center
          text-sm
          leading-7
          text-slate-500
        "
      >
        Your premium subscription has been
        activated successfully.
      </p>

      {/* RECEIPT */}

      <div
        className="
          mt-8
          w-full
          max-w-sm
          rounded-3xl
          border
          bg-white
          p-6
          shadow-lg
        "
      >
        <div className="flex justify-between border-b pb-3">
          <p className="text-sm text-slate-500">
            Amount
          </p>

          <p className="font-bold text-slate-800">
            ₹5,500
          </p>
        </div>

        <div className="mt-4 flex justify-between border-b pb-3">
          <p className="text-sm text-slate-500">
            Transaction ID
          </p>

          <p className="font-bold text-slate-800">
            TXN847292
          </p>
        </div>

        <div className="mt-4 flex justify-between">
          <p className="text-sm text-slate-500">
            Status
          </p>

          <p className="font-bold text-green-600">
            Success
          </p>
        </div>
      </div>

      {/* BUTTON */}

      <button
        onClick={() =>
          navigate("/current-plan")
        }
        className="
          mt-8
          rounded-2xl
          bg-blue-600
          px-10
          py-4
          text-sm
          font-bold
          text-white
          shadow-lg
          shadow-blue-200
          hover:bg-blue-700
        "
      >
        Continue
      </button>
    </motion.div>
  );
}

/* ====================================================== */
/* MAIN */
/* ====================================================== */

export default function PaymentPage() {
  const [selected, setSelected] =
    useState("upi");

  const [processing, setProcessing] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  /* CARD STATES */

  const [cardNumber, setCardNumber] =
    useState("");

  const [cardName, setCardName] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] = useState("");

  const [flipCard, setFlipCard] =
    useState(false);

  /* PAYMENT */

  const handlePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      setSuccess(true);
    }, 3500);
  };

  return (
    <div
      className="
        min-h-screen
        bg-slate-100
        p-2
        sm:p-4
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-[95vh]
          max-w-7xl
          flex-col
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
          lg:flex-row
        "
      >
        {/* ====================================================== */}
        {/* LEFT SIDE */}
        {/* ====================================================== */}

        <div
          className="
            hidden
            w-80
            flex-col
            bg-blue-600
            p-6
            text-white
            lg:flex
          "
        >
          {/* LOGO */}

          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-white/20
                text-2xl
                font-black
              "
            >
              R
            </div>

            <div>
              <h1 className="text-2xl font-black">
                Razorpay
              </h1>

              <p className="mt-1 text-sm text-blue-100">
                Trusted Payment Gateway
              </p>
            </div>
          </div>

          {/* PRICE */}

          <div
            className="
              mt-10
              rounded-3xl
              bg-white/10
              p-6
            "
          >
            <p className="text-sm text-blue-100">
              Total Payable
            </p>

            <h1 className="mt-3 text-5xl font-black">
              ₹5,500
            </h1>
          </div>

          {/* SECURITY */}

          <div
            className="
              mt-auto
              rounded-3xl
              bg-white/10
              p-5
            "
          >
            <div className="flex items-center gap-3">
              <ShieldCheck />

              <div>
                <p className="font-bold">
                  Secure Payment
                </p>

                <p className="text-sm text-blue-100">
                  End-to-end encrypted
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* RIGHT SIDE */}
        {/* ====================================================== */}

        <div className="flex flex-1 flex-col">
          {/* HEADER */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              px-4
              py-5
              sm:px-6
            "
          >
            <h2
              className="
                text-xl
                font-black
                text-slate-800
                sm:text-2xl
              "
            >
              Payment Options
            </h2>

            <button
              className="
                rounded-xl
                p-2
                hover:bg-slate-100
              "
            >
              <X />
            </button>
          </div>

          {/* BODY */}

          <div className="flex flex-1 flex-col lg:flex-row">
            {/* METHODS */}

            {!processing && !success && (
              <div
                className="
                  border-b
                  bg-slate-50
                  p-4
                  lg:w-80
                  lg:border-b-0
                  lg:border-r
                "
              >
                <div
                  className="
                    grid
                    grid-cols-2
                    gap-3
                    lg:grid-cols-1
                  "
                >
                  {methods.map(
                    ({
                      id,
                      title,
                      subtitle,
                      Icon,
                    }) => (
                      <button
                        key={id}
                        onClick={() =>
                          setSelected(id)
                        }
                        className={`
                          flex
                          items-center
                          justify-between
                          rounded-2xl
                          border
                          p-4
                          transition
                          ${
                            selected === id
                              ? "border-blue-500 bg-blue-50"
                              : "bg-white"
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              rounded-xl
                              bg-slate-100
                              p-3
                            "
                          >
                            <Icon size={20} />
                          </div>

                          <div className="text-left">
                            <p className="font-bold text-slate-800">
                              {title}
                            </p>

                            <p className="text-xs text-slate-500">
                              {subtitle}
                            </p>
                          </div>
                        </div>

                        <ChevronRight
                          size={18}
                          className="hidden sm:block"
                        />
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* DETAILS */}

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <AnimatePresence mode="wait">
                {/* PAYMENT */}

                {!processing &&
                  !success && (
                    <motion.div
                      key={selected}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                    >
                      {/* AI */}

                      <div
                        className="
                          rounded-3xl
                          border
                          border-blue-100
                          bg-blue-50
                          p-5
                        "
                      >
                        <p className="font-bold text-blue-700">
                          AI Recommendation
                        </p>

                        <p className="mt-2 text-sm text-slate-600">
                          {selected ===
                            "upi" &&
                            "UPI gives faster transaction approval and cashback."}

                          {selected ===
                            "card" &&
                            "Cards support reward points and international payments."}

                          {selected ===
                            "netbanking" &&
                            "Net banking is recommended for large secure payments."}

                          {selected ===
                            "emi" &&
                            "EMI helps split payments into monthly installments."}
                        </p>
                      </div>

                      {/* ====================================================== */}
                      {/* UPI */}
                      {/* ====================================================== */}

                      {selected ===
                        "upi" && (
                        <div className="mt-6 rounded-3xl border p-6">
                          <h2 className="text-2xl font-black text-slate-800">
                            UPI Payment
                          </h2>

                          <div className="mt-8 flex flex-col items-center">
                            <img
                              src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=payment-demo"
                              alt="qr"
                              className="rounded-2xl border p-2"
                            />

                            <p className="mt-4 text-sm text-slate-500">
                              Scan using GPay,
                              PhonePe or Paytm
                            </p>
                          </div>

                          <input
                            type="text"
                            placeholder="Enter UPI ID"
                            className="
                              mt-8
                              w-full
                              rounded-2xl
                              border
                              px-5
                              py-4
                              outline-none
                            "
                          />
                        </div>
                      )}

                      {/* ====================================================== */}
                      {/* CARD */}
                      {/* ====================================================== */}

                      {selected ===
                        "card" && (
                        <div className="mt-6">
                          {/* LIVE CARD */}

                          <motion.div
                            animate={{
                              rotateY:
                                flipCard
                                  ? 180
                                  : 0,
                            }}
                            transition={{
                              duration: 0.6,
                            }}
                            style={{
                              transformStyle:
                                "preserve-3d",
                            }}
                            className="
                              relative
                              mx-auto
                              h-56
                              w-full
                              max-w-md
                            "
                          >
                            {/* FRONT */}

                            <div
                              className="
                                absolute
                                inset-0
                                rounded-3xl
                                bg-gradient-to-br
                                from-slate-900
                                via-blue-900
                                to-slate-800
                                p-6
                                text-white
                                shadow-2xl
                              "
                              style={{
                                backfaceVisibility:
                                  "hidden",
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <p className="text-sm opacity-70">
                                  Premium Card
                                </p>

                                <CreditCard
                                  size={30}
                                />
                              </div>

                              <div className="mt-10">
                                <p
                                  className="
                                    text-2xl
                                    font-bold
                                    tracking-[4px]
                                  "
                                >
                                  {cardNumber ||
                                    "**** **** **** ****"}
                                </p>
                              </div>

                              <div className="mt-10 flex items-center justify-between">
                                <div>
                                  <p className="text-xs opacity-70">
                                    Card
                                    Holder
                                  </p>

                                  <p className="mt-1 text-sm font-semibold uppercase">
                                    {cardName ||
                                      "YOUR NAME"}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-xs opacity-70">
                                    Expiry
                                  </p>

                                  <p className="mt-1 text-sm font-semibold">
                                    {expiry ||
                                      "MM/YY"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* BACK */}

                            <div
                              className="
                                absolute
                                inset-0
                                rounded-3xl
                                bg-gradient-to-br
                                from-slate-800
                                to-black
                                p-6
                                text-white
                              "
                              style={{
                                transform:
                                  "rotateY(180deg)",
                                backfaceVisibility:
                                  "hidden",
                              }}
                            >
                              <div className="mt-6 h-12 bg-black" />

                              <div className="mt-8 flex justify-end">
                                <div
                                  className="
                                    flex
                                    h-10
                                    w-24
                                    items-center
                                    justify-end
                                    rounded-md
                                    bg-white
                                    px-3
                                    text-black
                                    font-bold
                                    tracking-[3px]
                                  "
                                >
                                  {cvv ||
                                    "***"}
                                </div>
                              </div>

                              <p className="mt-10 text-xs opacity-60">
                                Secured by
                                Razorpay
                              </p>
                            </div>
                          </motion.div>

                          {/* INPUTS */}

                          <div className="mt-8 space-y-5">
                            <input
                              type="text"
                              placeholder="Card Number"
                              value={
                                cardNumber
                              }
                              onChange={(e) =>
                                setCardNumber(
                                  e.target
                                    .value
                                )
                              }
                              className="
                                w-full
                                rounded-2xl
                                border
                                px-5
                                py-4
                                outline-none
                              "
                            />

                            <input
                              type="text"
                              placeholder="Card Holder Name"
                              value={
                                cardName
                              }
                              onChange={(e) =>
                                setCardName(
                                  e.target
                                    .value
                                )
                              }
                              className="
                                w-full
                                rounded-2xl
                                border
                                px-5
                                py-4
                                outline-none
                              "
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="text"
                                placeholder="MM/YY"
                                value={
                                  expiry
                                }
                                onChange={(e) =>
                                  setExpiry(
                                    e.target
                                      .value
                                  )
                                }
                                className="
                                  rounded-2xl
                                  border
                                  px-5
                                  py-4
                                  outline-none
                                "
                              />

                              <input
                                type="password"
                                placeholder="CVV"
                                value={cvv}
                                onFocus={() =>
                                  setFlipCard(
                                    true
                                  )
                                }
                                onBlur={() =>
                                  setFlipCard(
                                    false
                                  )
                                }
                                onChange={(e) =>
                                  setCvv(
                                    e.target
                                      .value
                                  )
                                }
                                className="
                                  rounded-2xl
                                  border
                                  px-5
                                  py-4
                                  outline-none
                                "
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ====================================================== */}
                      {/* NET BANKING */}
                      {/* ====================================================== */}

                      {selected ===
                        "netbanking" && (
                        <div className="mt-6 rounded-3xl border p-6">
                          <h2 className="text-2xl font-black text-slate-800">
                            Select Bank
                          </h2>

                          <div className="mt-6 grid grid-cols-2 gap-4">
                            {[
                              "SBI",
                              "HDFC",
                              "ICICI",
                              "Axis",
                            ].map(
                              (bank) => (
                                <button
                                  key={bank}
                                  className="
                                    rounded-2xl
                                    border
                                    p-5
                                    text-left
                                    hover:border-blue-500
                                    hover:bg-blue-50
                                  "
                                >
                                  <p className="font-bold">
                                    {bank}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-500">
                                    Secure
                                    banking
                                  </p>
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* ====================================================== */}
                      {/* EMI */}
                      {/* ====================================================== */}

                      {selected ===
                        "emi" && (
                        <div className="mt-6 rounded-3xl border p-6">
                          <h2 className="text-2xl font-black text-slate-800">
                            EMI Options
                          </h2>

                          <div className="mt-6 space-y-4">
                            {[
                              {
                                month:
                                  "3 Months",
                                amount:
                                  "₹1833/mo",
                              },

                              {
                                month:
                                  "6 Months",
                                amount:
                                  "₹916/mo",
                              },

                              {
                                month:
                                  "12 Months",
                                amount:
                                  "₹458/mo",
                              },
                            ].map(
                              (emi) => (
                                <button
                                  key={
                                    emi.month
                                  }
                                  className="
                                    flex
                                    w-full
                                    items-center
                                    justify-between
                                    rounded-2xl
                                    border
                                    px-5
                                    py-4
                                    hover:border-blue-500
                                    hover:bg-blue-50
                                  "
                                >
                                  <div>
                                    <p className="font-bold">
                                      {
                                        emi.month
                                      }
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                      No Cost
                                      EMI
                                    </p>
                                  </div>

                                  <p className="font-bold text-blue-600">
                                    {
                                      emi.amount
                                    }
                                  </p>
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* PAY BUTTON */}

                      <button
                        onClick={
                          handlePayment
                        }
                        className="
                          mt-8
                          w-full
                          rounded-2xl
                          bg-blue-600
                          py-4
                          text-sm
                          font-bold
                          text-white
                          shadow-lg
                          shadow-blue-200
                          hover:bg-blue-700
                        "
                      >
                        Pay ₹5,500
                      </button>
                    </motion.div>
                  )}

                {/* PROCESSING */}

                {processing && (
                  <ProcessingAnimation />
                )}

                {/* SUCCESS */}

                {success && (
                  <SuccessAnimation />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}