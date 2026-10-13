import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  Car, 
  CheckCircle2, 
  ShieldCheck, 
  Phone 
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export function ScheduleVisitModal() {
  const { scheduleModalProp, setScheduleModalProp, showToast } = useMarketplace();

  const [visitType, setVisitType] = useState('in-person'); // 'in-person' | 'virtual'
  const [selectedDate, setSelectedDate] = useState('tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM - 1:00 PM');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!scheduleModalProp) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setScheduleModalProp(null);
      showToast('🎉 Site visit confirmed! Our executive will contact you to coordinate pickup.', 'success');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setScheduleModalProp(null)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-lg w-full z-10 border border-slate-200"
      >
        <button
          onClick={() => setScheduleModalProp(null)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isBooked ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-brand-500 mx-auto" />
            <h3 className="text-xl font-bold font-display text-slate-900">
              Visit Request Confirmed!
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your appointment for <strong>{scheduleModalProp.title}</strong> has been scheduled. An advisor will message you on WhatsApp.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                Verified Site Visit
              </span>
              <span className="text-xs text-slate-400">• Zero Fees</span>
            </div>

            <h2 className="text-xl font-bold font-display text-slate-900 mb-1">
              Schedule Property Inspection
            </h2>

            <p className="text-xs text-slate-500 line-clamp-1 mb-5">
              {scheduleModalProp.title} • {scheduleModalProp.locality}, {scheduleModalProp.city}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Visit Type Choice */}
              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Inspection Mode:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVisitType('in-person')}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                      visitType === 'in-person'
                        ? 'border-brand-600 bg-brand-50/70 text-brand-900 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Car className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs">In-Person Visit</span>
                      <span className="text-[10px] text-slate-400 font-normal">Chauffeur pick-up option</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitType('virtual')}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                      visitType === 'virtual'
                        ? 'border-brand-600 bg-brand-50/70 text-brand-900 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Video className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs">Live Video Tour</span>
                      <span className="text-[10px] text-slate-400 font-normal">HD WhatsApp / Zoom</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date Pills */}
              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Preferred Date:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'today', label: 'Today' },
                    { id: 'tomorrow', label: 'Tomorrow' },
                    { id: 'weekend', label: 'This Weekend' },
                  ].map(d => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDate(d.id)}
                      className={`py-2 px-2.5 rounded-xl text-center text-xs font-semibold border transition-all ${
                        selectedDate === d.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Time Slot:
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500"
                >
                  <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                  <option value="11:00 AM - 1:00 PM">Midday (11:00 AM - 1:00 PM)</option>
                  <option value="2:00 PM - 4:00 PM">Afternoon (2:00 PM - 4:00 PM)</option>
                  <option value="4:30 PM - 6:30 PM">Sunset Golden Hour (4:30 PM - 6:30 PM)</option>
                </select>
              </div>

              {/* Visitor Contact */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Aditya Sharma"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Inspection Appointment</span>
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
