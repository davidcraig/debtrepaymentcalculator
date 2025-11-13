export function RenderCurrency(value: number) {
  console.log(value);
  return (
    <span className={`currency ${value == 0 ? "zero" : "value"}`}>
      {value.toLocaleString("en-GB", { style: "currency", currency: "GBP" })}
    </span>
  );
}

export default RenderCurrency;
