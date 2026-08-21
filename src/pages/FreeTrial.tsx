import { useState } from 'react';
import { Zap, CheckCircle2, ArrowRight, Calendar, Clock, Target, Activity, AlertTriangle, User, Phone, Mail, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';
import { ACTIVITIES, GOALS, ALLERGIES } from '@/data/mockData';

export default function FreeTrial() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', date: '', time: '',
    activity: '' as string, goal: '' as string, experience: '',
    allergies: [] as string[], message: '',
  });

  const toggleAllergy = (allergy: string) => {
    setForm((prev) => {
      if (allergy === 'None') return { ...prev, allergies: ['None'] };
      const withoutNone = prev.allergies.filter((a) => a !== 'None');
      return {
        ...prev,
        allergies: withoutNone.includes(allergy)
          ? withoutNone.filter((a) => a !== allergy)
          : [...withoutNone, allergy],
      };
    });
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="container-x">
          <div className="glass rounded-3xl p-10 md:p-16 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-white">Free Trial Booked!</h1>
            <p className="text-ink-300 mt-4">
              See you soon, {form.name.split(' ')[0] || 'athlete'}! We've sent a confirmation to {form.email || 'your email'} with all the details for your visit on {form.date || 'your selected date'}.
            </p>
            <div className="mt-6 glass rounded-2xl p-5 text-left space-y-2">
              <div className="text-sm text-ink-300"><span className="font-bold text-white">Date:</span> {form.date || '—'}</div>
              <div className="text-sm text-ink-300"><span className="font-bold text-white">Time:</span> {form.time || '—'}</div>
              <div className="text-sm text-ink-300"><span className="font-bold text-white">Activity:</span> {form.activity || '—'}</div>
              <div className="text-sm text-ink-300"><span className="font-bold text-white">Goal:</span> {form.goal || '—'}</div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button to="/" className="w-full sm:w-auto">Back to Home <ArrowRight size={16} /></Button>
              <Button to="/plans" variant="outline" className="w-full sm:w-auto">View Plans</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen py-12">
      <div className="container-x max-w-3xl">
        <div className="text-center mb-10">
          <span className="section-label mb-4">
            <Zap size={14} />
            7-Day Free Trial
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Start Your <span className="text-gradient">Free Trial</span>
          </h1>
          <p className="text-ink-300 mt-4 max-w-xl mx-auto">
            Get full access to our gym, classes, trainers, and app for 7 days — completely free. No credit card required.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Activity, label: 'Unlimited Classes' },
            { icon: User, label: '1 PT Session Free' },
            { icon: Zap, label: 'Full App Access' },
          ].map((item) => (
            <div key={item.label} className="glass rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-red-500" />
              </div>
              <span className="text-sm font-bold text-white">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="glass rounded-2xl p-6 md:p-8 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-white mb-1.5 block flex items-center gap-1.5">
                <User size={14} className="text-red-500" /> Full Name
              </label>
              <input type="text" required className="input-field" placeholder="Your full name"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-1.5 block flex items-center gap-1.5">
                <Phone size={14} className="text-red-500" /> Phone
              </label>
              <input type="tel" required className="input-field" placeholder="+1 555 000 0000"
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-white mb-1.5 block flex items-center gap-1.5">
              <Mail size={14} className="text-red-500" /> Email
            </label>
            <input type="email" required className="input-field" placeholder="you@email.com"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-white mb-1.5 block flex items-center gap-1.5">
                <Calendar size={14} className="text-red-500" /> Preferred Date
              </label>
              <input type="date" required className="input-field"
                value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-1.5 block flex items-center gap-1.5">
                <Clock size={14} className="text-red-500" /> Preferred Time
              </label>
              <select required className="input-field cursor-pointer"
                value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>
                <option value="">Select a time</option>
                <option>6:00 AM - 8:00 AM</option>
                <option>8:00 AM - 10:00 AM</option>
                <option>10:00 AM - 12:00 PM</option>
                <option>12:00 PM - 2:00 PM</option>
                <option>2:00 PM - 4:00 PM</option>
                <option>4:00 PM - 6:00 PM</option>
                <option>6:00 PM - 8:00 PM</option>
                <option>8:00 PM - 10:00 PM</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-white mb-1.5 block flex items-center gap-1.5">
                <Activity size={14} className="text-red-500" /> Preferred Activity
              </label>
              <select required className="input-field cursor-pointer"
                value={form.activity} onChange={(e) => setForm({ ...form, activity: e.target.value })}>
                <option value="">Select an activity</option>
                {ACTIVITIES.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-1.5 block flex items-center gap-1.5">
                <Target size={14} className="text-red-500" /> Fitness Goal
              </label>
              <select required className="input-field cursor-pointer"
                value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })}>
                <option value="">Select a goal</option>
                {GOALS.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-white mb-1.5 block">Previous Gym Experience</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['None', 'Beginner', 'Intermediate', 'Advanced'].map((exp) => (
                <button
                  key={exp}
                  type="button"
                  onClick={() => setForm({ ...form, experience: exp })}
                  className={`rounded-xl px-3 py-2.5 text-xs font-bold transition-all ${
                    form.experience === exp
                      ? 'bg-red-500 text-ink-950'
                      : 'glass text-ink-200 hover:border-red-500/30'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-white mb-1.5 block flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-red-500" /> Food Allergies
            </label>
            <div className="flex flex-wrap gap-2">
              {ALLERGIES.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAllergy(a)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                    form.allergies.includes(a)
                      ? 'bg-red-500 text-ink-950'
                      : 'glass text-ink-200 hover:border-red-500/30'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-white mb-1.5 block flex items-center gap-1.5">
              <MessageSquare size={14} className="text-red-500" /> Message (Optional)
            </label>
            <textarea className="input-field min-h-[80px]" placeholder="Anything else you'd like us to know?"
              value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>

          <Button type="submit" size="lg" className="w-full">
            <Zap size={18} />
            Claim My Free Trial
          </Button>
          <p className="text-center text-xs text-ink-400">
            No credit card required. Cancel anytime during your 7-day trial.
          </p>
        </form>
      </div>
    </div>
  );
}
