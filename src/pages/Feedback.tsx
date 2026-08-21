import { useState } from 'react';
import { Star, CheckCircle2, MessageSquare, Send, Quote, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionHeading, { Reveal } from '@/components/ui/SectionHeading';
import TestimonialCard from '@/components/shared/TestimonialCard';
import { testimonials } from '@/data/mockData';

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/32695898/pexels-photo-32695898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/80 to-ink-950" />
        </div>
        <div className="relative container-x text-center">
          <span className="section-label animate-fade-up">
            <MessageSquare size={14} />
            Share Your Experience
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white animate-fade-up animate-delay-100">
            We Value Your <span className="text-gradient">Feedback</span>
          </h1>
          <p className="mt-6 text-lg text-ink-300 max-w-2xl mx-auto animate-fade-up animate-delay-200">
            Your words help us improve and inspire others. Tell us about your FitSync experience.
          </p>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="pb-20">
        <div className="container-x max-w-2xl">
          <Reveal>
            <div className="glass rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Thank You for Your Feedback!</h3>
                  <p className="text-ink-300 mt-4 max-w-md mx-auto">
                    Your feedback has been submitted and is pending review. Once approved, it'll appear below for others to see.
                  </p>
                  <Button
                    onClick={() => { setSubmitted(false); setRating(0); setName(''); setFeedback(''); }}
                    variant="outline"
                    className="mt-8"
                  >
                    Submit Another Review
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-white mb-2 block">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-white mb-2 block">Your Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setRating(i)}
                          onMouseEnter={() => setHover(i)}
                          onMouseLeave={() => setHover(0)}
                          className="transition-transform hover:scale-125"
                          aria-label={`Rate ${i} stars`}
                        >
                          <Star
                            size={32}
                            className={(hover || rating) >= i ? 'fill-red-500 text-red-500' : 'fill-ink-700 text-ink-700'}
                          />
                        </button>
                      ))}
                      {rating > 0 && (
                        <span className="text-sm font-bold text-red-500 ml-2">{rating}.0</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-white mb-2 block">Your Feedback</label>
                    <textarea
                      required
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="input-field min-h-[140px]"
                      placeholder="Tell us about your experience at FitSync..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={rating === 0}>
                    <Send size={18} />
                    Submit Feedback
                  </Button>
                  {rating === 0 && (
                    <p className="text-center text-xs text-ink-400">Please select a rating to submit.</p>
                  )}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad bg-ink-900/50">
        <div className="container-x">
          <SectionHeading
            label="Member Stories"
            title="What Our Members Say"
            subtitle="Approved testimonials from the FitSync community."
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
      <section className="section-pad">
        <div className="container-x">
          <div className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-red-500/5 blur-3xl" />
            <div className="relative">
              <Quote size={40} className="text-red-500/30 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Start Your Journey?</h2>
              <p className="text-ink-300 mt-4 max-w-xl mx-auto">Join thousands of members who transformed their lives with FitSync.</p>
              <Button to="/free-trial" size="lg" className="mt-8">
                <Zap size={18} />
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
