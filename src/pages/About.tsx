import { useState } from 'react';
import { Target, Eye, Award, Users, Clock, Dumbbell, Apple, Zap, CheckCircle2, ArrowRight, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionHeading, { Reveal } from '@/components/ui/SectionHeading';
import TrainerCard from '@/components/shared/TrainerCard';
import TrainerProfile from '@/components/shared/TrainerProfile';
import FacilityCard from '@/components/shared/FacilityCard';
import TestimonialCard from '@/components/shared/TestimonialCard';
import Modal from '@/components/ui/Modal';
import { trainers, facilities, testimonials, gymTimings } from '@/data/mockData';
import type { Trainer } from '@/data/mockData';

const equipmentOverview = [
  { name: 'Olympic Power Racks', count: 12 },
  { name: 'Smith Machines', count: 4 },
  { name: 'Cable Crossovers', count: 6 },
  { name: 'Bench Press Stations', count: 10 },
  { name: 'Dumbbells (5-150 lbs)', count: 80 },
  { name: 'Cardio Machines', count: 35 },
  { name: 'Functional Training Rig', count: 1 },
  { name: 'CrossFit Rig', count: 1 },
];

export default function About() {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/6389516/pexels-photo-6389516.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/80 to-ink-950" />
        </div>
        <div className="relative container-x text-center">
          <span className="section-label animate-fade-up">
            <Award size={14} />
            Our Story
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white animate-fade-up animate-delay-100">
            Built by Athletes,<br /><span className="text-gradient">For Athletes</span>
          </h1>
          <p className="mt-6 text-lg text-ink-300 max-w-2xl mx-auto animate-fade-up animate-delay-200">
            FitSync was born from a simple belief: fitness should be accessible, intelligent, and community-driven. We're not just a gym — we're a platform that adapts to you.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <span className="section-label mb-4">
                  <Zap size={14} />
                  The FitSync Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">From a Single Rack to a Movement</h2>
                <div className="mt-6 space-y-4 text-ink-300 leading-relaxed">
                  <p>FitSync started in 2018 with a single power rack and a big idea: what if your gym could think with you? Our founders — a competitive powerlifter and a software engineer — saw a gap between traditional gyms and the technology that could make training smarter.</p>
                  <p>Today, FitSync is a 20,000 sq ft premium facility with over 12,000 active members, 50+ certified trainers, and a digital platform that follows you from the gym floor to your living room. We believe in data-driven training, elite coaching, and a community that pushes each other to be better.</p>
                  <p>Every feature we build — from the live crowd indicator to home mode — comes from one question: how can we make your fitness journey smoother, smarter, and more sustainable?</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay="animate-delay-200">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.pexels.com/photos/17956264/pexels-photo-17956264.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="rounded-2xl object-cover w-full h-64" />
                <img src="https://images.pexels.com/photos/6388450/pexels-photo-6388450.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="rounded-2xl object-cover w-full h-64 mt-8" />
                <img src="https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="rounded-2xl object-cover w-full h-64 -mt-8" />
                <img src="https://images.pexels.com/photos/38453215/pexels-photo-38453215.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="rounded-2xl object-cover w-full h-64" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal>
              <div className="glass rounded-2xl p-8 h-full">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                  <Target size={28} className="text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                <p className="text-ink-300 mt-4 leading-relaxed">
                  To make premium fitness accessible to everyone by combining world-class facilities, elite coaching, and intelligent technology — so that every person, regardless of their starting point, can achieve their fitness goals and build a sustainable, healthy lifestyle.
                </p>
              </div>
            </Reveal>
            <Reveal delay="animate-delay-200">
              <div className="glass rounded-2xl p-8 h-full">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                  <Eye size={28} className="text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                <p className="text-ink-300 mt-4 leading-relaxed">
                  To become the world's most adaptive fitness platform — one that seamlessly bridges the gap between gym, home, and nutrition, empowering millions to train smarter, eat better, and live stronger through data-driven, personalized experiences.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Premium Gym Experience */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            label="Premium Experience"
            title="More Than a Workout"
            subtitle="Every detail of FitSync is designed to make your fitness journey premium — from the moment you walk in."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {[
              { icon: Dumbbell, title: 'Competition-Grade Equipment', desc: 'Rogue, Eleiko, and Hammer Strength — the same brands trusted by professional athletes worldwide.' },
              { icon: Apple, title: 'Elite Nutrition Coaching', desc: 'Registered dietitians create personalized meal plans with allergy-aware alternatives for every member.' },
              { icon: Users, title: 'Expert Trainers', desc: 'Every trainer holds nationally recognized certifications and brings years of real coaching experience.' },
              { icon: Clock, title: 'Smart Scheduling', desc: 'Book sessions, reserve classes, and check crowd levels — all from the FitSync app.' },
              { icon: Zap, title: 'Recovery Zone', desc: 'Sauna, steam room, and dedicated mobility area for post-workout recovery and injury prevention.' },
              { icon: CheckCircle2, title: 'Spotless Facility', desc: 'Cleaned hourly with hospital-grade products. Fresh towels and premium amenities always available.' },
            ].map((item, i) => (
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

      {/* Elite Nutrition Coaching */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal delay="animate-delay-200">
              <div className="relative">
                <img src="https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Nutrition coaching" className="rounded-2xl object-cover w-full h-96" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-ink-950/50 to-transparent" />
              </div>
            </Reveal>
            <Reveal>
              <div>
                <span className="section-label mb-4">
                  <Apple size={14} />
                  Elite Nutrition Coaching
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Fuel Your Body Right</h2>
                <p className="text-ink-300 mt-4 text-base leading-relaxed">
                  Our registered dietitians don't just hand you a meal plan — they coach you. With allergy-aware alternatives, goal-specific nutrition strategies, and ongoing accountability, we make eating well sustainable and enjoyable.
                </p>
                <ul className="mt-6 space-y-3">
                  {['Personalized meal plans for muscle gain, weight loss & balanced fitness', 'Allergy-aware food alternatives built into every plan', 'Weekly check-ins with your nutrition coach', 'Body composition analysis & macro tracking'].map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm text-ink-200">
                      <CheckCircle2 size={18} className="text-red-500 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button to="/nutrition" className="mt-8">
                  Explore Nutrition <ArrowRight size={16} />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            label="Professional Trainers"
            title="Meet the Experts Behind Your Results"
            subtitle="Certified, experienced, and passionate about helping you reach your goals."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {trainers.map((trainer, i) => (
              <Reveal key={trainer.id} delay={`animate-delay-${(i % 3) * 100}`}>
                <TrainerCard trainer={trainer} onViewProfile={setSelectedTrainer} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <SectionHeading
            label="Gym Facilities"
            title="8 Dedicated Training Zones"
            subtitle="Every square foot is designed with purpose — from heavy lifting to mindful recovery."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {facilities.map((facility, i) => (
              <Reveal key={facility.id} delay={`animate-delay-${(i % 4) * 100}`}>
                <FacilityCard facility={facility} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Overview */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            label="Equipment Overview"
            title="Pro-Grade Gear, Always Ready"
            subtitle="We invest in the best equipment so you can train without compromise."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
            {equipmentOverview.map((eq, i) => (
              <Reveal key={eq.name} delay={`animate-delay-${(i % 4) * 100}`}>
                <div className="glass rounded-xl p-5 text-center card-hover">
                  <p className="text-3xl font-bold text-red-500">{eq.count}</p>
                  <p className="text-sm text-ink-200 mt-1">{eq.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gym Timings */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <SectionHeading
            label="Opening Hours"
            title="We're Here When You Need Us"
            subtitle="Early birds and night owls — we've got you covered."
          />
          <Reveal>
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto mt-14">
              <div className="space-y-4">
                {gymTimings.map((timing) => (
                  <div key={timing.day} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <Clock size={18} className="text-red-500" />
                      </div>
                      <span className="text-sm font-bold text-white">{timing.day}</span>
                    </div>
                    <span className="text-sm text-ink-300">{timing.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            label="Member Stories"
            title="What Our Members Say"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {testimonials.map((testimonial, i) => (
              <Reveal key={testimonial.id} delay={`animate-delay-${(i % 3) * 100}`}>
                <TestimonialCard testimonial={testimonial} />
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
              <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Join the FitSync Family?</h2>
              <p className="text-ink-300 mt-4 max-w-xl mx-auto">Start your free 7-day trial today. Full access, no commitment, no card required.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button to="/free-trial" size="lg">
                  <Zap size={18} />
                  Start Free Trial
                </Button>
                <Button to="/contact" variant="outline" size="lg">
                  <Calendar size={18} />
                  Book a Tour
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={!!selectedTrainer} onClose={() => setSelectedTrainer(null)} title="Trainer Profile">
        {selectedTrainer && <TrainerProfile trainer={selectedTrainer} />}
      </Modal>
    </div>
  );
}
