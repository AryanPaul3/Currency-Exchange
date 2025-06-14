import { useState , useEffect } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from , setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)


  const options = currencyInfo ? Object.keys(currencyInfo) : []

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }


  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount / currencyInfo[to])

    
  }



  return (
        <div
            className="bg-linear-to-bl from-yellow-900 to-yellow-900 w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            
        >
          
            <h1 className="bg-linear-to-br from-white to-butt text-transparent bg-clip-text h-20 text-5xl font-bold mb-5 absolute top-30 left-1/2 -translate-x-1/2">
                Currency Exchange
            </h1>
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-linear-to-br from-orange-300 to-hi shadow-lg">
                    <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                onAmountChange={setAmount}
                                onCurrencyChange={setFrom}
                                currencyOptions={options}
                                selectedCurrency={from}

                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-1 border-black rounded-md bg-butt text-black px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                onCurrencyChange={setTo}
                                currencyOptions={options}
                                selectedCurrency={to}
                                amountDisable={true}
                                
                            />
                        </div>
                        <button type="submit" 
                        className="w-full bg-butt text-black px-4 py-3 rounded-lg cursor-pointer "
                        >
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default App
