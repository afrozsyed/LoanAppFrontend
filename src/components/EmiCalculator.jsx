import React, {useState} from 'react';
import { useForm } from 'react-hook-form';

function EmiCalculator() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [breakdown, setBreakdown] = useState([]);

    const onSubmit = (data) => {
        const principal = parseFloat(data.principal);
        const interestRate = parseFloat(data.interestRate);
        const tenure = parseInt(data.tenure);
    
        const monthlyInterestRate = interestRate / 12 / 100;
        const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) /
                    (Math.pow(1 + monthlyInterestRate, tenure) - 1);
        const totalPayable = emi * tenure;
        const totalInterest = totalPayable - principal;
    
        const monthlyBreakdown = [];
        let remainingPrincipal = principal;
    
        for (let i = 1; i <= tenure; i++) {
          const interestComponent = remainingPrincipal * monthlyInterestRate;
          const principalComponent = emi - interestComponent;
          remainingPrincipal -= principalComponent;
    
          monthlyBreakdown.push({
            month: i,
            emi: emi.toFixed(2),
            interestComponent: interestComponent.toFixed(2),
            principalComponent: principalComponent.toFixed(2),
            remainingPrincipal: remainingPrincipal.toFixed(2),
          });
        }
    
        setResult({
          emi: emi.toFixed(2),
          totalPayable: totalPayable.toFixed(2),
          totalInterest: totalInterest.toFixed(2),
        });
    
        setBreakdown(monthlyBreakdown);
      };

  return (
    <div className=" mx-4 mt-10 p-4 border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Loan EMI Calculator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Principal Amount</label>
          <input
            type="number"
            step="0.01"
            {...register('principal', { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Interest Rate (%)</label>
          <input
            type="range"
            min="0"
            max="35"
            step="0.1"
            {...register('interestRate', { required: true })}
            className="w-full"
          />
          <span className="block mt-2 text-gray-600">{watch('interestRate', 0)}%</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Tenure (months)</label>
          <input
            type="number"
            {...register('tenure', { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Calculate EMI
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border-t border-gray-300">
          <h2 className="text-xl font-semibold text-center mb-4">EMI Calculation</h2>
          <p><strong>EMI:</strong> ₹{result.emi}</p>
          <p><strong>Total Payable:</strong> ₹{result.totalPayable}</p>
          <p><strong>Total Interest Payable:</strong> ₹{result.totalInterest}</p>

          <h3 className="text-lg font-semibold mt-6">Monthly Breakdown</h3>
          <div className="overflow-auto">
            <table className="table-auto w-full mt-4 text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 p-2">Month</th>
                  <th className="border-b-2 p-2">EMI</th>
                  <th className="border-b-2 p-2">Interest</th>
                  <th className="border-b-2 p-2">Principal</th>
                  <th className="border-b-2 p-2">Remaining Principal</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b p-2">{item.month}</td>
                    <td className="border-b p-2">₹{item.emi}</td>
                    <td className="border-b p-2">₹{item.interestComponent}</td>
                    <td className="border-b p-2">₹{item.principalComponent}</td>
                    <td className="border-b p-2">₹{item.remainingPrincipal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmiCalculator