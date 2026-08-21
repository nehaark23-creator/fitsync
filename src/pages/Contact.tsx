import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Facebook, Youtube, Send, CheckCircle2, Navigation } from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionHeading, { Reveal } from '@/components/ui/SectionHeading';
import { gymTimings } from '@/data/mockData';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+1 (555) 348-7890', href: 'tel:+15553487890' },
    { icon: Mail, label: 'Email', value: 'hello@fitsync.com', href: 'mailto:hello@fitsync.com' },
    { icon: MapPin, label: 'Address', value: '247 Iron Street, Downtown, NY 10001', href: '#' },
  ];

  const socials = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
    { icon: MessageCircle, label: 'WhatsApp', href: '#' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/13104546/pexels-photo-13104546.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/80 to-ink-950" />
        </div>
        <div className="relative container-x text-center">
          <span className="section-label animate-fade-up">
            <MessageCircle size={14} />
            Get in Touch
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white animate-fade-up animate-delay-100">
            Let's <span className="text-gradient">Connect</span>
          </h1>
          <p className="mt-6 text-lg text-ink-300 max-w-2xl mx-auto animate-fade-up animate-delay-200">
            Questions about membership, training, or nutrition? We're here to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-12">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, i) => (
              <Reveal key={info.label} delay={`animate-delay-${(i + 1) * 100}`}>
                <a href={info.href} className="glass rounded-2xl p-6 card-hover flex items-center gap-4 h-full">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <info.icon size={22} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-400 uppercase tracking-wider">{info.label}</p>
                    <p className="text-sm font-bold text-white mt-0.5">{info.value}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="section-pad">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <Reveal>
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
                <p className="text-sm text-ink-300 mt-2">Fill out the form below and we'll get back to you within 24 hours.</p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                    <p className="text-sm text-ink-300 mt-2">Thank you for reaching out. We'll respond within 24 hours.</p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-6">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-white mb-1.5 block">Full Name</label>
                        <input type="text" required className="input-field" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-white mb-1.5 block">Phone</label>
                        <input type="tel" required className="input-field" placeholder="+1 555 000 0000" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-white mb-1.5 block">Email</label>
                      <input type="email" required className="input-field" placeholder="you@email.com" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-white mb-1.5 block">Subject</label>
                      <select className="input-field cursor-pointer">
                        <option>General Inquiry</option>
                        <option>Membership Question</option>
                        <option>Personal Training</option>
                        <option>Nutrition Coaching</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-white mb-1.5 block">Message</label>
                      <textarea required className="input-field min-h-[120px]" placeholder="How can we help you?" />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send size={16} />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Map + Hours + WhatsApp */}
            <Reveal delay="animate-delay-200">
              <div className="space-y-6">
                {/* Map placeholder */}
                <div className="glass rounded-2xl overflow-hidden h-72 relative">
                  <div className="absolute inset-0 grid-pattern opacity-30 bg-ink-800" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <Navigation size={28} className="text-red-500" />
                    </div>
                    <p className="text-sm font-bold text-white">FitSync Gym Location</p>
                    <p className="text-xs text-ink-400">247 Iron Street, Downtown, NY 10001</p>
                    <a href="#" className="text-xs text-red-500 hover:underline">Open in Google Maps</a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={18} className="text-red-500" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Opening Hours</h3>
                  </div>
                  <div className="space-y-3">
                    {gymTimings.map((t) => (
                      <div key={t.day} className="flex items-center justify-between text-sm">
                        <span className="text-ink-300">{t.day}</span>
                        <span className="font-semibold text-white">{t.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a href="#" className="glass rounded-2xl p-6 flex items-center gap-4 card-hover group">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0">
                    <MessageCircle size={24} className="text-[#25D366]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white">Chat on WhatsApp</h3>
                    <p className="text-xs text-ink-400 mt-0.5">Get instant answers from our team</p>
                  </div>
                  <Send size={18} className="text-ink-400 group-hover:text-red-500 transition-colors" />
                </a>

                {/* Socials */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Follow Us</h3>
                  <div className="flex items-center gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-11 h-11 rounded-xl glass flex items-center justify-center text-ink-300 hover:text-red-500 hover:border-red-500/30 transition-all hover:scale-110"
                      >
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
