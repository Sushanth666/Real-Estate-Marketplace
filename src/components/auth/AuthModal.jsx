import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Smartphone, 
  Mail, 
  ShieldCheck, 
  User, 
  Building, 
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginUser, 
    authModalMode, 
    setAuthModalMode 
  } = useMarketplace();

  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' | 'email'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('Buyer'); // 'Buyer' | 'Owner' | 'Agent'

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      alert('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    loginUser({
      name: fullName || 'Aarav Mehta',
      phone: `+91 ${phoneNumber}`,
      role: userRole,
      email: email || `user.${phoneNumber.slice(-4)}@bharatnivas.in`
    });
  };

  const handleEmailAuth = (e) => {
    e.preventDefault();
    loginUser({
      name: fullName || email.split('@')[0],
      email: email,
      role: userRole,
      phone: '+91 98200 45112'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full z-10 border border-slate-200"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Secure Indian PropTech Access</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-slate-900">
            {authModalMode === 'login' ? 'Welcome to BharatNivas' : 'Create Free Account'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access saved properties, chat with verified builders, and post free listings.
          </p>
        </div>

        {/* Role Selector (Buyer / Owner / Agent) */}
        <div className="mb-5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
            I am joining as:
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold text-center">
            {['Buyer', 'Owner', 'Agent'].map(role => (
              <button
                key={role}
                type="button"
                onClick={() => setUserRole(role)}
                className={`py-1.5 rounded-lg transition-all ${
                  userRole === role
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {role === 'Buyer' ? 'Home Buyer' : role === 'Owner' ? 'Owner' : 'Agent'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Switcher: Phone OTP vs Email */}
        <div className="flex border-b border-slate-200 mb-5">
          <button
            onClick={() => {
              setAuthMethod('phone');
              setOtpSent(false);
            }}
            className={`flex-1 pb-2.5 text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              authMethod === 'phone'
                ? 'text-brand-700 border-b-2 border-brand-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile OTP (+91)</span>
          </button>
          <button
            onClick={() => setAuthMethod('email')}
            className={`flex-1 pb-2.5 text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              authMethod === 'email'
                ? 'text-brand-700 border-b-2 border-brand-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email & Password</span>
          </button>
        </div>

        {/* Auth Method 1: Phone OTP */}
        {authMethod === 'phone' ? (
          !otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aditya Birla"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Indian Mobile Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs font-bold text-slate-700">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength="10"
                    placeholder="98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-r-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-brand-600/30"
              >
                <span>Send 6-Digit OTP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="bg-brand-50 border border-brand-200 p-3 rounded-xl text-xs text-brand-800">
                <p className="font-semibold">OTP sent to +91 {phoneNumber}</p>
                <p className="text-[11px] text-brand-700 mt-0.5">Demo OTP: <strong className="font-mono">842100</strong> (auto-filled)</p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Enter 6-Digit OTP
                </label>
                <input
                  type="text"
                  required
                  maxLength="6"
                  placeholder="842100"
                  defaultValue="842100"
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-center text-lg font-mono font-bold tracking-widest focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-md"
              >
                Verify & Continue
              </button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-center text-xs text-slate-500 hover:underline"
              >
                Change mobile number
              </button>
            </form>
          )
        ) : (
          /* Auth Method 2: Email & Password */
          <form onSubmit={handleEmailAuth} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@company.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-md shadow-brand-600/30"
            >
              Sign In to BharatNivas
            </button>
          </form>
        )}

        {/* Demo Fast Login helper */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
          <button
            onClick={() => loginUser({
              name: 'Arjun Singhania',
              phone: '+91 98200 88991',
              role: 'Verified Buyer',
              email: 'arjun.singhania@mumbai.in'
            })}
            className="text-[11px] font-bold text-slate-500 hover:text-brand-700 underline"
          >
            ⚡ Quick 1-Click Demo Login as "Arjun Singhania"
          </button>
        </div>

      </motion.div>
    </div>
  );
}
