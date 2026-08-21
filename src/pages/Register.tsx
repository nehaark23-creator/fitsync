import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Target, AlertTriangle, Dumbbell, CheckCircle2, ArrowRight, ArrowLeft, Zap, Activity as ActivityIcon, LogIn } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { ACTIVITIES, ALLERGIES, GOALS, EQUIPMENT } from '@/data/mockData';
import type { Activity, Allergy, Goal, Equipment } from '@/data/mockData';

const steps = [
  { label: 'Name', icon: User },
  { label: 'Email', icon: Mail },
  { label: 'Phone', icon: Phone },
  { label: 'Password', icon: Lock },
  { label: 'Activities', icon: ActivityIcon },
  { label: 'Allergies', icon: AlertTriangle },
  { label: 'Goals', icon: Target },
  { label: 'Equipment', icon: Dumbbell },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  activities: Activity[];
  allergies: Allergy[];
  goals: Goal[];
  equipment: Equipment[];
}

type Mode = 'register' | 'login';

export default function Register() {
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const [mode, setMode] = useState<Mode>('register');
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', password: '',
    activities: [], allergies: ['None'], goals: [], equipment: [],
  });

  const toggleArray = <T extends string>(key: keyof FormData, value: T) => {
    setForm((prev) => {
      const arr = prev[key] as string[];
      if (key === 'allergies' && value === 'None') {
        return { ...prev, allergies: ['None'] as Allergy[] };
      }
      if (key === 'allergies' && value !== 'None') {
        const withoutNone = arr.filter((a) => a !== 'None');
        return {
          ...prev,
          allergies: withoutNone.includes(value)
            ? withoutNone.filter((a) => a !== value)
            : [...withoutNone, value],
        } as FormData;
      }
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      } as FormData;
    });
  };

  const canProceed = () => {
    switch (step) {
      case 0: return form.name.trim().length > 0;
      case 1: return /\S+@\S+\.\S+/.test(form.email);
      case 2: return form.phone.trim().length > 0;
      case 3: return form.password.length >= 6;
      case 4: return form.activities.length > 0;
      case 5: return form.allergies.length > 0;
      case 6: return form.goals.length > 0;
      case 7: return form.equipment.length > 0;
      default: return true;
    }
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      register(
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          activities: form.activities,
          allergies: form.allergies,
          goals: form.goals,
          equipment: form.equipment,
        },
        form.password
      );
      setCompleted(true);
    }
  };
  const prev = () => setStep(Math.max(0, step - 1));

  const handleLogin = () => {
    setLoginError('');
    const result = login(loginForm.email, loginForm.password);
    if (result.success) {
      navigate('/profile');
    } else {
      setLoginError(result.error || 'Login failed');
    }
  };

  if (mode === 'login') {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center py-12">
        <div className="container-x max-w-md">
          <div className="text-center mb-8">
            <span className="section-label mb-4">
              <LogIn size={14} />
              Welcome Back
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">Sign In to FitSync</h1>
            <p className="text-ink-300 mt-2 text-sm">Enter your credentials to access your profile.</p>
          </div>

          <div className="glass rounded-2xl p-8 space-y-5">
            <div>
              <label className="text-sm font-bold text-white mb-1.5 block">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="input-field"
                placeholder="you@email.com"
                autoFocus
              />
            </div>
            <div>
              <label className="text-sm font-bold text-white mb-1.5 block">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="input-field"
                placeholder="••••••••"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            {loginError && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 font-semibold">
                {loginError}
              </div>
            )}
            <Button onClick={handleLogin} className="w-full">
              Sign In <ArrowRight size={16} />
            </Button>
            <p className="text-center text-xs text-ink-400">
              Don't have an account?{' '}
              <button onClick={() => setMode('register')} className="text-red-500 hover:underline font-bold">
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="container-x">
          <div className="glass rounded-3xl p-10 md:p-16 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-white">Welcome to FitSync!</h1>
            <p className="text-ink-300 mt-4">
              Your account is ready, {form.name.split(' ')[0]}. We've personalized your experience based on your preferences.
            </p>
            <div className="mt-6 space-y-2 text-left">
              {form.activities.length > 0 && (
                <div className="text-sm text-ink-300"><span className="font-bold text-white">Activities:</span> {form.activities.join(', ')}</div>
              )}
              {form.goals.length > 0 && (
                <div className="text-sm text-ink-300"><span className="font-bold text-white">Goals:</span> {form.goals.join(', ')}</div>
              )}
              {form.equipment.length > 0 && (
                <div className="text-sm text-ink-300"><span className="font-bold text-white">Equipment:</span> {form.equipment.join(', ')}</div>
              )}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/profile" className="btn-primary w-full sm:w-auto justify-center">
                View Profile <ArrowRight size={16} />
              </Link>
              <Link to="/free-trial" className="btn-outline w-full sm:w-auto justify-center">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center py-12">
      <div className="container-x max-w-2xl">
        <div className="text-center mb-8">
          <span className="section-label mb-4">
            <Zap size={14} />
            Join FitSync
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">Create Your Account</h1>
          <p className="text-ink-300 mt-2 text-sm">Step {step + 1} of {steps.length} — let's personalize your fitness journey.</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center justify-between mb-8 px-2">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    i < step ? 'bg-red-500 text-white' :
                    i === step ? 'bg-red-500/20 border-2 border-red-500 text-red-500 animate-pulse-glow' :
                    'bg-ink-700 text-ink-500'
                  }`}
                >
                  {i < step ? <CheckCircle2 size={16} /> : <s.icon size={16} />}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1.5 rounded-full transition-all duration-300 ${i < step ? 'bg-red-500' : 'bg-ink-700'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="glass rounded-2xl p-8 min-h-[280px] flex flex-col">
          <div className="flex-1">
            {step === 0 && (
              <div className="animate-fade-up">
                <label className="text-sm font-bold text-white mb-1.5 block">What's your name?</label>
                <p className="text-xs text-ink-400 mb-4">We'll use this to personalize your experience.</p>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field text-lg"
                  placeholder="Enter your full name"
                  autoFocus
                />
              </div>
            )}
            {step === 1 && (
              <div className="animate-fade-up">
                <label className="text-sm font-bold text-white mb-1.5 block">What's your email?</label>
                <p className="text-xs text-ink-400 mb-4">We'll send your welcome guide and updates here.</p>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field text-lg"
                  placeholder="you@email.com"
                  autoFocus
                />
              </div>
            )}
            {step === 2 && (
              <div className="animate-fade-up">
                <label className="text-sm font-bold text-white mb-1.5 block">What's your phone number?</label>
                <p className="text-xs text-ink-400 mb-4">For booking confirmations and important updates.</p>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field text-lg"
                  placeholder="+1 555 000 0000"
                  autoFocus
                />
              </div>
            )}
            {step === 3 && (
              <div className="animate-fade-up">
                <label className="text-sm font-bold text-white mb-1.5 block">Create a password</label>
                <p className="text-xs text-ink-400 mb-4">At least 6 characters. Make it strong!</p>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field text-lg"
                  placeholder="••••••••"
                  autoFocus
                />
              </div>
            )}
            {step === 4 && (
              <div className="animate-fade-up">
                <label className="text-sm font-bold text-white mb-1.5 block">Preferred Activities</label>
                <p className="text-xs text-ink-400 mb-4">Select all that interest you. We'll tailor your recommendations.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ACTIVITIES.map((a) => (
                    <button
                      key={a}
                      onClick={() => toggleArray('activities', a)}
                      className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                        form.activities.includes(a)
                          ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                          : 'glass text-ink-200 hover:border-red-500/30'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="animate-fade-up">
                <label className="text-sm font-bold text-white mb-1.5 block">Food Allergies</label>
                <p className="text-xs text-ink-400 mb-4">We'll show safe alternatives for foods you can't eat.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ALLERGIES.map((a) => (
                    <button
                      key={a}
                      onClick={() => toggleArray('allergies', a)}
                      className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                        form.allergies.includes(a)
                          ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                          : 'glass text-ink-200 hover:border-red-500/30'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 6 && (
              <div className="animate-fade-up">
                <label className="text-sm font-bold text-white mb-1.5 block">Personal Goals</label>
                <p className="text-xs text-ink-400 mb-4">What do you want to achieve? Select all that apply.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {GOALS.map((g) => (
                    <button
                      key={g}
                      onClick={() => toggleArray('goals', g)}
                      className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                        form.goals.includes(g)
                          ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                          : 'glass text-ink-200 hover:border-red-500/30'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 7 && (
              <div className="animate-fade-up">
                <label className="text-sm font-bold text-white mb-1.5 block">Available Equipment</label>
                <p className="text-xs text-ink-400 mb-4">What equipment do you have access to at home?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {EQUIPMENT.map((eq) => (
                    <button
                      key={eq}
                      onClick={() => toggleArray('equipment', eq)}
                      className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                        form.equipment.includes(eq)
                          ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                          : 'glass text-ink-200 hover:border-red-500/30'
                      }`}
                    >
                      {eq}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
            <button
              onClick={prev}
              disabled={step === 0}
              className="flex items-center gap-1.5 text-sm font-bold text-ink-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <Button onClick={next} disabled={!canProceed()}>
              {step === steps.length - 1 ? (
                <>Complete Registration <CheckCircle2 size={16} /></>
              ) : (
                <>Continue <ArrowRight size={16} /></>
              )}
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-ink-400 mt-6">
          Already have an account?{' '}
          <button onClick={() => setMode('login')} className="text-red-500 hover:underline font-bold">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
