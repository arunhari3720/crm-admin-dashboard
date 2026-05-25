const dummypaymentservice = {
  // =========================================
  // CREATE DUMMY PAYMENT
  // =========================================

  createPayment: async ({
    plan,
    amount,
    method,
  }) => {
    return new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          // RANDOM SUCCESS / FAILURE

          const success =
            Math.random() > 0.1;

          if (success) {
            resolve({
              success: true,

              paymentId: `PAY_${Date.now()}`,

              transactionId: `TXN_${Math.floor(
                Math.random() *
                  1000000
              )}`,

              method,

              amount,

              plan,

              status: "success",

              paidAt:
                new Date().toISOString(),

              message:
                "Payment completed successfully",
            });

          } else {
            reject({
              success: false,

              status: "failed",

              message:
                "Payment failed. Please try again.",
            });
          }
        }, 3000);
      }
    );
  },

  // =========================================
  // VERIFY DUMMY PAYMENT
  // =========================================

  verifyPayment: async (
    paymentId
  ) => {
    return new Promise(
      (resolve) => {
        setTimeout(() => {
          resolve({
            success: true,

            verified: true,

            paymentId,

            verifiedAt:
              new Date().toISOString(),
          });
        }, 1500);
      }
    );
  },

  // =========================================
  // FETCH DUMMY PAYMENT HISTORY
  // =========================================

  getPaymentHistory:
    async () => {
      return new Promise(
        (resolve) => {
          setTimeout(() => {
            resolve([
              {
                id: "#INV001",

                plan: "Pro",

                amount: "₹999",

                status: "Paid",

                method: "Card",

                date: "12 May 2026",
              },

              {
                id: "#INV002",

                plan: "Enterprise",

                amount: "₹2999",

                status: "Paid",

                method: "UPI",

                date: "08 May 2026",
              },

              {
                id: "#INV003",

                plan: "Free",

                amount: "₹0",

                status: "Trial",

                method: "Free",

                date: "01 May 2026",
              },
            ]);
          }, 1200);
        }
      );
    },

  // =========================================
  // GENERATE DUMMY INVOICE
  // =========================================

  generateInvoice:
    async (paymentData) => {
      return new Promise(
        (resolve) => {
          setTimeout(() => {
            resolve({
              invoiceId: `INV_${Date.now()}`,

              generatedAt:
                new Date().toISOString(),

              customer:
                localStorage.getItem(
                  "username"
                ) || "User",

              ...paymentData,
            });
          }, 1000);
        }
      );
    },
};

export default dummypaymentservice;