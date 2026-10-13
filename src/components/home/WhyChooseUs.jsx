import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  Clock, 
  Scale, 
  Award,
  Users
} from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-600" />,
      title: '100% RERA Diligence',
      description: 'Every project is cross-referenced with State RERA databases. Zero unregistered listings or disputed land parcels.'
    },
    {
      icon: <Eye className="w-6 h-6 text-brand-600" />,
      title: 'Curated 3D & Aerial Tours',
      description: 'Experience immersive virtual floor plans, real architectural footage, and drone views of neighborhoods before you visit.'
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      title: 'Zero Broker Spam Guarantee',
      description: 'Your contact details are protected. No endless marketing calls — communicate exclusively via scheduled slots.'
    },
    {
      icon: <Scale className="w-6 h-6 text-blue-600" />,
      title: 'Side-by-Side Comparison',
      description: 'Benchmark up to 4 homes on super built-up area, carpet efficiency, price per sq.ft, and clubhouse amenities.'
    },
    {
      icon: <Award className="w-6 h-6 text-rose-600" />,
      title: 'Legal Title Verification',
      description: 'Access 30-year search reports, encumbrance certificates, and sanctioned building plan approvals through our empanelled advocates.'
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: 'Certified Channel Advisors',
      description: 'Work with accredited local specialists with minimum 8+ years experience in South Mumbai, Gurgaon, Indiranagar, and Goa.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>The BharatNivas Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Redefining How India Buys Luxury Homes
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Built for modern homebuyers and NRIs who value transparency, architectural excellence, and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
