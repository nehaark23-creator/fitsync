import { useState } from 'react';
import { Check, Star, Zap, ArrowRight, Shield, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionHeading, { Reveal } from '@/components/ui/SectionHeading';
import { plans } from '@/data/mockData';

export default function Plans() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const faqs = [
    { q: 'Can I switch plans anytime?', a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we prorate the difference.' },
    { q: 'Is there a free trial?', a: 'Every new member gets a 7-day free trial with full access to all Standard plan features. No credit card required.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, debit cards, and digital wallets. Payment integration is coming soon.' },
    { q: 'Can I freeze my membership?', a: 'Yes, you can freeze your membership for up to 3 months per year at no additional cost. Perfect for travel or recovery.' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/896062/pexels-photo-896062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/80 to-ink-950" />
        </div>
        <div className="relative container-x text-center">
          <span className="section-label animate-fade-up">
            <Star size={14} />
            Membership Plans
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white animate-fade-up animate-delay-100">
            Choose Your <span className="text-gradient">Path</span>
          </h1>
          <p className="mt-6 text-lg text-ink-300 max-w-2xl mx-auto animate-fade-up animate-delay-200">
            Transparent pricing. No hidden fees. Pick the plan that fits your goals and start training today.
          </p>

          {/* Billing toggle */}
          <div className="mt-10 inline-flex items-center gap-1 glass rounded-2xl p-1.5 animate-fade-up animate-delay-300">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                billing === 'monthly' ? 'bg-red-500 text-ink-950' : 'text-ink-200 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                billing === 'yearly' ? 'bg-red-500 text-ink-950' : 'text-ink-200 hover:text-white'
              }`}
            >
              Yearly
              <span className={`badge text-[10px] px-2 py-0.5 ${billing === 'yearly' ? 'bg-ink-950/20 text-ink-950' : 'bg-red-500/20 text-red-500'}`}>
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 md:pb-28">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => {
              const price = billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
              const period = billing === 'monthly' ? '/mo' : '/yr';
              return (
                <Reveal key={plan.id} delay={`animate-delay-${(i + 1) * 100}`}>
                  <div className={`relative glass rounded-2xl p-8 card-hover h-full flex flex-col ${
                    plan.recommended ? 'border-red-500/40 shadow-[0_0_40px_rgba(0,255,102,0.1)]' : ''
                  }`}>
                    {plan.recommended && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="badge bg-red-500 text-ink-950 px-4 py-1.5 shadow-lg">
                          <Star size={12} className="fill-ink-950" />
                          Recommended
                        </span>
                      </div>
                    )}

                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                      <p className="text-xs text-ink-400 mt-1">{plan.duration}</p>
                      <div className="mt-6">
                        <span className="text-5xl font-bold text-white">${price}</span>
                        <span className="text-lg text-ink-400">{period}</span>
                      </div>
                      {billing === 'yearly' && (
                        <p className="text-xs text-red-500 mt-2">
                          Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(0)} per year
                        </p>
                      )}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 justify-center">
                      {plan.services.map((service) => (
                        <span key={service} className="badge bg-white/5 text-ink-200 border border-white/10 text-[10px]">
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 space-y-3 flex-1">
                      {plan.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-sm text-ink-200">
                          <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={12} className="text-red-500" />
                          </div>
                          {feat}
                        </div>
                      ))}
                    </div>

                    <Button
                      to="/free-trial"
                      variant={plan.recommended ? 'primary' : 'outline'}
                      className="mt-8 w-full"
                    >
                      Join Now <ArrowRight size={16} />
                    </Button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Price Comparison Table */}
      <section className="pb-20 md:pb-28 bg-ink-900/50">
        <div className="container-x py-20 md:py-28">
          <SectionHeading
            label="Full Comparison"
            title="Compare Every Feature"
            subtitle="See exactly what's included in each plan."
          />
          <Reveal>
            <div className="glass rounded-2xl overflow-hidden max-w-4xl mx-auto mt-14">
              <div className="grid grid-cols-4 gap-4 px-6 py-5 border-b border-white/10">
                <div className="text-sm font-bold text-ink-400 uppercase tracking-wider">Feature</div>
                <div className="text-sm font-bold text-white text-center">Basic</div>
                <div className="text-sm font-bold text-red-500 text-center">Standard</div>
                <div className="text-sm font-bold text-white text-center">Premium</div>
              </div>
              {[
                { feat: 'Gym Floor Access', basic: true, standard: true, premium: true },
                { feat: 'Locker Room', basic: true, standard: true, premium: true },
                { feat: 'Group Classes', basic: '2/week', standard: 'Unlimited', premium: 'Unlimited' },
                { feat: 'Personal Training', basic: false, standard: '1/mo', premium: '4/mo' },
                { feat: 'Nutrition Coaching', basic: false, standard: 'Quarterly', premium: 'Weekly' },
                { feat: 'Body Composition', basic: 'Monthly', standard: true, premium: true },
                { feat: 'Recovery Zone', basic: false, standard: false, premium: true },
                { feat: 'Guest Passes', basic: false, standard: '2/mo', premium: 'Unlimited' },
                { feat: 'Custom Programming', basic: false, standard: false, premium: true },
                { feat: 'Priority Booking', basic: false, standard: false, premium: true },
                { feat: 'Mobile App', basic: true, standard: true, premium: true },
              ].map((row, i) => (
                <div key={row.feat} className={`grid grid-cols-4 gap-4 px-6 py-3.5 items-center ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                  <div className="text-sm text-ink-200">{row.feat}</div>
                  {[row.basic, row.standard, row.premium].map((val, j) => (
                    <div key={j} className="text-center">
                      {val === true ? (
                        <Check size={18} className="text-red-500 mx-auto" />
                      ) : val === false ? (
                        <X size={18} className="text-ink-600 mx-auto" />
                      ) : (
                        <span className="text-xs font-semibold text-ink-200">{val}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Guarantees */}
      <section className="pb-20 md:pb-28">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: '7-Day Free Trial', desc: 'Try everything with zero commitment. No credit card needed.' },
              { icon: Zap, title: 'Cancel Anytime', desc: 'Not loving it? Cancel with one click. No questions asked.' },
              { icon: Star, title: 'Money-Back Guarantee', desc: 'Not satisfied in your first 30 days? Get a full refund.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={`animate-delay-${(i + 1) * 100}`}>
                <div className="glass rounded-2xl p-6 text-center card-hover h-full">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon size={24} className="text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-ink-300 mt-2">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 md:pb-28 bg-ink-900/50">
        <div className="container-x py-20 md:py-28">
          <SectionHeading label="FAQ" title="Questions? We've Got Answers" />
          <div className="max-w-3xl mx-auto mt-14 space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={`animate-delay-${(i % 4) * 100}`}>
                <div className="glass rounded-xl p-6 card-hover">
                  <h4 className="text-base font-bold text-white">{faq.q}</h4>
                  <p className="text-sm text-ink-300 mt-2 leading-relaxed">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="container-x">
          <div className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-red-500/5 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Still Deciding?</h2>
              <p className="text-ink-300 mt-4 max-w-xl mx-auto">Book a free gym tour and see the FitSync experience for yourself.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button to="/free-trial" size="lg">
                  <Zap size={18} />
                  Start Free Trial
                </Button>
                <Button to="/contact" variant="outline" size="lg">
                  Book a Tour
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
