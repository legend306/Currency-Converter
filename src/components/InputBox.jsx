import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
  dark = false,
}) {
  const amountInputId = useId();

  return (
    <div
      className={`flex items-center gap-4 ${dark ? "bg-gray-800/80" : "bg-white/90"} 
      p-5 rounded-2xl shadow-inner w-full ${className}`}
    >
      {/* Amount Input */}
      <div className="flex-1">
        <label
          htmlFor={amountInputId}
          className={`block mb-2 text-lg font-semibold ${
            dark ? "text-gray-200" : "text-gray-700"
          }`}
        >
          {label}
        </label>
        <input
          id={amountInputId}
          type="number"
          placeholder="0.00"
          disabled={amountDisable}
          value={amount}
          onFocus={(e) => {
            if (e.target.value === "0") e.target.value = "";
          }}
          onBlur={(e) => {
            if (e.target.value === "") e.target.value = "0";
          }}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
          className={`w-full px-4 py-3 rounded-lg text-xl font-medium outline-none border-2
            ${
              dark
                ? "bg-gray-900/80 text-white border-gray-700 placeholder-gray-400"
                : "bg-white text-gray-900 border-gray-300 placeholder-gray-400"
            }
            transition focus:border-blue-500 disabled:opacity-60 no-spinner`}
        />
      </div>

      {/* Currency Dropdown */}
      <div className="flex flex-col items-end min-w-[120px]">
        <label
          className={`mb-2 text-base font-medium ${
            dark ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Currency Type
        </label>
        <select
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
          className={`w-full px-3 py-2 rounded-lg text-base font-semibold cursor-pointer outline-none border-2
            ${
              dark
                ? "bg-gray-900/80 text-white border-gray-700"
                : "bg-gray-100 text-gray-900 border-gray-300"
            }
            transition focus:border-blue-500 disabled:opacity-60`}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
