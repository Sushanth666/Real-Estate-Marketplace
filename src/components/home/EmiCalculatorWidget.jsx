import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  IndianRupee, 
  Percent, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Plus,
  Minus,
  TrendingUp,
  Building2,
  Lock
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatIndianCurrency, formatIndianNumber, calculateEMI } from '../../utils/formatters';

const PARTNER_BANKS = [
  { id: 'sbi', name: 'SBI Home Loans', rate: 8.40, tag: 'Lowest Floating', logo: '🏛️' },
  { id: 'hdfc', name: 'HDFC Bank', rate: 8.50, tag: 'Most Popular', logo: '🏦' },
  { id: 'icici', name: 'ICICI Bank', rate: 8.60, tag: 'Instant Disbursal', logo: '⚡' },
  { id: 'axis', name: 'Axis Bank', rate: 8.75, tag: 'Flexible Terms', logo: '🎯' },
];

const LOAN_PRESETS = [
  { label: '₹50 L', value: 5000000 },
  { label: '₹1 Cr', value: 10000000 },
  { label: '₹1.5 Cr', value: 15000000 },
  { label: '₹2.5 Cr', value: 25000000 },
  { label: '₹5 Cr', value: 50000000 },
];

const TENURE_PRESETS = [
  { label: '10 Yrs', value: 10 },
  { label: '15 Yrs', value: 15 },
  { label: '20 Yrs', value: 20 },
  { label: '25 Yrs', value: 25 },
  { label: '30 Yrs', value: 30 },
];

export function EmiCalculatorWidget() {
  const { showToast } = useMarketplace();
  const [loanAmount, setLoanAmount] = useState(15000000); // ₹1.5 Cr
  const [interestRate, setInterestRate] = useState(8.4); // 8.4%
  const [tenureYears, setTenureYears] = useState(20); // 20 years
  const [selectedBankId, setSelectedBankId] = useState('sbi');
  const [isApplied, setIsApplied] = useState(false);

  // EMI Calculations
  const monthlyEMI = calculateEMI(loanAmount, interestRate, tenureYears);
  const totalMonths = tenureYears * 12;
  const totalPayment = monthlyEMI * totalMonths;
  const totalInterest = Math.max(0, totalPayment - loanAmount);
  const dailyCost = Math.round(monthlyEMI / 30);

  const principalRatio = Math.round((loanAmount / totalPayment) * 100) || 50;
  const interestRatio = 100 - principalRatio;

  // Active bank check
  const activeBank = PARTNER_BANKS.find(b => b.id === selectedBankId);

  // Slider Track Fill Gradient Helper
  const getTrackBackground = (value, min, max, fromColor = '#06b6d4', toColor = '#2563eb') => {
    const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
    return `linear-gradient(to right, ${fromColor} 0%, ${toColor} ${percentage}%, #1e293b ${percentage}%, #1e293b 100%)`;
  };

  const handleBankSelect = (bank) => {
    setSelectedBankId(bank.id);
    setInterestRate(bank.rate);
  };

  const handleApplyLoan = () => {
    setIsApplied(true);
    if (showToast) {
      showToast(`Pre-approved loan application initiated with ${activeBank?.name || 'Partner Bank'}! An advisor will call you within 15 minutes.`, 'success');
    }
    setTimeout(() => setIsApplied(false), 4500);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 via-[#070d1e] to-slate-950 text-white relative overflow-hidden">
      {/* Background Ambient Glow Orbs & Grid Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[450px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Dot Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-3.5 py-1.5 rounded-full mb-4 shadow-lg shadow-cyan-950/50 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Interactive Financial Intelligence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
            Calculate Your Home Loan EMI
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Real-time monthly installment modeling with prevailing Indian banking interest rates from top institutional lenders.
          </p>
        </motion.div>

        {/* Main Glassmorphic Calculator Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-6xl mx-auto bg-slate-900/75 border border-slate-800/90 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
        >
          
          {/* LEFT COLUMN: Controls & Sliders (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* 1. SLIDER CARD: LOAN AMOUNT */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 transition-all hover:border-slate-700/80 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Loan Amount
                    </span>
                    <span className="text-[11px] text-slate-500">Up to ₹10 Crores</span>
                  </div>
                </div>

                {/* Amount Display & Micro-Steppers */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLoanAmount(prev => Math.max(2000000, prev - 1000000))}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
                    title="Decrease by ₹10 Lakhs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400 font-display min-w-[95px] text-right">
                    {formatIndianCurrency(loanAmount)}
                  </span>
                  <button
                    onClick={() => setLoanAmount(prev => Math.min(100000000, prev + 1000000))}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
                    title="Increase by ₹10 Lakhs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Slider Input with Dynamic Fill */}
              <input
                type="range"
                min="2000000"
                max="100000000"
                step="500000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                style={{ background: getTrackBackground(loanAmount, 2000000, 100000000, '#06b6d4', '#3b82f6') }}
                className="fintech-slider mb-3"
              />

              {/* Quick Preset Buttons */}
              <div className="flex items-center justify-between gap-1.5 flex-wrap pt-1">
                {LOAN_PRESETS.map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => setLoanAmount(preset.value)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      loanAmount === preset.value
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. SLIDER CARD: INTEREST RATE */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 transition-all hover:border-slate-700/80 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Annual Interest Rate
                    </span>
                    <span className="text-[11px] text-slate-500">Benchmark Repo Linked</span>
                  </div>
                </div>

                {/* Rate Display & Steppers */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setInterestRate(prev => Math.max(7.5, parseFloat((prev - 0.1).toFixed(2))));
                      setSelectedBankId(null);
                    }}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
                    title="Decrease by 0.1%"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 font-display min-w-[75px] text-right">
                    {interestRate}% <span className="text-xs text-slate-400 font-normal">p.a.</span>
                  </span>
                  <button
                    onClick={() => {
                      setInterestRate(prev => Math.min(14.0, parseFloat((prev + 0.1).toFixed(2))));
                      setSelectedBankId(null);
                    }}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
                    title="Increase by 0.1%"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Slider Input with Dynamic Fill */}
              <input
                type="range"
                min="7.5"
                max="14.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => {
                  setInterestRate(Number(e.target.value));
                  setSelectedBankId(null);
                }}
                style={{ background: getTrackBackground(interestRate, 7.5, 14.0, '#f59e0b', '#ef4444') }}
                className="fintech-slider mb-2"
              />

              <div className="flex justify-between text-[11px] text-slate-500">
                <span>7.5% (Prime)</span>
                <span>8.4% (Current Market Avg)</span>
                <span>14.0%</span>
              </div>
            </div>

            {/* 3. SLIDER CARD: LOAN TENURE */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 transition-all hover:border-slate-700/80 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Loan Tenure
                    </span>
                    <span className="text-[11px] text-slate-500">{tenureYears * 12} Installments</span>
                  </div>
                </div>

                {/* Tenure Display & Steppers */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTenureYears(prev => Math.max(5, prev - 1))}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
                    title="Decrease by 1 Year"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-lg sm:text-xl font-extrabold text-white font-display min-w-[70px] text-right">
                    {tenureYears} <span className="text-xs text-slate-400 font-normal">Years</span>
                  </span>
                  <button
                    onClick={() => setTenureYears(prev => Math.min(30, prev + 1))}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
                    title="Increase by 1 Year"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Slider Input with Dynamic Fill */}
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                style={{ background: getTrackBackground(tenureYears, 5, 30, '#3b82f6', '#8b5cf6') }}
                className="fintech-slider mb-3"
              />

              {/* Quick Tenure Preset Chips */}
              <div className="flex items-center justify-between gap-1.5 flex-wrap pt-1">
                {TENURE_PRESETS.map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => setTenureYears(preset.value)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      tenureYears === preset.value
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 shadow-sm'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. INTERACTIVE PARTNER BANK LENDERS */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Select Partner Bank for Instant Pre-Approval</span>
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold">Special Digital Rates</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PARTNER_BANKS.map(bank => {
                  const isSelected = selectedBankId === bank.id;
                  return (
                    <button
                      key={bank.id}
                      onClick={() => handleBankSelect(bank)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
                        isSelected 
                          ? 'bg-gradient-to-br from-cyan-950/80 to-blue-950/80 border-cyan-400/80 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400' 
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base">{bank.logo}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        )}
                      </div>
                      <div className="font-bold text-xs text-white truncate">
                        {bank.name}
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[11px]">
                        <span className="text-amber-400 font-extrabold">{bank.rate}%</span>
                        <span className="text-[10px] text-slate-400 truncate">{bank.tag}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: The Financial Intelligence Vault (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-slate-950/95 rounded-3xl p-6 sm:p-7 border border-cyan-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            
            {/* Top Cyan Light Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            <div>
              {/* Card Header & Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                  Estimated Monthly EMI
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Approx ₹{dailyCost.toLocaleString('en-IN')}/day
                </span>
              </div>

              {/* Monthly EMI Big Number */}
              <motion.div 
                key={monthlyEMI}
                initial={{ scale: 0.96, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 450, damping: 20 }}
                className="mb-6"
              >
                <div className="text-4xl sm:text-5xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400">
                  {formatIndianCurrency(monthlyEMI)}
                  <span className="text-xs sm:text-sm font-normal text-slate-400 ml-1.5 tracking-normal">
                    / month
                  </span>
                </div>
              </motion.div>

              {/* Dual Progress Breakdown Bar */}
              <div className="space-y-2.5 mb-7 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300">Payment Composition</span>
                  <span className="text-slate-400 text-[11px]">{totalMonths} Months Total</span>
                </div>

                <div className="h-3.5 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5 shadow-inner">
                  <motion.div 
                    layout
                    initial={{ width: 0 }}
                    animate={{ width: `${principalRatio}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-l-full shadow-sm"
                    title={`Principal: ${principalRatio}%`}
                  />
                  <motion.div 
                    layout
                    initial={{ width: 0 }}
                    animate={{ width: `${interestRatio}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-r-full shadow-sm"
                    title={`Interest: ${interestRatio}%`}
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-xs" />
                    Principal: <strong className="text-white">{principalRatio}%</strong>
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-xs" />
                    Interest: <strong className="text-amber-400">{interestRatio}%</strong>
                  </span>
                </div>
              </div>

              {/* Key Financial Metrics */}
              <div className="space-y-3.5 py-4 border-t border-slate-800/80 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    Principal Amount
                  </span>
                  <span className="font-bold text-white font-display text-sm sm:text-base">
                    {formatIndianCurrency(loanAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Total Interest Payable
                  </span>
                  <span className="font-bold text-amber-400 font-display text-sm sm:text-base">
                    {formatIndianCurrency(totalInterest)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-slate-200 font-semibold text-xs sm:text-sm">
                    Total Amount (P + I)
                  </span>
                  <span className="text-base sm:text-lg font-black text-cyan-300 font-display">
                    {formatIndianCurrency(totalPayment)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Action Section */}
            <div className="pt-4 border-t border-slate-800/80 mt-2">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApplyLoan}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                  isApplied
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                    : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-brand-600 hover:from-cyan-400 hover:to-brand-500 text-white shadow-cyan-500/25'
                }`}
              >
                {isApplied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Application Submitted!</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Apply Pre-Approved Loan</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </motion.button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 mt-2.5">
                <Lock className="w-3 h-3 text-slate-600" />
                <span>100% Paperless • Zero CIBIL Impact • Disbursal in 24 Hrs</span>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
