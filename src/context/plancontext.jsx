import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const PlanContext =
  createContext();

export function PlanProvider({
  children,
}) {
  const [currentPlan, setCurrentPlan] =
    useState(null);

  // =========================================
  // LOAD PLAN
  // =========================================

  useEffect(() => {
    const savedPlan =
      localStorage.getItem(
        "currentplan"
      );

    if (savedPlan) {
      setCurrentPlan(
        JSON.parse(savedPlan)
      );
    }
  }, []);

  // =========================================
  // ACTIVATE PLAN
  // =========================================

  const activatePlan = (
    plan
  ) => {
    const payload = {
      ...plan,

      activatedAt:
        new Date().toISOString(),

      renewalDate:
        new Date(
          new Date().setMonth(
            new Date().getMonth() + 1
          )
        ).toISOString(),
    };

    localStorage.setItem(
      "currentplan",
      JSON.stringify(payload)
    );

    setCurrentPlan(payload);
  };

  // =========================================
  // REMOVE PLAN
  // =========================================

  const removePlan = () => {
    localStorage.removeItem(
      "currentplan"
    );

    setCurrentPlan(null);
  };

  return (
    <PlanContext.Provider
      value={{
        currentPlan,
        activatePlan,
        removePlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(
    PlanContext
  );
}