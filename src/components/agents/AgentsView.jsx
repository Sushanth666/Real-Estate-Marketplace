import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Award, 
  Calendar, 
  CheckCircle2, 
  X,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { realEstateAgents } from '../../data/agentsData';

export function AgentsView() {
  const { showToast } = useMarketplace();
  const [selectedCity, setSelectedCity] = useState('all');
  const [activeAdvisorModal, setActiveAdvisorModal] = useState(null);
  const [inquirySent, setInquirySent] = useState(false);

  const filteredAgents = realEstateAgents.filter(agent => {
    if (selectedCity === 'all') return true;
    return agent.city.toLowerCase() === selectedCity.toLowerCase();
  });

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setActiveAdvisorModal(null);
      showToast('Consultation request dispatched! Advisor will contact you within 2 business hours.', 'success');
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Accredited Channel Advisory Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            RERA Certified Real Estate Advisors
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Connect with vetted local specialists across India. Zero cold calling, complete transaction discretion, and verified title advisory.
          </p>

          {/* City Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-6 no-scrollbar">
            {['all', 'Tamil Nadu (Chennai)', 'Mumbai', 'Bengaluru', 'Delhi NCR', 'Goa'].map(city => (
              <motion.button
                key={city}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedCity(city === 'Tamil Nadu (Chennai)' ? 'Chennai (Tamil Nadu)' : city)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  (selectedCity === city || (city === 'Tamil Nadu (Chennai)' && selectedCity === 'Chennai (Tamil Nadu)'))
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {city === 'all' ? 'All Advisory Hubs' : city === 'Tamil Nadu (Chennai)' ? '⭐ Tamil Nadu (Chennai)' : city}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.map(agent => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Advisor Top Profile */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500/30 shadow-xs"
                    />
                    <div className="absolute -bottom-1.5 -right-1.5 bg-brand-600 text-white p-1 rounded-full shadow-xs" title="RERA Certified">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold font-display text-lg text-slate-900 leading-snug">
                      {agent.name}
                    </h3>
                    <p className="text-xs text-brand-700 font-semibold">{agent.title}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{agent.city} Division</span>
                    </p>
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center text-xs mb-5">
                  <div>
                    <span className="font-bold text-slate-900 block">{agent.experienceYears} Yrs</span>
                    <span className="text-[10px] text-slate-400 uppercase">Experience</span>
                  </div>
                  <div className="border-x border-slate-200/80">
                    <span className="font-bold text-slate-900 block">{agent.dealsClosedValue}</span>
                    <span className="text-[10px] text-slate-400 uppercase">Deals Value</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{agent.rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase">({agent.reviewsCount})</span>
                  </div>
                </div>

                {/* RERA Badge */}
                <div className="bg-brand-50/80 border border-brand-200/80 rounded-xl px-3 py-1.5 text-xs text-brand-800 font-medium mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
                  <span className="truncate">RERA: {agent.reraRegNo}</span>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {agent.bio}
                </p>

                {/* Specialties */}
                <div className="mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Areas of Expertise:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`https://wa.me/${agent.whatsapp?.replace(/[^0-9]/g, '') || '919820144521'}?text=Hi ${agent.name}, I would like to consult on properties listed on BharatNivas.`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 transition-colors"
                  title="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>

                <a
                  href={`tel:${agent.phone}`}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Call Phone"
                >
                  <Phone className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setActiveAdvisorModal(agent)}
                  className="flex-1 bg-slate-900 hover:bg-brand-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors text-center"
                >
                  Book Private Consultation
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Consultation Modal */}
      <AnimatePresence>
        {activeAdvisorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveAdvisorModal(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full z-10 border border-slate-200"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Consult with {activeAdvisorModal.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {activeAdvisorModal.reraRegNo}
                  </p>
                </div>
                <button
                  onClick={() => setActiveAdvisorModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {inquirySent ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-brand-500 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-slate-900">Request Sent!</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {activeAdvisorModal.name} will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Indian Mobile (+91)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Property Preference / Requirement
                    </label>
                    <textarea
                      rows="3"
                      placeholder={`Looking for 3/4 BHK in ${activeAdvisorModal.city} with budget around ₹3-5 Cr...`}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider"
                  >
                    Confirm Private Consultation
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
