import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { testimonialsData } from '../../data/testimonialsData';

export function Testimonials() {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-3">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Trusted by Over 2,400+ Families</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Client Stories & Experiences
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Read how homebuyers and NRI investors found their dream properties across Indian metropolises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-5 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-500">{item.role} • {item.city}</p>
                  </div>
                </div>

                <div className="mt-3 bg-white px-3 py-2 rounded-xl text-xs text-slate-600 flex items-center justify-between border border-slate-200/60">
                  <span className="font-semibold text-slate-800 truncate">{item.propertyPurchased}</span>
                  <span className="font-bold text-brand-700 shrink-0 ml-2">{item.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
