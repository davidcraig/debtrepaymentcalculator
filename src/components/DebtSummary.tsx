import useDebts from "../stores/debts";
import { RenderCurrency } from "./RenderCurrency";

export function DebtSummary() {
  const { debts, getMaxMonths, getTotalBalance } = useDebts();

  return (
    <>
      {debts.length > 0 && (
        <div className="debt-summary">
          <h2 className="text-2xl my-4">Debt Summary</h2>
          <p>
            It will take <span className="font-bold">{getMaxMonths()}</span>{" "}
            months to pay off all your debts.
          </p>
          <p>
            Your total debt balance is:{" "}
            {RenderCurrency(getTotalBalance(), "font-bold")}
          </p>
        </div>
      )}
    </>
  );
}

export default DebtSummary;
