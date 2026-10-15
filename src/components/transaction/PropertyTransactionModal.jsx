import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Building2, 
  Key, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Phone, 
  Calendar, 
  CreditCard, 
  FileText, 
  Sparkles, 
  Lock, 
  ArrowRight,
  BadgeCheck,
  AlertCircle
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatIndianCurrency, formatIndianNumber } from '../../utils/formatters';

export function PropertyTransactionModal() {
  const {
    isTransactionModalOpen,
    closeTransactionModal,
    transactionModalProp,
    transactionType,
    currentUser,
    showToast
  } = useMarketplace();

  const isRent = transactionType === 'rent';

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Buy-specific
  const [financingOption, setFinancingOption] = useState('token'); // 'token' | 'loan' | 'full'
  const [hasLegalDueDiligence, setHasLegalDueDiligence] = useState(true);

  // Rent-specific
  const [moveInDate, setMoveInDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [leaseTenure, setLeaseTenure] = useState('11'); // '11' | '24' | '36'
  const [tenantType, setTenantType] = useState('Family'); // 'Family' | 'Working Professional' | 'Corporate'

  // Submission & Confirmation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [errors, setErrors] = useState({});

  // Sync user info if available
  useEffect(() => {
    if (currentUser) {
      if (!fullName) setFullName(currentUser.name || '');
      if (!email) setEmail(currentUser.email || '');
      if (!phone) setPhone(currentUser.phone || '+91 98200 44521');
    }
  }, [currentUser, isTransactionModalOpen]);

  // Reset state when opened with a new property
  useEffect(() => {
    if (isTransactionModalOpen) {
      setIsConfirmed(false);
      setErrors({});
      setBookingRef('');
    }
  }, [isTransactionModalOpen, transactionModalProp]);

  if (!isTransactionModalOpen || !transactionModalProp) return null;

  const prop = transactionModalProp;
  const basePrice = Number(prop.price) || (isRent ? 45000 : 15000000);

  // Financial calculations
  const stampDutyEstimate = isRent ? 0 : Math.round(basePrice * 0.05); // 5%
  const registrationEstimate = isRent ? 1500 : Math.round(basePrice * 0.01); // 1% or nominal
  const totalCost = isRent ? basePrice : basePrice + stampDutyEstimate + registrationEstimate;
  const tokenAdvance = isRent ? 5000 : 25000;
  const securityDeposit = isRent ? basePrice * 2 : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Please enter a valid email';
    if (!phone.trim() || phone.trim().length < 10) errs.phone = 'Please enter a valid 10-digit mobile number';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedCode = `${isRent ? 'BN-RENT' : 'BN-BUY'}-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(generatedCode);
      setIsConfirmed(true);
      showToast(
        isRent 
          ? `🎉 Rental request confirmed! Ref: ${generatedCode}` 
          : `🎉 Purchase booking confirmed! Ref: ${generatedCode}`,
        'success'
      );
    }, 800);
  };

  const handleDownloadReceipt = () => {
    const textContent = `
=============================================================
  BHARATNIVAS PREMIER REAL ESTATE MARKETPLACE - TRANSACTION RECEIPT
=============================================================
Reference ID: ${bookingRef}
Date: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
Type: ${isRent ? 'RENTAL APPLICATION & TOKEN RESERVATION' : 'PROPERTY PURCHASE & TOKEN ADVANCE BOOKING'}

PROPERTY DETAILS:
Title: ${prop.title}
Location: ${prop.locality || ''}, ${prop.city}
Configuration: ${prop.bhk} BHK • ${prop.builtUpArea} Sq.Ft
RERA ID: ${prop.reraId || 'Verified Listing'}
Listed By: ${prop.agentName || 'Verified Property Advisor'}

FINANCIAL SUMMARY:
${isRent 
  ? `Monthly Rent: ${formatIndianCurrency(basePrice)}/month
Security Deposit (Refundable): ${formatIndianCurrency(securityDeposit)}
Reservation Token: ${formatIndianCurrency(tokenAdvance)} (Paid via BharatNivas Escrow)`
  : `Agreed Property Value: ${formatIndianCurrency(basePrice)}
Estimated Stamp Duty & Govt Reg: ${formatIndianCurrency(stampDutyEstimate + registrationEstimate)}
BharatNivas Brokerage: ₹0 (Zero Brokerage Guarantee)
Express Token Advance: ${formatIndianCurrency(tokenAdvance)} (Held in Escrow)`
}

CLIENT INFORMATION:
Applicant Name: ${fullName}
Email: ${email}
Phone: ${phone}
${isRent ? `Target Move-In Date: ${moveInDate}\nLease Duration: ${leaseTenure} Months` : `Financing Preference: ${financingOption === 'loan' ? 'Home Loan Assisted (8.5% p.a.)' : financingOption === 'token' ? 'Token Advance Reserve' : 'Direct Full Wire'}`}

ESCROW & LEGAL PROTECTION:
All payments and initial token reservations are protected under 
BharatNivas Buyer/Tenant Guarantee with 100% refund protection.
Dedicated Advisor: ${prop.agentName || 'Senior RERA Advisor'} (${prop.agentPhone || '+91 98200 11223'})
=============================================================
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${bookingRef}_Receipt.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Receipt downloaded successfully! 📄', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeTransactionModal}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-2xl overflow-hidden z-10 my-8"
      >
        {/* Top Header Banner */}
        <div className={`p-6 text-white relative ${
          isRent 
            ? 'bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900' 
            : 'bg-gradient-to-r from-slate-900 via-brand-900 to-indigo-950'
        }`}>
          <button
            onClick={closeTransactionModal}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 ${
              isRent 
                ? 'bg-emerald-400/20 text-emerald-200 border border-emerald-400/30' 
                : 'bg-brand-400/20 text-amber-200 border border-amber-400/30'
            }`}>
              {isRent ? <Key className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
              <span>{isRent ? 'Verified Rental Lease Booking' : 'Express Purchase Proposal & Token Booking'}</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
            {isRent ? 'Proceed to Rent This Residence' : 'Proceed to Buy This Residence'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            {isRent 
              ? 'Lock in this property directly with the owner with standard digital lease and escrow protection.'
              : 'Lock in this luxury property with a token advance and 100% legal due diligence guarantee.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {isConfirmed ? (
            /* Confirmation Success Screen */
            <div className="text-center py-4 space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white shadow-xl ${
                  isRent ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-brand-600 shadow-brand-600/30'
                }`}
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {isRent ? 'Rental Application Confirmed' : 'Purchase Booking Confirmed'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-1">
                  Congratulations, {fullName}! 🎉
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                  Your reference ID is <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border">{bookingRef}</span>. 
                  Our dedicated RERA specialist has reserved this residence in our master ledger.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 text-left text-xs sm:text-sm space-y-3">
                <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Property:</span>
                  <span className="font-bold text-slate-900 text-right truncate max-w-[240px]">{prop.title}</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Location:</span>
                  <span className="font-semibold text-slate-800">{prop.locality}, {prop.city}</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">{isRent ? 'Monthly Rent:' : 'Property Price:'}</span>
                  <span className="font-extrabold text-brand-700">
                    {formatIndianCurrency(basePrice)} {isRent && '/ mo'}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Escrow Token Advance:</span>
                  <span className="font-bold text-emerald-600">{formatIndianCurrency(tokenAdvance)} (Hold Confirmed)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Assigned Advisor:</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-600" />
                    <span>{prop.agentName || 'BharatNivas Senior Advisor'}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleDownloadReceipt}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Digital Receipt (.txt)</span>
                </button>
                <button
                  onClick={closeTransactionModal}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Done & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            /* Purchase / Rental Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Selected Property Snapshot */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <img
                  src={prop.image || prop.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'}
                  alt={prop.title}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0 shadow-xs"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 uppercase">
                      {prop.propertyType || 'Residential'} • {prop.bhk} BHK
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 uppercase">
                      0% Brokerage
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm truncate">{prop.title}</h4>
                  <p className="text-xs text-slate-500 truncate">{prop.locality}, {prop.city}</p>
                  <p className="text-sm font-extrabold text-brand-700 mt-1">
                    {formatIndianCurrency(basePrice)} {isRent && <span className="text-xs text-slate-500 font-normal">/ month</span>}
                  </p>
                </div>
              </div>

              {/* Financial & Due Diligence Breakdown */}
              <div className="bg-gradient-to-br from-slate-50 to-brand-50/30 rounded-2xl p-5 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  {isRent ? 'Transparent Rental Terms' : 'All-Inclusive Acquisition Estimate'}
                </span>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>{isRent ? 'Monthly Rent' : 'Property Agreed Price'}</span>
                    <span className="font-bold text-slate-900">{formatIndianCurrency(basePrice)}</span>
                  </div>

                  {!isRent && (
                    <>
                      <div className="flex justify-between text-slate-600">
                        <span>Indicative Stamp Duty (~5%)</span>
                        <span className="font-medium text-slate-700">{formatIndianCurrency(stampDutyEstimate)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Registration & Legal Documentation</span>
                        <span className="font-medium text-slate-700">{formatIndianCurrency(registrationEstimate)}</span>
                      </div>
                    </>
                  )}

                  {isRent && (
                    <div className="flex justify-between text-slate-600">
                      <span>Refundable Security Deposit (2 Months)</span>
                      <span className="font-medium text-slate-700">{formatIndianCurrency(securityDeposit)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>BharatNivas Brokerage Fee</span>
                    <span className="font-bold text-emerald-600">₹0 Free Direct Guarantee</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                    <span>{isRent ? 'Estimated Total Move-in Amount' : 'Estimated Total Investment'}</span>
                    <span className="text-brand-700">{formatIndianCurrency(totalCost + securityDeposit)}</span>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs bg-white/70 p-2.5 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-700">Token to Hold Property:</span>
                  </div>
                  <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    {formatIndianCurrency(tokenAdvance)} (100% Refundable)
                  </span>
                </div>
              </div>

              {/* Applicant Information */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {isRent ? '1. Tenant Contact Details' : '1. Buyer Information'}
                  </span>
                  {currentUser ? (
                    <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      <span>Logged In as {currentUser.name}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500">Sign in anytime to sync your bookings</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-500 transition-colors ${
                        errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 11223"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-500 transition-colors ${
                        errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul.sharma@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-500 transition-colors ${
                        errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Specific Options: Buy (Financing) vs Rent (Lease Terms) */}
              {isRent ? (
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    2. Lease Preferences
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Move-in Date
                      </label>
                      <input
                        type="date"
                        value={moveInDate}
                        onChange={(e) => setMoveInDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Lease Duration
                      </label>
                      <select
                        value={leaseTenure}
                        onChange={(e) => setLeaseTenure(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium cursor-pointer"
                      >
                        <option value="11">11 Months (Standard)</option>
                        <option value="24">24 Months (2 Years)</option>
                        <option value="36">36 Months (3 Years)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Tenant Profile
                      </label>
                      <select
                        value={tenantType}
                        onChange={(e) => setTenantType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium cursor-pointer"
                      >
                        <option value="Family">Family</option>
                        <option value="Working Professional">Working Professional</option>
                        <option value="Corporate">Corporate Lease</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    2. Funding & Payment Preference
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label 
                      onClick={() => setFinancingOption('token')}
                      className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                        financingOption === 'token'
                          ? 'border-brand-600 bg-brand-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">Hold with Token</span>
                        <input 
                          type="radio" 
                          name="financing" 
                          checked={financingOption === 'token'} 
                          onChange={() => setFinancingOption('token')} 
                          className="text-brand-600"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500">Pay ₹25,000 token advance to lock listing for 14 days.</p>
                    </label>

                    <label 
                      onClick={() => setFinancingOption('loan')}
                      className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                        financingOption === 'loan'
                          ? 'border-brand-600 bg-brand-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">Home Loan</span>
                        <input 
                          type="radio" 
                          name="financing" 
                          checked={financingOption === 'loan'} 
                          onChange={() => setFinancingOption('loan')} 
                          className="text-brand-600"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500">Pre-approved partner banks: SBI, HDFC at 8.5% p.a.</p>
                    </label>

                    <label 
                      onClick={() => setFinancingOption('full')}
                      className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                        financingOption === 'full'
                          ? 'border-brand-600 bg-brand-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">Direct Wire</span>
                        <input 
                          type="radio" 
                          name="financing" 
                          checked={financingOption === 'full'} 
                          onChange={() => setFinancingOption('full')} 
                          className="text-brand-600"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500">Self-funded purchase via RTGS / Bank Draft.</p>
                    </label>
                  </div>
                </div>
              )}

              {/* RERA Escrow Guarantee Notice */}
              <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/90 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-emerald-900 block mb-0.5">
                    BharatNivas 100% Escrow Protection Pledge
                  </span>
                  Your token reservation amount is held securely in an independent RERA-compliant escrow account. If legal due diligence or physical inspection reveals any discrepancy, your token is refunded in full within 48 hours.
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-extrabold py-4 px-6 rounded-2xl text-sm text-white flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                    isRent
                      ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-emerald-700/25'
                      : 'bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-700 hover:from-brand-500 hover:to-indigo-600 shadow-brand-700/25'
                  } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span>Processing with RERA Escrow...</span>
                  ) : (
                    <>
                      <span>{isRent ? 'Confirm Rental Application & Hold Flat' : 'Confirm Purchase Booking & Reserve Property'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>

            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
