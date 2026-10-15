import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  ArrowRight,
  AlertCircle, 
  CheckCircle2,
  Eye,
  EyeOff,
  Building2
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginUser, 
    authModalMode, 
    setAuthModalMode,
    pendingSavePropertyId,
    pendingOpenPostProperty,
    properties,
    showToast 
  } = useMarketplace();

  const pendingSaveProperty = pendingSavePropertyId 
    ? properties.find(p => p.id === pendingSavePropertyId) 
    : null;

  // Local storage of registered users so created accounts persist
  const [registeredAccounts, setRegisteredAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('bharatnivas_users');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userRole, setUserRole] = useState('Buyer'); // 'Buyer' | 'Owner' | 'Agent'
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [signupSuccessMsg, setSignupSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  // Switch between Login and Register tabs with clean state
  const handleSwitchMode = (mode) => {
    setAuthModalMode(mode);
    setEmailError('');
    setPassword('');
    setConfirmPassword('');
    if (mode === 'register') {
      setSignupSuccessMsg('');
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setEmailError('');

    if (!email.trim() || !password) {
      setEmailError('Please enter both email and password.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setEmailError('Password must be at least 6 characters.');
      return;
    }

    // 1. SIGNUP FLOW: Create account, redirect to Login page with blank password
    if (authModalMode === 'register') {
      if (!fullName.trim()) {
        setEmailError('Please enter your full name.');
        return;
      }
      if (confirmPassword && password !== confirmPassword) {
        setEmailError('Passwords do not match.');
        return;
      }

      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);

        const newUserData = {
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          password: password,
          role: userRole === 'Buyer' ? 'Verified Home Buyer' : userRole === 'Owner' ? 'Verified Property Owner' : 'Certified RERA Agent',
          phone: '+91 98200 88991'
        };

        const updatedUsers = {
          ...registeredAccounts,
          [email.trim().toLowerCase()]: newUserData
        };

        setRegisteredAccounts(updatedUsers);
        try {
          localStorage.setItem('bharatnivas_users', JSON.stringify(updatedUsers));
        } catch (err) {
          console.error(err);
        }

        // Switch to Sign In mode
        setAuthModalMode('login');
        // Clear passwords so login page is clean and blank for login
        setPassword('');
        setConfirmPassword('');
        setSignupSuccessMsg(`Account created for ${fullName.trim()}! Please enter your password to sign in.`);
        showToast('🎉 Account created! Please sign in to continue.', 'success');
      }, 350);
      return;
    }

    // 2. LOGIN FLOW: Validate credentials and log user in
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const cleanEmail = email.trim().toLowerCase();
      const existing = registeredAccounts[cleanEmail];

      if (existing && existing.password && existing.password !== password) {
        setEmailError('Incorrect password. Please verify your password and try again.');
        return;
      }

      const userName = existing?.name || fullName.trim() || email.split('@')[0];
      const role = existing?.role || (userRole === 'Buyer' ? 'Verified Home Buyer' : userRole === 'Owner' ? 'Verified Property Owner' : 'Certified RERA Agent');

      loginUser({
        name: userName,
        email: cleanEmail,
        role: role,
        phone: existing?.phone || '+91 98200 88991'
      });

      showToast(`Welcome back, ${userName}! 🇮🇳`, 'success');
    }, 350);
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
        className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full z-10 border border-slate-200 overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <div className="absolute top-5 right-5">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-tr from-brand-700 to-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-brand-600/30 text-white">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {authModalMode === 'login' ? 'Sign In to BharatNivas' : 'Create Free Account'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {authModalMode === 'login' 
              ? 'Enter your email and password to access your saved homes and alerts.'
              : 'Join verified home buyers, owners, and top RERA builders across India.'}
          </p>
        </div>

        {/* Pending Save Property Alert Card */}
        {pendingSaveProperty && (
          <div className="mb-5 p-3 rounded-2xl bg-rose-50/90 border border-rose-200/90 flex items-center gap-3 text-left shadow-xs">
            <img 
              src={pendingSaveProperty.image || pendingSaveProperty.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80'} 
              alt={pendingSaveProperty.title} 
              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-rose-300"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-extrabold text-rose-700 uppercase tracking-wider block">
                Sign In to Save Property
              </span>
              <p className="text-xs font-bold text-slate-900 truncate">{pendingSaveProperty.title}</p>
              <p className="text-[11px] text-slate-500">Sign in to automatically save this to your account favorites ❤️</p>
            </div>
          </div>
        )}

        {/* Pending Post Property Alert Card */}
        {pendingOpenPostProperty && !pendingSaveProperty && (
          <div className="mb-5 p-3 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex items-center gap-3 text-left shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider block">
                Compulsory Login Required
              </span>
              <p className="text-xs font-bold text-slate-900 truncate">Post Your Property on BharatNivas</p>
              <p className="text-[11px] text-slate-500">Sign in to add details and publish with verified owner status 🏡</p>
            </div>
          </div>
        )}

        {/* Segmented Mode Switcher (Sign In vs Create Account) with smooth layout sliding pill */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-5 text-xs font-bold text-center relative">
          <button
            type="button"
            onClick={() => handleSwitchMode('login')}
            className={`relative flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              authModalMode === 'login' ? 'text-brand-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {authModalMode === 'login' && (
              <motion.div
                layoutId="authTabPill"
                className="absolute inset-0 bg-white rounded-lg shadow-xs"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode('register')}
            className={`relative flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              authModalMode === 'register' ? 'text-brand-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {authModalMode === 'register' && (
              <motion.div
                layoutId="authTabPill"
                className="absolute inset-0 bg-white rounded-lg shadow-xs"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">Create Account</span>
          </button>
        </div>

        {/* Signup Success Banner (Shown on login page after successful registration) */}
        {authModalMode === 'login' && signupSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-emerald-50 border border-emerald-200/90 p-3 rounded-2xl text-xs text-emerald-900 flex items-start gap-2.5 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-950">Registration Complete!</p>
              <p className="text-[11px] text-emerald-800 mt-0.5 leading-snug">{signupSuccessMsg}</p>
            </div>
          </motion.div>
        )}

        {/* Role Selector (visible in Create Account mode) */}
        {authModalMode === 'register' && (
          <div className="mb-4">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              I am joining as:
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold text-center">
              {[
                { id: 'Buyer', label: 'Home Buyer' },
                { id: 'Owner', label: 'Owner' },
                { id: 'Agent', label: 'Agent / Builder' }
              ].map(role => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setUserRole(role.id)}
                  className={`py-1.5 rounded-lg transition-all cursor-pointer text-[11px] ${
                    userRole === role.id
                      ? 'bg-white text-brand-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-3.5">
          {/* Full Name Field (Register Mode Only) */}
          {authModalMode === 'register' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sree"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setEmailError('');
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Email Address Field */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                className={`w-full bg-slate-50 border ${
                  emailError ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:ring-brand-500'
                } rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:bg-white focus:outline-none transition-all`}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 block">
                {authModalMode === 'register' ? 'Create Password' : 'Password'}
              </label>
              {authModalMode === 'login' && (
                <button
                  type="button"
                  onClick={() => showToast('Password reset link sent to your email.', 'info')}
                  className="text-[11px] font-semibold text-brand-600 hover:text-brand-700 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder={authModalMode === 'register' ? 'At least 6 characters' : 'Enter your password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setEmailError('');
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field (Register Mode Only) */}
          {authModalMode === 'register' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setEmailError('');
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {emailError && (
            <div className="bg-red-50 border border-red-200 p-2.5 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{emailError}</span>
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-brand-600/30 hover:shadow-lg hover:shadow-brand-600/40 cursor-pointer"
          >
            <span>{authModalMode === 'register' ? 'Create Free Account' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>

          {/* Toggle between Sign In and Create Account */}
          <div className="text-center text-xs text-slate-500 pt-2">
            {authModalMode === 'register' ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('login')}
                  className="font-bold text-brand-600 hover:text-brand-700 hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('register')}
                  className="font-bold text-brand-600 hover:text-brand-700 hover:underline cursor-pointer"
                >
                  Create Free Account
                </button>
              </span>
            )}
          </div>
        </form>


      </motion.div>
    </div>
  );
}
