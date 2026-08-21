import { useState, useMemo } from 'react';
import { Home as HomeIcon, Clock, Flame, Target, Dumbbell, Filter, ArrowRight, Play, Zap, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionHeading, { Reveal } from '@/components/ui/SectionHeading';
import Modal from '@/components/ui/Modal';
import { homeWorkouts, GOALS, EQUIPMENT } from '@/data/mockData';
import type { HomeWorkout } from '@/data/mockData';

const levels: ('All' | 'Beginner' | 'Intermediate' | 'Advanced')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const durations = ['All', 'Under 20 min', '20-35 min', 'Over 35 min'];

export default function AtHome() {
  const [goalFilter, setGoalFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [equipmentFilter, setEquipmentFilter] = useState('All');
  const [durationFilter, setDurationFilter] = useState('All');
  const [selected, setSelected] = useState<HomeWorkout | null>(null);

  const filtered = useMemo(() => {
    return homeWorkouts.filter((w) => {
      if (goalFilter !== 'All' && w.goal !== goalFilter) return false;
      if (levelFilter !== 'All' && w.level !== levelFilter) return false;
      if (equipmentFilter !== 'All' && w.equipment !== equipmentFilter) return false;
      if (durationFilter === 'Under 20 min' && w.duration >= 20) return false;
      if (durationFilter === '20-35 min' && (w.duration < 20 || w.duration > 35)) return false;
      if (durationFilter === 'Over 35 min' && w.duration <= 35) return false;
      return true;
    });
  }, [goalFilter, levelFilter, equipmentFilter, durationFilter]);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/23224739/pexels-photo-23224739.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/80 to-ink-950" />
        </div>
        <div className="relative container-x text-center">
          <span className="section-label animate-fade-up">
            <HomeIcon size={14} />
            Forge At Home
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white animate-fade-up animate-delay-100">
            Train Anywhere.<br /><span className="text-gradient">No Gym Required.</span>
          </h1>
          <p className="mt-6 text-lg text-ink-300 max-w-2xl mx-auto animate-fade-up animate-delay-200">
            Can't make it to the gym? Your fitness journey doesn't stop. Home Mode adapts your plan to whatever equipment you have — even if it's just your body weight.
          </p>
        </div>
      </section>

      {/* Home Mode Explanation */}
      <section className="section-pad">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <span className="section-label mb-4">
                  <Zap size={14} />
                  Home Mode
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Continuity for Missed Gym Days</h2>
                <p className="text-ink-300 mt-4 text-base leading-relaxed">
                  Life happens. Travel, late meetings, sick kids — sometimes you just can't get to the gym. Home Mode ensures your progress never stalls. Your plan automatically converts to a home-friendly version that uses whatever equipment you have available.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    'Auto-converts gym exercises to home equivalents',
                    'Adapts to your available equipment (even none)',
                    'Syncs progress with your gym workout history',
                    'Short on time? Filter by duration and go',
                    'Video guidance for every exercise',
                  ].map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm text-ink-200">
                      <CheckCircle2 size={18} className="text-red-500 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay="animate-delay-200">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center">
                    <HomeIcon size={24} className="text-ink-950" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Home Mode Active</p>
                    <p className="text-xs text-ink-400">Today's session: Full Body Bodyweight Blast</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Duration', value: '20 min', icon: Clock },
                    { label: 'Calories', value: '180', icon: Flame },
                    { label: 'Level', value: 'Beginner', icon: Target },
                  ].map((stat) => (
                    <div key={stat.label} className="glass rounded-xl p-3 text-center">
                      <stat.icon size={16} className="text-red-500 mx-auto mb-1" />
                      <p className="text-sm font-bold text-white">{stat.value}</p>
                      <p className="text-[10px] text-ink-400 uppercase">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  {['Jumping jacks (45s)', 'Bodyweight squats x15', 'Push-ups x10', 'Plank hold 30s'].map((ex, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-ink-200">
                      <div className="w-6 h-6 rounded-md bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xs font-bold text-red-500">
                        {i + 1}
                      </div>
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Workout Filters + Grid */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <SectionHeading
            label="Home Workouts"
            title="Find Your Perfect Home Workout"
            subtitle="Filter by goal, level, equipment, and duration to find the right session for right now."
          />

          {/* Filters */}
          <Reveal>
            <div className="glass rounded-2xl p-6 mt-14 space-y-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Filter size={16} className="text-red-500" />
                Filters
              </div>

              <div>
                <p className="text-xs text-ink-400 uppercase tracking-wider mb-2">Goal</p>
                <div className="flex flex-wrap gap-2">
                  {['All', ...GOALS].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGoalFilter(g)}
                      className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                        goalFilter === g ? 'bg-red-500 text-ink-950' : 'glass text-ink-200 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-ink-400 uppercase tracking-wider mb-2">Fitness Level</p>
                <div className="flex flex-wrap gap-2">
                  {levels.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLevelFilter(l)}
                      className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                        levelFilter === l ? 'bg-red-500 text-ink-950' : 'glass text-ink-200 hover:text-white'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-ink-400 uppercase tracking-wider mb-2">Available Equipment</p>
                <div className="flex flex-wrap gap-2">
                  {['All', ...EQUIPMENT].map((eq) => (
                    <button
                      key={eq}
                      onClick={() => setEquipmentFilter(eq)}
                      className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                        equipmentFilter === eq ? 'bg-red-500 text-ink-950' : 'glass text-ink-200 hover:text-white'
                      }`}
                    >
                      {eq}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-ink-400 uppercase tracking-wider mb-2">Workout Duration</p>
                <div className="flex flex-wrap gap-2">
                  {durations.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDurationFilter(d)}
                      className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                        durationFilter === d ? 'bg-red-500 text-ink-950' : 'glass text-ink-200 hover:text-white'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Results */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-ink-400">
              Showing <span className="text-white font-bold">{filtered.length}</span> workout{filtered.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={() => { setGoalFilter('All'); setLevelFilter('All'); setEquipmentFilter('All'); setDurationFilter('All'); }}
              className="text-xs text-ink-400 hover:text-red-500 transition-colors"
            >
              Clear filters
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-16 text-center mt-6">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto mb-4">
                <Dumbbell size={28} className="text-ink-500" />
              </div>
              <p className="text-lg font-bold text-white">No workouts match your filters</p>
              <p className="text-sm text-ink-400 mt-1">Try adjusting your filters to see more options.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filtered.map((workout, i) => (
                <Reveal key={workout.id} delay={`animate-delay-${(i % 3) * 100}`}>
                  <div
                    className="group glass rounded-2xl overflow-hidden card-hover cursor-pointer h-full flex flex-col"
                    onClick={() => setSelected(workout)}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img src={workout.image} alt={workout.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="badge bg-ink-950/80 text-white backdrop-blur-sm">{workout.type}</span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="badge bg-red-500/20 text-red-400 border border-red-500/20 backdrop-blur-sm">{workout.level}</span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 text-xs text-white">
                        <span className="flex items-center gap-1"><Clock size={12} /> {workout.duration} min</span>
                        <span className="flex items-center gap-1"><Flame size={12} /> {workout.calories} cal</span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-base font-bold text-white">{workout.name}</h3>
                      <div className="flex items-center gap-2 mt-2 text-xs text-ink-400">
                        <Target size={12} className="text-red-500" />
                        {workout.goal}
                        <span className="text-ink-600">•</span>
                        <Dumbbell size={12} className="text-red-500" />
                        {workout.equipment}
                      </div>
                      <div className="mt-4 flex items-center gap-1.5 text-sm font-bold text-red-500">
                        <Play size={14} />
                        Start Workout
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-x">
          <div className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-red-500/5 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Never Miss a Workout Again</h2>
              <p className="text-ink-300 mt-4 max-w-xl mx-auto">Join FitSync and get Home Mode with every plan — plus full gym access, trainer support, and nutrition coaching.</p>
              <Button to="/free-trial" size="lg" className="mt-8">
                <Zap size={18} />
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Workout Detail Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.name} maxWidth="max-w-2xl">
        {selected && (
          <div>
            <img src={selected.image} alt={selected.name} className="w-full h-48 rounded-xl object-cover mb-6" />
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Duration', value: `${selected.duration} min`, icon: Clock },
                { label: 'Calories', value: `${selected.calories}`, icon: Flame },
                { label: 'Level', value: selected.level, icon: Target },
                { label: 'Equipment', value: selected.equipment, icon: Dumbbell },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-3 text-center">
                  <stat.icon size={16} className="text-red-500 mx-auto mb-1" />
                  <p className="text-sm font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-ink-400 uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Exercises</h4>
            <div className="space-y-2">
              {selected.exercises.map((ex, i) => (
                <div key={i} className="flex items-center gap-3 glass rounded-xl p-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xs font-bold text-red-500 shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-sm text-ink-200">{ex}</span>
                </div>
              ))}
            </div>
            <Button to="/register" className="mt-6 w-full">
              Start This Workout <ArrowRight size={16} />
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
