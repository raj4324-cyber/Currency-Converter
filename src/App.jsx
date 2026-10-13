import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencuinfo'
import './App.css'

function App() {
  const [amount, setAmount] = useState("")
  const [from, setfrom] = useState("usd")
  const [to, setto] = useState("inr")
  const [convertedamount, setconvertedamount] = useState("")

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setfrom(to)
    setto(from)
    setAmount(convertedamount)
    setconvertedamount(amount)
  }

  const convert = () => {
    const rate = currencyInfo[to]
    if (amount === "" || rate === undefined) return
    setconvertedamount(Number((amount * rate).toFixed(4)))
  }

  return (
    <>
      <h1
  className="text-4xl text-center py-4"
  style={{
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontWeight: 600,
    color: '#f3ead2',
    background: '#0c2b2e',
    borderBottom: '3px solid #c9a24b',
    letterSpacing: '0.02em',
  }}
>
  Currency Exchange
</h1>
    <div
  className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
  style={{
    backgroundColor: '#0c2b2e',
    backgroundImage: `
      radial-gradient(circle at 20% 15%, rgba(201,162,75,0.25), transparent 45%),
      radial-gradient(circle at 85% 90%, rgba(45,120,110,0.45), transparent 50%),
      repeating-radial-gradient(circle at 50% 120%, rgba(201,162,75,0.10) 0 2px, transparent 2px 14px)
    `,
  }}
>
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                convert()
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOption={options}
                  onCurrencyChange={(currency) => setfrom(currency)}
                  onAmountChange={(value) => setAmount(value)}
                  selectCurrency={from}
                />
              </div>

              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  swap
                </button>
              </div>

              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedamount}
                  currencyOption={options}
                  onCurrencyChange={(currency) => setto(currency)}
                  selectCurrency={to}
                  amountdisable
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App