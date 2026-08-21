import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Target, AlertTriangle, Dumbbell, Activity as ActivityIcon, CheckCircle2, LogOut, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ACTIVITIES, ALLERGIES, GOALS, EQUIPMENT } from '@/data/mockData';
import type { Activity, Allergy, Goal, Equipment } from '@/data/mockData';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    activities: user?.activities || ([] as Activity[]),
    allergies: user?.allergies || ([] as Allergy[]),
    goals: user?.goals || ([] as Goal[]),
    equipment: user?.equipment || ([] as Equipment[]),
  });

  if (!user) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl p-10 text-center max-w-md">
          <User size={48} className="text-ink-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Not Logged In</h1>
          <p className="text-ink-300 mt-2 text-sm">Please sign in to view your profile.</p>
          <button onClick={() => navigate('/register')} className="btn-primary mt-6">
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  const toggleArray = <T extends string>(key: 'activities' | 'allergies' | 'goals' | 'equipment', value: T) => {
    setEditForm((prev) => {
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
        } as typeof prev;
      }
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      } as typeof prev;
    });
  };

  const handleSave = () => {
    updateProfile(editForm);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      activities: user.activities,
      allergies: user.allergies,
      goals: user.goals,
      equipment: user.equipment,
    });
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  const sections: { label: string; icon: typeof ActivityIcon; key: 'activities' | 'allergies' | 'goals' | 'equipment'; options: string[] }[] = [
    { label: 'Preferred Activities', icon: ActivityIcon, key: 'activities', options: ACTIVITIES },
    { label: 'Food Allergies', icon: AlertTriangle, key: 'allergies', options: ALLERGIES },
    { label: 'Personal Goals', icon: Target, key: 'goals', options: GOALS },
    { label: 'Available Equipment', icon: Dumbbell, key: 'equipment', options: EQUIPMENT },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container-x max-w-4xl">
        {/* Header */}
        <div className="glass rounded-3xl p-8 md:p-10 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold text-red-500">{initials}</span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <p className="text-ink-400 text-sm mt-1">{user.email}</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                {user.goals.map((g) => (
                  <span key={g} className="badge bg-red-500/10 text-red-400 border border-red-500/20">{g}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              {!editing ? (
                <button onClick={() => setEditing(true)} className="btn-outline px-4 py-2 text-xs">
                  <Edit3 size={14} /> Edit Profile
                </button>
              ) : (
                <>
                  <button onClick={handleSave} className="btn-primary px-4 py-2 text-xs">
                    <Save size={14} /> Save
                  </button>
                  <button onClick={handleCancel} className="btn-ghost px-4 py-2 text-xs">
                    <X size={14} /> Cancel
                  </button>
                </>
              )}
              <button onClick={handleLogout} className="btn-ghost px-4 py-2 text-xs text-red-400 hover:text-red-300">
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="glass rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <User size={18} className="text-red-500" /> Contact Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-ink-400 font-semibold uppercase tracking-wider">Name</label>
              {editing ? (
                <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="input-field mt-1" />
              ) : (
                <p className="text-white font-semibold mt-1 flex items-center gap-2"><User size={14} className="text-ink-500" /> {user.name}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-ink-400 font-semibold uppercase tracking-wider">Email</label>
              {editing ? (
                <input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="input-field mt-1" />
              ) : (
                <p className="text-white font-semibold mt-1 flex items-center gap-2"><Mail size={14} className="text-ink-500" /> {user.email}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-ink-400 font-semibold uppercase tracking-wider">Phone</label>
              {editing ? (
                <input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="input-field mt-1" />
              ) : (
                <p className="text-white font-semibold mt-1 flex items-center gap-2"><Phone size={14} className="text-ink-500" /> {user.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Preferences */}
        {sections.map((section) => {
          const Icon = section.icon;
          const currentValues = editing ? editForm[section.key] : user[section.key];
          return (
            <div key={section.key} className="glass rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <Icon size={18} className="text-red-500" /> {section.label}
              </h2>
              {editing ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {section.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => toggleArray(section.key, opt)}
                      className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                        (currentValues as string[]).includes(opt)
                          ? 'bg-red-500 text-white'
                          : 'glass text-ink-200 hover:border-red-500/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {currentValues.length > 0 ? (
                    currentValues.map((v) => (
                      <span key={v} className="badge bg-white/5 text-ink-100 border border-white/10">
                        <CheckCircle2 size={12} className="text-red-500" /> {v}
                      </span>
                    ))
                  ) : (
                    <p className="text-ink-400 text-sm">None selected</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
