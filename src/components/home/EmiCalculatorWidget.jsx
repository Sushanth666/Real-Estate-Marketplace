import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  IndianRupee, 
  Percent, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { formatIndianCurrency, formatIndianNumber, calculateEMI } from '../../utils/formatters';

export function EmiCalculatorWidget() {
  const [loanAmount, setLoanAmount] = useState(15000000); // ₹1.5 Cr
  const [interestRate, setInterestRate] = useState(8.4); // 8.4%
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  const monthlyEMI = calculateEMI(loanAmount, interestRate, tenureYears);
  const totalMonths = tenureYears * 12;
  const totalPayment = monthlyEMI * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const principalRatio = Math.round((loanAmount / totalPayment) * 100) || 50;
  const interestRatio = 100 - principalRatio;

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Floating Ambient Glow Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-blob-delayed" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-400 bg-brand-950/80 px-3 py-1 rounded-full border border-brand-500/30 mb-3 shadow-md">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Financial Planning</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Calculate Your Monthly Home Loan EMI
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Plan your dream home budget with prevailing Indian banking rates from SBI, HDFC Bank, ICICI & Kotak.
          </p>
        </motion.div>

        {/* Calculator Main Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl mx-auto bg-slate-800/80 rounded-3xl p-6 sm:p-10 border border-slate-700 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          
          {/* Sliders Area (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Slider 1: Loan Amount */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Loan Amount
                </label>
                <span className="text-lg font-bold text-amber-400 font-display">
                  {formatIndianCurrency(loanAmount)}
                </span>
              </div>
              <input
                type="range"
                min="2000000"
                max="100000000"
                step="500000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500 hover:accent-brand-400 transition-all"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>₹20 Lakhs</span>
                <span>₹5 Crores</span>
                <span>₹10 Crores</span>
              </div>
            </div>

            {/* Slider 2: Interest Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Annual Interest Rate
                </label>
                <span className="text-lg font-bold text-brand-400 font-display">
                  {interestRate}% p.a.
                </span>
              </div>
              <input
                type="range"
                min="7.5"
                max="14.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500 hover:accent-brand-400 transition-all"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>7.5% (Prime)</span>
                <span>8.4% (Current Avg)</span>
                <span>14.0%</span>
              </div>
            </div>

            {/* Slider 3: Loan Tenure */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Loan Tenure
                </label>
                <span className="text-lg font-bold text-white font-display">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500 hover:accent-brand-400 transition-all"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>5 Years</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>

            {/* Supported Banks Badges */}
            <div className="pt-4 border-t border-slate-700/60">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Instant Approvals Partner Banks:
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">
                <span className="bg-slate-700/60 px-2.5 py-1 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors">SBI Home Loans</span>
                <span className="bg-slate-700/60 px-2.5 py-1 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors">HDFC Bank</span>
                <span className="bg-slate-700/60 px-2.5 py-1 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors">ICICI Bank</span>
                <span className="bg-slate-700/60 px-2.5 py-1 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors">Axis Bank</span>
              </div>
            </div>

          </div>

          {/* Results Summary Card (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-700 flex flex-col justify-between shadow-xl">
            <div>
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">
                Your Monthly EMI
              </p>
              <motion.div 
                key={monthlyEMI}
                initial={{ scale: 0.96, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-3xl sm:text-4xl font-extrabold font-display text-sky-400 mb-6"
              >
                {formatIndianCurrency(monthlyEMI)}
                <span className="text-xs text-slate-400 font-normal ml-1">/ month</span>
              </motion.div>

              {/* Progress Breakdown Bar */}
              <div className="space-y-2 mb-6">
                <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden flex">
                  <div 
                    style={{ width: `${principalRatio}%` }} 
                    className="bg-brand-500 h-full transition-all duration-300"
                    title={`Principal: ${principalRatio}%`}
                  />
                  <div 
                    style={{ width: `${interestRatio}%` }} 
                    className="bg-amber-500 h-full transition-all duration-300"
                    title={`Interest: ${interestRatio}%`}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                    Principal: {principalRatio}%
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Interest: {interestRatio}%
                  </span>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="space-y-3 py-4 border-t border-slate-800 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Principal Amount</span>
                  <span className="font-semibold text-white">{formatIndianCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Interest Payable</span>
                  <span className="font-semibold text-amber-400">{formatIndianCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-slate-800 pt-2">
                  <span className="text-slate-200">Total Amount (P + I)</span>
                  <span className="text-sky-400 font-display">{formatIndianCurrency(totalPayment)}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert('Home Loan pre-approval request submitted! An SBI/HDFC representative will connect with you.')}
              className="mt-6 w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-brand-600/30 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Apply Pre-Approved Loan</span>
            </motion.button>
          </div>

        </motion.div>

      </div>
    </section>
  );
}

