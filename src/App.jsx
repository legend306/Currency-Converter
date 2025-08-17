import { useState /*, useEffect */ } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("pkr");
  const [to, setTo] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo || {});

  // ✅ Fix: swap puts result on top, clears bottom
  const swap = () => {
    const prevFrom = from;
    const prevTo = to;
    const prevConverted = Number(convertedAmount) || 0;

    setFrom(prevTo);
    setTo(prevFrom);
    setAmount(prevConverted);
    setConvertedAmount(0); // clear result so "7" doesn't appear
  };

  // ✅ Safer convert (keeps number type, guards missing rates)
  const convert = () => {
    const rate = Number(currencyInfo?.[to]);
    const amt = Number(amount);
    if (!rate || !Number.isFinite(amt)) {
      setConvertedAmount(0);
      return;
    }
    const result = amt * rate;
    setConvertedAmount(Number(result.toFixed(2))); // keep it a number
  };

  // OPTIONAL: If you want it to auto-recalculate after swap, uncomment:
  // useEffect(() => {
  //   if (amount && currencyInfo?.[to]) convert();
  // }, [from, to, amount, currencyInfo]); // keeps bottom synced automatically

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-fixed flex items-center justify-center px-4 py-8 relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80)",
        backgroundBlendMode: "multiply",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      <div className="relative w-full max-w-lg z-10">
        <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-3xl p-10 shadow-2xl">
          <h1 className="text-4xl font-extrabold text-center text-blue-300 mb-10 tracking-tight drop-shadow-lg">
            Currency Converter
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
            className="space-y-8"
          >
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onAmountChange={setAmount}
              onCurrencyChange={setFrom}
              selectCurrency={from}
              dark
            />

            {/* Swap button */}
            <div className="flex justify-center">
  <button
    type="button"
    onClick={(e) => {
      swap();
      // 🔥 Immediately blur after click
      e.currentTarget.blur();
    }}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        // 🔥 Force trigger form submit (Convert)
        e.preventDefault();
        e.currentTarget.form.requestSubmit();
      }
    }}
    className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl hover:bg-blue-400 hover:scale-110 transition text-3xl border-4 border-blue-300"
    title="Swap currencies"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-8 h-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v2.25A2.25 2.25 0 0 1 17.25 18.75H6.75A2.25 2.25 0 0 1 4.5 16.5V14.25m15-4.5V7.5A2.25 2.25 0 0 0 17.25 5.25H6.75A2.25 2.25 0 0 0 4.5 7.5v2.25m0 0L8.25 6m-3.75 3.75L8.25 12m7.5 0l3.75-3.75m-3.75 3.75L15.75 6"
      />
    </svg>
  </button>
</div>



            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={setTo}
              selectCurrency={to}
              amountDisable
              dark
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition text-lg tracking-wide"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
