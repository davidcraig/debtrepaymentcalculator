import useDebts from "../stores/debts";
import ucFirst from "../functions/ucFirst";

const nextMonth = (date: Date) => {
  const next = new Date(date);
  next.setMonth(next.getMonth() + 1);
  return next;
};

let month;

const renderMonthName = (date: Date) => {
  const options = { month: "long", year: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

function DebtSchedule() {
  const { debts } = useDebts();
  const now = new Date();

  const mappedDebts = debts.map((debt) => {
    return {
      name: debt.name,
      balance: debt.balance,
      monthlyMinimumPayment: debt.monthlyMinimumPayment,
      type: ucFirst(debt.type),
      months: Math.ceil(debt.balance / debt.monthlyMinimumPayment),
      newBalance: debt.balance,
    };
  });

  const maxMonths = mappedDebts.reduce((best, d) => {
    return d.months > best ? d.months : best;
  }, 0);

  const rows = [];

  month = nextMonth(now);
  for (let i = 0; i < maxMonths; i++) {
    rows.push(
      <tr key={i}>
        <td>{renderMonthName(month)}</td>
        {mappedDebts.map((debt) => {
          return (
            <td>
              {debt.newBalance > 0
                ? debt.newBalance > debt.monthlyMinimumPayment
                  ? (debt.newBalance -= debt.monthlyMinimumPayment)
                  : (debt.newBalance = 0)
                : ""}
            </td>
          );
        })}
      </tr>,
    );
    month = nextMonth(month);
  }

  return (
    <>
      {mappedDebts && mappedDebts.length > 0 && (
        <table className="table-auto md:table-fixed w-full">
          <thead>
            <tr>
              <th>Date</th>
              {mappedDebts.map((debt) => (
                <th key={debt.name}>{debt.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>{rows.map((r) => r)}</tbody>
        </table>
      )}
    </>
  );
}

export default DebtSchedule;
