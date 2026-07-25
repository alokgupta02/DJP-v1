import { useState, useEffect } from "react";
import { MapPin, Edit3, Share2, Phone, Mail, Home, ShieldCheck, X } from "lucide-react";

import { fetchUser, updateProfile } from "./usersApi";
import type { UserDto } from "./usersApi";

export default function ProfilePage() {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let userId = "11111111-1111-1111-1111-111111111111"; // Fallback dev user ID
        const userStr = localStorage.getItem("djp_user");
        if (userStr) {
          const parsed = JSON.parse(userStr);
          if (parsed.id) {
            userId = parsed.id;
          }
        }
        
        const data = await fetchUser(userId);
        setUser(data);
        localStorage.setItem("djp_user", JSON.stringify(data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-[var(--color-text-secondary)]">Loading profile...</div>;
  }

  if (!user) {
    return <div className="p-8 text-center text-[var(--color-error)]">Failed to load profile.</div>;
  }

  const initials = user.fullName?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';

  return (
    <div className="flex-1 p-8 overflow-y-auto relative">
      <header className="w-full bg-[var(--color-bg-muted)] rounded-xl p-6 flex items-center justify-between border border-[var(--color-border)] shadow-sm overflow-hidden relative">
        <div className="flex items-center gap-6 z-10">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-[var(--color-brand)] p-1 bg-[var(--color-bg-page)]">
              <div className="w-full h-full rounded-full bg-[var(--color-brand-light)] flex items-center justify-center text-3xl font-bold text-[var(--color-brand)]">{initials}</div>
            </div>
            <div className="absolute bottom-0 right-0 bg-[var(--color-brand)] text-white p-1.5 rounded-full border-2 border-[var(--color-bg-page)]">
              <ShieldCheck size={14} />
            </div>
          </div>
          <div>
            <h2 className="text-[var(--text-display)] font-bold text-[var(--color-text-primary)]">{user.fullName || 'Citizen'}</h2>
            <div className="flex items-center gap-2 mt-1">
              <MapPin size={16} className="text-[var(--color-brand)]" />
              <p className="text-base text-[var(--color-text-secondary)]">
                {user.ward ? user.ward : user.location || 'Location Not Set'}
              </p>
            </div>
            <div className="flex gap-2 mt-3">
              <span className="bg-[var(--color-brand-light)] text-[var(--color-brand)] px-3 py-1 rounded-full text-[11px] font-bold">ACTIVE CITIZEN</span>
              {user.onboardingCompleted && (
                <span className="bg-[var(--color-bg-subtle)] text-[var(--color-success)] px-3 py-1 rounded-full text-[11px] font-bold">VERIFIED</span>
              )}
            </div>
          </div>
        </div>
        <div className="z-10 flex flex-col gap-2">
          <button onClick={() => setIsEditing(true)} className="bg-[var(--color-brand)] text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95 text-sm">
            <Edit3 size={16} />
            Edit Profile
          </button>
          <button className="bg-[var(--color-bg-surface)] text-[var(--color-brand)] border border-[var(--color-brand)] px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-[var(--color-bg-subtle)] transition-all active:scale-95 text-sm">
            <Share2 size={16} />
            Share Stats
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("djp_user");
              localStorage.removeItem("djp_token");
              window.location.href = "/login";
            }}
            className="bg-red-50 text-red-600 border border-red-200 px-6 py-2 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-all active:scale-95 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="grid grid-cols-12 gap-4 mt-6">
        <div className="col-span-12 md:col-span-6 lg:col-span-4 rounded-xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-hover)] p-6 text-white shadow-md hover:scale-[1.02] transition-transform cursor-default">
          <div className="flex justify-between items-start">
            <span className="text-3xl font-bold opacity-80">📢</span>
          </div>
          <div className="mt-6">
            <h3 className="text-[56px] leading-tight font-bold">0</h3>
            <p className="text-lg opacity-90">Issues Reported</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[var(--color-bg-surface)] rounded-xl p-6 border border-[var(--color-border)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand)]">
              <MessageSquareIcon />
            </div>
            <div>
              <h3 className="text-[var(--text-display)] leading-none font-bold text-[var(--color-text-primary)]">0</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Discussions Created</p>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-12 lg:col-span-4 bg-[var(--color-bg-surface)] rounded-xl p-6 border border-[var(--color-border)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[var(--color-brand)] text-white">
              <VoteIcon />
            </div>
            <div>
              <h3 className="text-[var(--text-display)] leading-none font-bold text-[var(--color-text-primary)]">0</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Polls Created</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <section className="col-span-12 lg:col-span-5">
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Account Details</h3>
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow-sm">
            <div className="space-y-5">
              {[
                { icon: Phone, label: "Mobile Number", value: user.phoneNumber || "Not set" },
                { icon: Mail, label: "Email Address", value: user.email },
                { icon: Home, label: "Primary Address", value: `${user.locality || ''}, ${user.city || ''}, ${user.state || ''}`.replace(/^, | ,|, $/g, '').trim() || user.location || "Not set" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <item.icon size={18} className="text-[var(--color-text-secondary)] shrink-0 mt-0.5" />
                  <div className="flex-grow min-w-0">
                    <p className="text-[11px] text-[var(--color-text-secondary)]">{item.label}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-[var(--color-text-primary)]">{item.value}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-4 pt-4 border-t border-[var(--color-border)]">
                <MapPin size={18} className="text-[var(--color-text-secondary)] shrink-0 mt-0.5" />
                <div className="flex-grow">
                  <p className="text-[11px] text-[var(--color-text-secondary)]">Registered Ward</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">{user.ward || "Not set"}</span>
                    <span className="bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] px-3 py-1 rounded text-[11px]">LOCKED</span>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">Ward changes require address verification.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="col-span-12 lg:col-span-7">
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">About Me</h3>
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow-sm h-full">
            <div className="mb-4">
                <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">Occupation</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{user.occupation || "Not set"}</p>
            </div>
            <div className="mb-4">
                <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">Bio</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{user.bio || "No bio provided."}</p>
            </div>
            <div>
                <p className="text-sm font-bold text-[var(--color-text-primary)] mb-2">Topics of Interest</p>
                <div className="flex flex-wrap gap-2">
                    {user.topics ? user.topics.split(',').map(t => (
                        <span key={t.trim()} className="bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs px-2 py-1 rounded-md text-[var(--color-text-secondary)]">
                            {t.trim()}
                        </span>
                    )) : <span className="text-sm text-[var(--color-text-secondary)]">None selected</span>}
                </div>
            </div>
          </div>
        </section>
      </div>

      {isEditing && (
        <EditProfileModal user={user} onClose={() => setIsEditing(false)} onSave={(updatedUser) => {
          setUser({ ...user, ...updatedUser });
          localStorage.setItem("djp_user", JSON.stringify({ ...user, ...updatedUser }));
          setIsEditing(false);
        }} />
      )}
    </div>
  );
}

function EditProfileModal({ user, onClose, onSave }: { user: UserDto, onClose: () => void, onSave: (u: Partial<UserDto>) => void }) {
  const [fullName, setFullName] = useState(user.fullName || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [dob, setDob] = useState(user.dob || "");
  const [gender, setGender] = useState(user.gender || "");
  const [location, setLocation] = useState(user.location || "");
  const [city, setCity] = useState(user.city || "");
  const [state, setState] = useState(user.state || "");
  const [country, setCountry] = useState(user.country || "");
  const [ward, setWard] = useState(user.ward || "");
  const [bio, setBio] = useState(user.bio || "");
  const [occupation, setOccupation] = useState(user.occupation || "");
  const [topics, setTopics] = useState(user.topics ? user.topics.split(',').map(t => t.trim()).join(', ') : "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateProfile(user.id, {
        name: fullName,
        phoneNumber,
        dob,
        gender,
        location,
        city,
        state,
        country,
        ward,
        bio,
        occupation,
        topics: topics.split(',').map(t => t.trim()).filter(Boolean)
      });
      onSave(updated);
    } catch (e) {
      console.error(e);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-bg-page)] rounded-xl w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center shrink-0">
          <h2 className="font-bold text-lg text-[var(--color-text-primary)]">Edit Profile</h2>
          <button onClick={onClose} className="p-1 hover:bg-[var(--color-bg-subtle)] rounded-full text-[var(--color-text-secondary)]">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-[var(--color-text-primary)] mb-1">Full Name</label>
                    <input 
                        type="text" value={fullName} onChange={e => setFullName(e.target.value)} 
                        className="w-full px-3 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-[var(--color-text-primary)] mb-1">Phone Number</label>
                    <input 
                        type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} 
                        className="w-full px-3 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-[var(--color-text-primary)] mb-1">Date of Birth</label>
                    <input 
                        type="date" value={dob} onChange={e => setDob(e.target.value)} 
                        className="w-full px-3 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-[var(--color-text-primary)] mb-1">Gender</label>
                    <select 
                        value={gender} onChange={e => setGender(e.target.value)} 
                        className="w-full px-3 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)]"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-[var(--color-text-primary)] mb-1">Address / Location</label>
                    <input 
                        type="text" value={location} onChange={e => setLocation(e.target.value)} 
                        className="w-full px-3 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-[var(--color-text-primary)] mb-1">City</label>
                    <input 
                        type="text" value={city} onChange={e => setCity(e.target.value)} 
                        className="w-full px-3 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-[var(--color-text-primary)] mb-1">Ward</label>
                    <input 
                        type="text" value={ward} onChange={e => setWard(e.target.value)} 
                        className="w-full px-3 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-[var(--color-text-primary)] mb-1">State</label>
                    <input 
                        type="text" value={state} onChange={e => setState(e.target.value)} 
                        className="w-full px-3 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-[var(--color-text-primary)] mb-1">Country</label>
                    <input 
                        type="text" value={country} onChange={e => setCountry(e.target.value)} 
                        className="w-full px-3 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)]"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-[var(--color-text-primary)] mb-1">Occupation</label>
                    <input 
                        type="text" value={occupation} onChange={e => setOccupation(e.target.value)} 
                        className="w-full px-3 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)]"
                        placeholder="e.g. Software Engineer"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-[var(--color-text-primary)] mb-1">Bio</label>
                    <textarea 
                        value={bio} onChange={e => setBio(e.target.value)} rows={3}
                        className="w-full px-3 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)]"
                        placeholder="Tell your neighbors about yourself..."
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-[var(--color-text-primary)] mb-1">Topics of Interest</label>
                    <input 
                        type="text" value={topics} onChange={e => setTopics(e.target.value)} 
                        className="w-full px-3 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-brand)]"
                        placeholder="Comma separated: Roads, Water, Education"
                    />
                </div>
            </div>
        </div>
        <div className="p-4 border-t border-[var(--color-border)] flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-4 py-2 font-bold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] rounded-lg text-sm">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[var(--color-brand)] text-white font-bold rounded-lg text-sm disabled:opacity-50 flex items-center gap-2 hover:shadow-md">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageSquareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function VoteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 12 2 2 4-4" />
      <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
      <path d="M22 19H2" />
    </svg>
  );
}
