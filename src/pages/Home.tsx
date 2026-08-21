import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Play, Zap, TrendingUp, Users, Dumbbell, HeartPulse, Flame, Apple,
  Activity, Home as HomeIcon, Clock, Star, ChevronRight, Trophy,
  Calendar, CheckCircle2, ArrowRight, Sparkles, Target, Timer,
  Pause, Plus, Award, Info, X,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionHeading, { Reveal } from '@/components/ui/SectionHeading';
import QRPlaceholder from '@/components/ui/QRPlaceholder';
import TrainerCard from '@/components/shared/TrainerCard';
import TrainerProfile from '@/components/shared/TrainerProfile';
import FacilityCard from '@/components/shared/FacilityCard';
import TestimonialCard from '@/components/shared/TestimonialCard';
import Modal from '@/components/ui/Modal';
import { trainers, facilities, testimonials, leaderboard, plans, GOALS, EQUIPMENT } from '@/data/mockData';
import type { Trainer, LeaderboardEntry } from '@/data/mockData';

const whyFitSync = [
  { icon: Zap, title: 'Smart Training', desc: 'AI-powered workout plans that adapt to your progress and goals in real time.' },
  { icon: HeartPulse, title: 'Live Crowd Data', desc: 'Check gym occupancy before you arrive. Never wait for equipment again.' },
  { icon: Apple, title: 'Elite Nutrition', desc: 'Personalized meal plans with allergy-aware alternatives built in.' },
  { icon: HomeIcon, title: 'Home Mode', desc: 'Missed the gym? Continue your plan at home with zero equipment needed.' },
];

const builtForEveryone = [
  { icon: TrendingUp, title: 'Professionals', desc: 'Efficient 45-min sessions designed for busy schedules. Train smart, not long.' },
  { icon: Users, title: 'Students', desc: 'Flexible hours and student pricing. Build lifelong habits during your studies.' },
  { icon: Sparkles, title: 'Beginners', desc: 'Guided onboarding, beginner-friendly classes, and a supportive community.' },
];

const weekPreview = [
  { day: 'Day 1', title: 'Full Body Foundation', duration: '45 min', focus: 'Strength' },
  { day: 'Day 2', title: 'HIIT Cardio Burn', duration: '30 min', focus: 'Cardio' },
  { day: 'Day 3', title: 'Active Recovery', duration: '20 min', focus: 'Mobility' },
  { day: 'Day 4', title: 'Upper Body Power', duration: '50 min', focus: 'Strength' },
  { day: 'Day 5', title: 'Core & Conditioning', duration: '35 min', focus: 'HIIT' },
  { day: 'Day 6', title: 'Lower Body Builder', duration: '45 min', focus: 'Strength' },
  { day: 'Day 7', title: 'Rest & Replenish', duration: '—', focus: 'Recovery' },
];

function calcScore(entry: LeaderboardEntry): number {
  return Math.round(entry.attendance * 0.3 + entry.participation * 0.4 + entry.consistency * 0.3);
}

interface WeightEntry {
  date: string;
  weight: number;
}

export default function Home() {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [crowdLevel, setCrowdLevel] = useState(72);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Price calculator state
  const [calcPlan, setCalcPlan] = useState(plans[1]);
  const [calcBilling, setCalcBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [calcPT, setCalcPT] = useState(4);
  const [calcAddons, setCalcAddons] = useState({ nutrition: true, recovery: true, classes: true });

  // Weight tracker state
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [weightInput, setWeightInput] = useState('');
  const [showWeightInput, setShowWeightInput] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('fitsync_weights');
      if (raw) setWeightEntries(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const saveWeights = useCallback((entries: WeightEntry[]) => {
    setWeightEntries(entries);
    localStorage.setItem('fitsync_weights', JSON.stringify(entries));
  }, []);

  const addWeight = () => {
    const w = parseFloat(weightInput);
    if (isNaN(w) || w <= 0) return;
    const entry: WeightEntry = { date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), weight: w };
    saveWeights([...weightEntries, entry]);
    setWeightInput('');
    setShowWeightInput(false);
  };

  const crowdPercent = crowdLevel;
  const crowdStatus = crowdPercent < 30 ? 'Not Busy' : crowdPercent < 60 ? 'Moderate' : crowdPercent < 85 ? 'Busy' : 'Peak Hours';
  const crowdColor = crowdPercent < 30 ? 'text-red-500' : crowdPercent < 60 ? 'text-yellow-400' : 'text-red-400';

  // Price calculator
  const planPrice = calcBilling === 'monthly' ? calcPlan.monthlyPrice : Math.round(calcPlan.yearlyPrice / 12);
  const ptCost = calcPT * 15;
  const addonCost = (calcAddons.nutrition ? 30 : 0) + (calcAddons.recovery ? 15 : 0) + (calcAddons.classes ? 20 : 0);
  const subtotal = planPrice + ptCost + addonCost;
  const bundleSavings = calcAddons.nutrition && calcAddons.recovery && calcAddons.classes ? 21 : 0;
  const monthlyTotal = subtotal - bundleSavings;
  const yearlyTotal = monthlyTotal * 12;

  // Weight chart
  const startWeight = weightEntries.length > 0 ? weightEntries[0].weight : 0;
  const currentWeight = weightEntries.length > 0 ? weightEntries[weightEntries.length - 1].weight : 0;
  const weightChange = weightEntries.length > 0 ? currentWeight - startWeight : 0;
  const minW = weightEntries.length > 0 ? Math.min(...weightEntries.map((e) => e.weight)) : 0;
  const maxW = weightEntries.length > 0 ? Math.max(...weightEntries.map((e) => e.weight)) : 0;
  const range = maxW - minW || 1;

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
      setVideoPlaying(false);
    } else {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  const sortedLeaderboard = [...leaderboard].sort((a, b) => calcScore(b) - calcScore(a));

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/17956264/pexels-photo-17956264.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/30" />
          <div className="absolute inset-0 grid-pattern opacity-20" />
        </div>

        <div className="relative container-x py-20">
          <div className="max-w-2xl">
            <span className="section-label animate-fade-up">
              <Sparkles size={14} />
              Premium Fitness Platform
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] animate-fade-up animate-delay-100">
              Forge Your <span className="text-gradient">Limitless</span> Body
            </h1>
            <p className="mt-6 text-lg text-ink-300 leading-relaxed max-w-xl animate-fade-up animate-delay-200">
              World-class training, elite nutrition coaching, and smart home workout technology — all in one premium platform. Your transformation starts here.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-up animate-delay-300">
              <Button to="/free-trial" size="lg">
                <Zap size={18} />
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" onClick={() => setVideoOpen(true)}>
                <Play size={18} />
                Watch Video
              </Button>
            </div>
            <div className="mt-12 flex items-center gap-8 animate-fade-up animate-delay-500">
              <div>
                <p className="text-3xl font-bold text-white">12K+</p>
                <p className="text-xs text-ink-400 uppercase tracking-wider">Active Members</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-white">50+</p>
                <p className="text-xs text-ink-400 uppercase tracking-wider">Expert Trainers</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-white">4.9</p>
                <p className="text-xs text-ink-400 uppercase tracking-wider">Member Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          </div>
        </div>
      </section>

      {/* WHY FITSYNC */}
      <section className="section-pad relative">
        <div className="absolute inset-0 radial-glow" />
        <div className="relative container-x">
          <SectionHeading
            label="Why FitSync"
            title="Not Just a Gym. A Complete Fitness Ecosystem."
            subtitle="Everything you need to train, eat, and recover — backed by data, designed for results."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {whyFitSync.map((item, i) => (
              <Reveal key={item.title} delay={`animate-delay-${(i + 1) * 100}`}>
                <div className="glass rounded-2xl p-6 card-hover h-full">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-ink-300 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR EVERYONE */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <SectionHeading
            label="Built for Everyone"
            title="No Matter Where You Start, We Meet You There"
            subtitle="Tailored programs and support for every lifestyle and fitness level."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {builtForEveryone.map((item, i) => (
              <Reveal key={item.title} delay={`animate-delay-${(i + 1) * 100}`}>
                <div className="group relative glass rounded-2xl p-8 card-hover overflow-hidden h-full">
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-red-500/5 blur-3xl group-hover:bg-red-500/10 transition-colors" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                      <item.icon size={28} className="text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-ink-300 mt-3 leading-relaxed">{item.desc}</p>
                    <Link to="/plans" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-red-500 hover:gap-2.5 transition-all">
                      Explore Plans <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PERSONAL GOALS */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            label="Personal Goals"
            title="What Do You Want to Achieve?"
            subtitle="Choose your goal and we'll build a personalized path to get you there."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-14">
            {GOALS.map((goal, i) => (
              <Reveal key={goal} delay={`animate-delay-${(i + 1) * 100}`}>
                <Link
                  to="/plans"
                  className="group glass rounded-2xl p-6 card-hover flex flex-col items-center text-center h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-3 group-hover:bg-red-500/20 transition-colors">
                    <Target size={22} className="text-red-500" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{goal}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AVAILABLE EQUIPMENT */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <SectionHeading
            label="Available Equipment"
            title="Train With the Best Gear"
            subtitle="From free weights to full home gym setups — we support every type of training."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-14">
            {EQUIPMENT.map((eq, i) => (
              <Reveal key={eq} delay={`animate-delay-${(i + 1) * 100}`}>
                <div className="glass rounded-xl p-5 text-center card-hover">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3">
                    <Dumbbell size={18} className="text-red-500" />
                  </div>
                  <p className="text-sm font-semibold text-white">{eq}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERBOARD WITH SCORING */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            label="Community"
            title="Progress Leaderboard"
            subtitle="Compete with the community — your identity stays private, your progress speaks for itself."
          />

          {/* Scoring explanation */}
          <Reveal>
            <div className="glass rounded-2xl p-5 max-w-4xl mx-auto mt-10 mb-6">
              <div className="flex items-start gap-3">
                <Info size={20} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-ink-200">
                  Leaderboard ranking is calculated using <span className="font-bold text-white">Attendance (30%)</span>, <span className="font-bold text-white">Workout Participation (40%)</span> and <span className="font-bold text-white">Consistency (30%)</span>.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Top 3 podium */}
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
              {sortedLeaderboard.slice(0, 3).map((entry, i) => (
                <div
                  key={entry.id}
                  className={`glass rounded-2xl p-6 text-center relative ${
                    i === 0 ? 'sm:order-2 border-red-500/30' : i === 1 ? 'sm:order-1' : 'sm:order-3'
                  }`}
                >
                  {entry.consistentTopPerformer && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="badge bg-red-500 text-white whitespace-nowrap shadow-lg">
                        <Award size={12} /> Consistent Top Performer
                      </span>
                    </div>
                  )}
                  <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-lg font-bold mb-3 ${
                    i === 0 ? 'bg-red-500 text-white' : 'bg-red-500/10 border border-red-500/20 text-red-500'
                  }`}>
                    {entry.avatar}
                  </div>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Trophy size={16} className={i === 0 ? 'text-red-500' : 'text-ink-400'} />
                    <span className="text-xs font-bold text-ink-400 uppercase">Rank #{entry.rank}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{entry.name}</h3>
                  <div className="mt-3 grid grid-cols-3 gap-1 text-xs">
                    <div>
                      <p className="text-ink-400">Attend.</p>
                      <p className="text-white font-bold">{entry.attendance}%</p>
                    </div>
                    <div>
                      <p className="text-ink-400">Particip.</p>
                      <p className="text-white font-bold">{entry.participation}%</p>
                    </div>
                    <div>
                      <p className="text-ink-400">Consist.</p>
                      <p className="text-white font-bold">{entry.consistency}%</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <p className="text-xs text-ink-400">Overall Score</p>
                    <p className="text-2xl font-bold text-red-500">{calcScore(entry)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Full leaderboard table */}
          <Reveal>
            <div className="glass rounded-2xl overflow-hidden max-w-4xl mx-auto">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-xs font-bold text-ink-400 uppercase tracking-wider">
                <div className="col-span-1">Rank</div>
                <div className="col-span-3">Athlete</div>
                <div className="col-span-2 text-center">Attend.</div>
                <div className="col-span-2 text-center">Particip.</div>
                <div className="col-span-2 text-center">Consist.</div>
                <div className="col-span-2 text-center">Score</div>
              </div>
              {sortedLeaderboard.map((entry, i) => (
                <div
                  key={entry.id}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors hover:bg-white/5 ${
                    i !== sortedLeaderboard.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <div className="col-span-1">
                    <span className={`text-lg font-bold ${entry.rank <= 3 ? 'text-red-500' : 'text-ink-400'}`}>
                      #{entry.rank}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xs font-bold text-red-500">
                      {entry.avatar}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white">{entry.name}</span>
                      {entry.consistentTopPerformer && (
                        <span className="ml-1.5 inline-flex items-center gap-0.5 text-[10px] text-red-500 font-bold">
                          <Award size={10} />
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-sm font-bold text-white">{entry.attendance}%</div>
                  <div className="col-span-2 text-center text-sm font-bold text-white">{entry.participation}%</div>
                  <div className="col-span-2 text-center text-sm font-bold text-white">{entry.consistency}%</div>
                  <div className="col-span-2 text-center">
                    <span className="text-lg font-bold text-red-500">{calcScore(entry)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BODY PROGRESS VISUALIZER */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <span className="section-label mb-4">
                  <TrendingUp size={14} />
                  Track Everything
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Body Progress Visualizer</h2>
                <p className="text-ink-300 mt-4 text-base leading-relaxed">
                  Watch your transformation unfold. Log progress photos, body measurements, and weight — then see them visualized on an interactive timeline. Stay motivated by how far you've come.
                </p>
                <ul className="mt-6 space-y-3">
                  {['Side-by-side progress photo comparison', 'Interactive body measurement tracker', 'Weight & body fat trend charts', 'Milestone achievements & badges'].map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm text-ink-200">
                      <CheckCircle2 size={18} className="text-red-500 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button onClick={() => setShowWeightInput(true)} className="mt-8">
                  Start Tracking <ArrowRight size={16} />
                </Button>
              </div>
            </Reveal>
            <Reveal delay="animate-delay-200">
              <div className="relative">
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Weight Progress</h4>
                    {weightEntries.length > 0 && (
                      <span className={`badge ${weightChange < 0 ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-400'}`}>
                        {weightChange < 0 ? '' : '+'}{weightChange.toFixed(1)} kg
                      </span>
                    )}
                  </div>

                  {weightEntries.length === 0 ? (
                    <div className="h-48 flex items-center justify-center text-center">
                      <div>
                        <TrendingUp size={32} className="text-ink-500 mx-auto mb-3" />
                        <p className="text-sm text-ink-400">No data yet. Click "Start Tracking" to log your first weight entry.</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Chart */}
                      <div className="flex items-end gap-2 h-48">
                        {weightEntries.map((entry, i) => {
                          const heightPct = ((maxW - entry.weight) / range) * 60 + 30;
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                              <div
                                className="w-full rounded-t-md bg-gradient-to-t from-red-700 to-red-500 transition-all duration-500 hover:from-red-600 hover:to-red-400 relative group"
                                style={{ height: `${heightPct}%` }}
                              >
                                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                  {entry.weight}kg
                                </span>
                              </div>
                              <span className="text-[10px] text-ink-400">{entry.date}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <p className="text-ink-400">Starting</p>
                          <p className="text-white font-bold">{startWeight} kg</p>
                        </div>
                        <div className="text-center">
                          <p className="text-ink-400">Current</p>
                          <p className="text-red-500 font-bold">{currentWeight} kg</p>
                        </div>
                        <div className="text-center">
                          <p className="text-ink-400">Change</p>
                          <p className={`font-bold ${weightChange < 0 ? 'text-red-500' : 'text-yellow-400'}`}>
                            {weightChange < 0 ? '' : '+'}{weightChange.toFixed(1)} kg
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {showWeightInput && (
                    <div className="mt-4 flex gap-2">
                      <input
                        type="number"
                        step="0.1"
                        value={weightInput}
                        onChange={(e) => setWeightInput(e.target.value)}
                        className="input-field"
                        placeholder="Enter weight (kg)"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && addWeight()}
                      />
                      <button onClick={addWeight} className="btn-primary shrink-0 px-4">
                        <Plus size={16} />
                      </button>
                      <button onClick={() => setShowWeightInput(false)} className="btn-ghost shrink-0 px-3">
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  {weightEntries.length > 0 && !showWeightInput && (
                    <button onClick={() => setShowWeightInput(true)} className="btn-ghost mt-4 w-full text-xs">
                      <Plus size={14} /> Log New Entry
                    </button>
                  )}
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-red-500/10 blur-2xl" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRICE TRANSPARENCY CALCULATOR */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            label="Price Transparency"
            title="Know Exactly What You Pay"
            subtitle="No hidden fees. No surprises. Use our calculator to estimate your monthly investment."
          />
          <Reveal>
            <div className="glass rounded-2xl p-8 max-w-3xl mx-auto mt-14">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-semibold text-white mb-2 block">Membership Plan</label>
                    <div className="grid grid-cols-3 gap-2">
                      {plans.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setCalcPlan(p)}
                          className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-all ${
                            calcPlan.id === p.id
                              ? 'border-red-500 bg-red-500/10 text-red-500'
                              : 'border-white/10 text-ink-200 hover:border-red-500/50'
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-white mb-2 block">Billing Cycle</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setCalcBilling('monthly')}
                        className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-all ${
                          calcBilling === 'monthly'
                            ? 'border-red-500 bg-red-500/10 text-red-500'
                            : 'border-white/10 text-ink-200 hover:border-red-500/50'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setCalcBilling('yearly')}
                        className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-all ${
                          calcBilling === 'yearly'
                            ? 'border-red-500 bg-red-500/10 text-red-500'
                            : 'border-white/10 text-ink-200 hover:border-red-500/50'
                        }`}
                      >
                        Yearly (save ~17%)
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-white mb-2 block">Personal Training Sessions / month</label>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      value={calcPT}
                      onChange={(e) => setCalcPT(Number(e.target.value))}
                      className="w-full accent-red-500"
                    />
                    <div className="flex justify-between text-xs text-ink-400 mt-1">
                      <span>0</span>
                      <span className="text-red-500 font-bold">{calcPT} sessions</span>
                      <span>12</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-white mb-2 block">Add-ons</label>
                    <div className="space-y-2">
                      {[
                        { key: 'nutrition' as const, label: 'Nutrition Coaching (+$30/mo)' },
                        { key: 'recovery' as const, label: 'Recovery Zone Access (+$15/mo)' },
                        { key: 'classes' as const, label: 'Unlimited Classes (+$20/mo)' },
                      ].map((addon) => (
                        <label key={addon.key} className="flex items-center gap-2.5 text-sm text-ink-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={calcAddons[addon.key]}
                            onChange={(e) => setCalcAddons({ ...calcAddons, [addon.key]: e.target.checked })}
                            className="rounded accent-red-500 w-4 h-4"
                          />
                          {addon.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="glass-strong rounded-xl p-6 flex flex-col justify-center">
                  <p className="text-xs text-ink-400 uppercase tracking-wider">
                    {calcBilling === 'monthly' ? 'Monthly Total' : 'Monthly Equivalent (Yearly)'}
                  </p>
                  <p className="text-4xl font-bold text-white mt-2">
                    ${monthlyTotal}<span className="text-lg text-ink-400">/mo</span>
                  </p>
                  {calcBilling === 'yearly' && (
                    <p className="text-xs text-ink-400 mt-1">${yearlyTotal}/year billed annually</p>
                  )}
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-ink-300">
                      <span>{calcPlan.name} Plan ({calcBilling})</span>
                      <span>${planPrice}</span>
                    </div>
                    <div className="flex justify-between text-ink-300">
                      <span>{calcPT} PT Sessions</span>
                      <span>${ptCost}</span>
                    </div>
                    {calcAddons.nutrition && <div className="flex justify-between text-ink-300"><span>Nutrition Coaching</span><span>$30</span></div>}
                    {calcAddons.recovery && <div className="flex justify-between text-ink-300"><span>Recovery Zone</span><span>$15</span></div>}
                    {calcAddons.classes && <div className="flex justify-between text-ink-300"><span>Unlimited Classes</span><span>$20</span></div>}
                  </div>
                  {bundleSavings > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between">
                      <span className="text-sm font-bold text-white">Bundle Savings</span>
                      <span className="text-sm font-bold text-red-500">-${bundleSavings}/mo</span>
                    </div>
                  )}
                  <Button to="/plans" className="mt-5 w-full">View Plans <ArrowRight size={16} /></Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FIRST WEEK PLAN PREVIEW */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <SectionHeading
            label="First Week Plan Preview"
            title="Your First 7 Days, Mapped Out"
            subtitle="See exactly what your first week at FitSync looks like — before you even sign up."
          />
          <div className="mt-14 max-w-4xl mx-auto space-y-3">
            {weekPreview.map((day, i) => (
              <Reveal key={day.day} delay={`animate-delay-${(i + 1) * 100}`}>
                <div className="glass rounded-xl p-5 flex items-center gap-4 card-hover">
                  <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-red-500">{day.day.replace('Day ', 'D')}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">{day.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-xs text-ink-400">
                      <span className="flex items-center gap-1"><Timer size={12} /> {day.duration}</span>
                      <span className="flex items-center gap-1"><Target size={12} /> {day.focus}</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="badge bg-white/5 text-ink-200">{day.focus}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOME MODE */}
      <section className="section-pad">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal delay="animate-delay-200">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/23224739/pexels-photo-23224739.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Home workout"
                  className="rounded-2xl object-cover w-full h-96"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-ink-950/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass-strong rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                    <HomeIcon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Home Mode Active</p>
                    <p className="text-xs text-ink-300">Continue your gym plan at home</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div>
                <span className="section-label mb-4">
                  <HomeIcon size={14} />
                  Home Mode
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Continuity for Missed Gym Days</h2>
                <p className="text-ink-300 mt-4 text-base leading-relaxed">
                  Can't make it to the gym? Your plan follows you home. Home Mode automatically adapts your workout to the equipment you have — even if that's just your body weight. Never miss a session again.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    { icon: Dumbbell, label: 'No equipment needed' },
                    { icon: Clock, label: '15-45 min sessions' },
                    { icon: Activity, label: 'Auto-adapts to your level' },
                    { icon: CheckCircle2, label: 'Syncs with gym progress' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5 text-sm text-ink-200">
                      <item.icon size={18} className="text-red-500 shrink-0" />
                      {item.label}
                    </div>
                  ))}
                </div>
                <Button to="/at-home" className="mt-8">
                  Explore At Home <ArrowRight size={16} />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LIVE GYM CROWD INDICATOR */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <SectionHeading
            label="Real-Time Data"
            title="Live Gym Crowd Indicator"
            subtitle="Check how busy the gym is right now and plan your visit for maximum efficiency."
          />
          <Reveal>
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto mt-14">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  </div>
                  <span className="text-sm font-bold text-white">Live</span>
                </div>
                <span className="text-xs text-ink-400">Updated just now</span>
              </div>

              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-xs text-ink-400 uppercase tracking-wider">Current Occupancy</p>
                  <p className={`text-5xl font-bold mt-2 ${crowdColor}`}>{crowdPercent}%</p>
                  <p className={`text-sm font-semibold mt-1 ${crowdColor}`}>{crowdStatus}</p>
                </div>
                <div className="flex items-end gap-1.5 h-24">
                  {[40, 55, 70, 85, 95, 80, 65, 72].map((h, i) => (
                    <div
                      key={i}
                      className={`w-6 rounded-t ${i === 7 ? 'bg-red-500' : 'bg-white/10'}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="w-full h-3 rounded-full bg-ink-700 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    crowdPercent < 30 ? 'bg-red-500' : crowdPercent < 60 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${crowdPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-xs text-ink-400">Best Time Today</p>
                  <p className="text-sm font-bold text-red-500 mt-1">2:00 - 4:00 PM</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-ink-400">Peak Hours</p>
                  <p className="text-sm font-bold text-red-400 mt-1">5:00 - 8:00 PM</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-ink-400">Current Members</p>
                  <p className="text-sm font-bold text-white mt-1">87 / 120</p>
                </div>
              </div>

              <button
                onClick={() => setCrowdLevel(Math.floor(Math.random() * 80) + 15)}
                className="btn-ghost mt-6 w-full text-xs"
              >
                Refresh Data
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRAINER PREVIEW */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            label="Meet the Team"
            title="Train With the Best"
            subtitle="Our certified trainers bring decades of combined experience and a passion for your results."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {trainers.slice(0, 4).map((trainer, i) => (
              <Reveal key={trainer.id} delay={`animate-delay-${(i + 1) * 100}`}>
                <TrainerCard trainer={trainer} onViewProfile={setSelectedTrainer} />
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button to="/about" variant="outline">
              View All Trainers <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* FACILITIES PREVIEW */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <SectionHeading
            label="World-Class Facilities"
            title="Premium Space. Premium Results."
            subtitle="8 dedicated training zones, 20,000+ sq ft, and equipment maintained to competition standards."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {facilities.slice(0, 4).map((facility, i) => (
              <Reveal key={facility.id} delay={`animate-delay-${(i + 1) * 100}`}>
                <FacilityCard facility={facility} />
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button to="/about" variant="outline">
              View All Facilities <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            label="Member Stories"
            title="Real People. Real Results."
            subtitle="Thousands have transformed their lives with FitSync. Here's what they have to say."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {testimonials.slice(0, 6).map((testimonial, i) => (
              <Reveal key={testimonial.id} delay={`animate-delay-${(i + 1) * 100}`}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APP DOWNLOAD */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <div className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-red-500/5 blur-3xl" />
            <div className="relative">
              <span className="section-label mb-4">
                <Sparkles size={14} />
                Download Now
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Train From Your Pocket</h2>
              <p className="text-ink-300 mt-4 max-w-xl mx-auto">
                Book classes, track workouts, follow home routines, and chat with your trainer — all from the FitSync app.
              </p>
              <div className="flex items-center justify-center gap-8 mt-10">
                <QRPlaceholder label="App Store" />
                <QRPlaceholder label="Google Play" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-pad">
        <div className="container-x">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/896058/pexels-photo-896058.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt=""
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/40" />
            <div className="absolute inset-0 flex items-center">
              <div className="container-x">
                <div className="max-w-xl">
                  <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    Your Transformation Starts <span className="text-gradient">Today</span>
                  </h2>
                  <p className="text-ink-300 mt-4 text-lg">
                    Get a free 7-day trial. Full access to gym, classes, trainers, and the app. No card required.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button to="/free-trial" size="lg">
                      <Zap size={18} />
                      Start Free Trial
                    </Button>
                    <Button to="/plans" variant="outline" size="lg">
                      View Plans <ArrowRight size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trainer Modal */}
      <Modal
        isOpen={!!selectedTrainer}
        onClose={() => setSelectedTrainer(null)}
        title="Trainer Profile"
      >
        {selectedTrainer && <TrainerProfile trainer={selectedTrainer} />}
      </Modal>

      {/* Watch Video Modal */}
      <Modal isOpen={videoOpen} onClose={() => { setVideoOpen(false); setVideoPlaying(false); }} title="FitSync Workout Preview" maxWidth="max-w-3xl">
        <div className="relative rounded-2xl overflow-hidden bg-ink-950">
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            poster="https://images.pexels.com/photos/8436580/pexels-photo-8436580.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
            onEnded={() => setVideoPlaying(false)}
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {!videoPlaying && (
              <button
                onClick={toggleVideoPlay}
                className="pointer-events-auto w-20 h-20 rounded-full bg-red-500/90 flex items-center justify-center hover:bg-red-500 transition-all hover:scale-110 active:scale-95"
                aria-label="Play video"
              >
                <Play size={32} className="text-white ml-1" fill="white" />
              </button>
            )}
          </div>
          {videoPlaying && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <button
                onClick={toggleVideoPlay}
                className="pointer-events-auto w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:bg-white/10 transition-all"
                aria-label="Pause video"
              >
                <Pause size={20} className="text-white" />
              </button>
            </div>
          )}
        </div>
        <p className="text-sm text-ink-300 mt-4 text-center">
          Get a sneak peek of the FitSync training experience. Full workouts available with your membership.
        </p>
      </Modal>
    </div>
  );
}
