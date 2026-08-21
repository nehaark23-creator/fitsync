import { useState } from 'react';
import { Apple, Coffee, Sun, Moon, Cookie, CheckCircle2, AlertTriangle, ArrowRight, Zap, Calendar, Utensils } from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionHeading, { Reveal } from '@/components/ui/SectionHeading';
import Modal from '@/components/ui/Modal';
import { mealPlans, allergyAlternatives, ALLERGIES } from '@/data/mockData';
import type { MealPlan, Allergy } from '@/data/mockData';

const mealIcons: Record<string, typeof Coffee> = {
  Breakfast: Coffee,
  Lunch: Sun,
  Dinner: Moon,
  Snacks: Cookie,
};

export default function Nutrition() {
  const [selectedAllergies, setSelectedAllergies] = useState<Allergy[]>(['None']);
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);
  const [showConsult, setShowConsult] = useState(false);

  const toggleAllergy = (allergy: Allergy) => {
    setSelectedAllergies((prev) => {
      if (allergy === 'None') return ['None'];
      const withoutNone = prev.filter((a) => a !== 'None');
      if (withoutNone.includes(allergy)) {
        const next = withoutNone.filter((a) => a !== allergy);
        return next.length === 0 ? ['None'] : next;
      }
      return [...withoutNone, allergy];
    });
  };

  const activeAlternatives = allergyAlternatives.filter((alt) =>
    selectedAllergies.includes(alt.allergy as Allergy)
  );

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/80 to-ink-950" />
        </div>
        <div className="relative container-x text-center">
          <span className="section-label animate-fade-up">
            <Apple size={14} />
            Elite Nutrition Coaching
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white animate-fade-up animate-delay-100">
            Fuel Your <span className="text-gradient">Performance</span>
          </h1>
          <p className="mt-6 text-lg text-ink-300 max-w-2xl mx-auto animate-fade-up animate-delay-200">
            Personalized meal plans designed by registered dietitians. Built around your goals, your allergies, and your life.
          </p>
        </div>
      </section>

      {/* Elite Nutrition Coaching */}
      <section className="section-pad">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <span className="section-label mb-4">
                  <Utensils size={14} />
                  Coaching, Not Just Plans
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">More Than a Meal Plan</h2>
                <p className="text-ink-300 mt-4 text-base leading-relaxed">
                  Our registered dietitians work with you one-on-one to build nutrition habits that last. No fad diets, no restrictive eating — just smart, sustainable fueling that fits your lifestyle.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    '1-on-1 coaching with certified registered dietitians',
                    'Goal-specific meal plans (muscle gain, weight loss, balanced)',
                    'Allergy-aware food alternatives built into every plan',
                    'Weekly check-ins and plan adjustments',
                    'Body composition analysis & macro tracking',
                    'Grocery lists and meal prep guidance',
                  ].map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm text-ink-200">
                      <CheckCircle2 size={18} className="text-red-500 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button onClick={() => setShowConsult(true)} className="mt-8">
                  Book Nutrition Consultation <ArrowRight size={16} />
                </Button>
              </div>
            </Reveal>
            <Reveal delay="animate-delay-200">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="rounded-2xl object-cover w-full h-48" />
                <img src="https://images.pexels.com/photos/1640767/pexels-photo-1640767.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="rounded-2xl object-cover w-full h-48 mt-8" />
                <img src="https://images.pexels.com/photos/5860603/pexels-photo-5860603.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="rounded-2xl object-cover w-full h-48 -mt-8" />
                <img src="https://images.pexels.com/photos/1591226/pexels-photo-1591226.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="rounded-2xl object-cover w-full h-48" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Allergy Selector */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <SectionHeading
            label="Allergy-Aware Alternatives"
            title="Select Your Food Allergies"
            subtitle="We'll automatically show safe alternatives for any foods you can't eat. Try it below."
          />
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
              {ALLERGIES.map((allergy) => {
                const active = selectedAllergies.includes(allergy);
                return (
                  <button
                    key={allergy}
                    onClick={() => toggleAllergy(allergy)}
                    className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                      active
                        ? 'bg-red-500 text-ink-950 shadow-[0_0_20px_rgba(0,255,102,0.3)]'
                        : 'glass text-ink-200 hover:border-red-500/30 hover:text-white'
                    }`}
                  >
                    {allergy}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Alternatives */}
          {activeAlternatives.length > 0 && (
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeAlternatives.map((alt, i) => (
                <Reveal key={alt.allergy} delay={`animate-delay-${(i + 1) * 100}`}>
                  <div className="glass rounded-2xl p-6 card-hover h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <AlertTriangle size={18} className="text-red-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white">{alt.allergy} Allergy</h3>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs font-bold text-ink-400 uppercase tracking-wider mb-2">Avoid</p>
                      <div className="flex flex-wrap gap-2">
                        {alt.avoid.map((food) => (
                          <span key={food} className="badge bg-red-500/10 text-red-400 border border-red-500/20 line-through">
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">Safe Alternatives</p>
                      <div className="flex flex-wrap gap-2">
                        {alt.alternatives.map((food) => (
                          <span key={food} className="badge bg-red-500/10 text-red-500 border border-red-500/20">
                            <CheckCircle2 size={12} />
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sample Meal Plans */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            label="Sample Meal Plans"
            title="Plans for Every Goal"
            subtitle="Click any plan to see the full daily breakdown — breakfast, lunch, dinner, and snacks."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {mealPlans.map((plan, i) => (
              <Reveal key={plan.id} delay={`animate-delay-${(i + 1) * 100}`}>
                <div
                  className="group glass rounded-2xl overflow-hidden card-hover cursor-pointer h-full flex flex-col"
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={plan.image} alt={plan.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="badge bg-red-500/20 text-red-400 border border-red-500/20">{plan.goal}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white">{plan.title}</h3>
                    <p className="text-sm text-ink-300 mt-2 leading-relaxed flex-1">{plan.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-bold text-red-500">
                      View Full Plan <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <div className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-red-500/5 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Get Your Personalized Plan</h2>
              <p className="text-ink-300 mt-4 max-w-xl mx-auto">
                Book a 1-on-1 nutrition consultation with our registered dietitians. We'll build a plan around your goals, allergies, and lifestyle.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setShowConsult(true)} size="lg">
                  <Calendar size={18} />
                  Book Consultation
                </Button>
                <Button to="/free-trial" variant="outline" size="lg">
                  <Zap size={18} />
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meal Plan Modal */}
      <Modal isOpen={!!selectedPlan} onClose={() => setSelectedPlan(null)} title={selectedPlan?.title} maxWidth="max-w-3xl">
        {selectedPlan && (
          <div>
            <p className="text-sm text-ink-300 mb-6">{selectedPlan.description}</p>
            <div className="space-y-4">
              {selectedPlan.meals.map((meal) => {
                const Icon = mealIcons[meal.type] || Utensils;
                return (
                  <div key={meal.type} className="glass rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <Icon size={18} className="text-red-500" />
                      </div>
                      <h4 className="text-base font-bold text-white">{meal.type}</h4>
                    </div>
                    <ul className="space-y-2 ml-13">
                      {meal.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-ink-200">
                          <CheckCircle2 size={16} className="text-red-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <Button to="/free-trial" className="mt-6 w-full">
              Get This Plan <ArrowRight size={16} />
            </Button>
          </div>
        )}
      </Modal>

      {/* Consultation Modal */}
      <Modal isOpen={showConsult} onClose={() => setShowConsult(false)} title="Book Nutrition Consultation">
        <ConsultForm onClose={() => setShowConsult(false)} />
      </Modal>
    </div>
  );
}

function ConsultForm({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-white">Consultation Booked!</h3>
        <p className="text-sm text-ink-300 mt-2">We'll contact you within 24 hours to schedule your session.</p>
        <Button onClick={onClose} className="mt-6">Close</Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      className="space-y-4"
    >
      <div>
        <label className="text-sm font-semibold text-white mb-1.5 block">Full Name</label>
        <input type="text" required className="input-field" placeholder="Your name" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-white mb-1.5 block">Email</label>
          <input type="email" required className="input-field" placeholder="you@email.com" />
        </div>
        <div>
          <label className="text-sm font-semibold text-white mb-1.5 block">Phone</label>
          <input type="tel" required className="input-field" placeholder="+1 555 000 0000" />
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-white mb-1.5 block">Primary Goal</label>
        <select className="input-field">
          <option>Muscle Gain</option>
          <option>Weight Loss</option>
          <option>Balanced Fitness</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-semibold text-white mb-1.5 block">Food Allergies</label>
        <input type="text" className="input-field" placeholder="e.g. Dairy, Nuts, or None" />
      </div>
      <div>
        <label className="text-sm font-semibold text-white mb-1.5 block">Message</label>
        <textarea className="input-field min-h-[80px]" placeholder="Tell us about your goals..." />
      </div>
      <Button type="submit" className="w-full">Book Consultation <ArrowRight size={16} /></Button>
    </form>
  );
}
