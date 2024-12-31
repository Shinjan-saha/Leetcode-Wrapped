'use client';

import { useState } from 'react';
import { Trophy, Target, Award, Search, Code2, Brain } from 'lucide-react';
import { GlassCard } from './components/Glasscard';
import { StatsCard } from './components/StatsCard';
import { CelebrationEffects } from './components/CelebrationEffect';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const fetchUserData = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`/api/user?username=${username}`);
      const data = await response.json();
      if (response.ok) {
        setUserData(data);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(30deg, #FFD700 12%, transparent 12.5%, transparent 87%, #FFD700 87.5%, #FFD700),
            linear-gradient(150deg, #FFD700 12%, transparent 12.5%, transparent 87%, #FFD700 87.5%, #FFD700),
            linear-gradient(30deg, #FFD700 12%, transparent 12.5%, transparent 87%, #FFD700 87.5%, #FFD700),
            linear-gradient(150deg, #FFD700 12%, transparent 12.5%, transparent 87%, #FFD700 87.5%, #FFD700),
            linear-gradient(60deg, #FFD700 25%, transparent 25.5%, transparent 75%, #FFD700 75%, #FFD700),
            linear-gradient(60deg, #FFD700 25%, transparent 25.5%, transparent 75%, #FFD700 75%, #FFD700)`,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px'
        }}></div>
      </div>

      {/* Glassmorphism orbs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 -right-20 w-72 h-72 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-40 w-72 h-72 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {showCelebration && <CelebrationEffects />}

      <div className="relative z-10 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center space-y-4 mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <Brain className="w-16 h-16 text-[#FFD700]" />
              </div>
            </div>
            <h1 className="text-6xl font-bold text-[#FFD700] tracking-tight">
              LeetCode Wrapped 
            </h1>
            <p className="text-xl text-gray-400">Celebrate Your Coding Journey</p>
          </div>

          <GlassCard className="max-w-xl mx-auto mb-16 rounded-xl p-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter your LeetCode username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-transparent transition-all"
              />
              <button
                onClick={fetchUserData}
                disabled={loading}
                className={`absolute right-2 top-2 px-6 py-2 rounded-lg font-semibold transition-all ${
                  loading
                    ? 'bg-gray-600/50 cursor-not-allowed'
                    : 'bg-[#FFD700]/90 hover:bg-[#FFD700] text-black backdrop-blur-sm'
                }`}
              >
                {loading ? 'Loading...' : 'Generate'}
              </button>
            </div>
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 backdrop-blur-sm rounded-lg text-red-500 text-center border border-red-500/20">
                {error}
              </div>
            )}
          </GlassCard>

          {userData && (
            <div className="space-y-8">
              <GlassCard className="rounded-2xl p-8">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-[#FFD700]/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-black" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-[#FFD700]">{userData.username}</h2>
                    <p className="text-gray-400 text-lg">Global Rank #{userData.profile?.ranking}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatsCard
                    icon={Target}
                    label="Total Solved"
                    value={userData.submitStats?.acSubmissionNum?.[0]?.count || 0}
                  />
                  <StatsCard
                    icon={Award}
                    label="Reputation"
                    value={userData.profile?.reputation || 0}
                  />
                  <StatsCard
                    icon={Code2}
                    label="Submissions"
                    value={userData.submitStats?.totalSubmissionNum?.[0]?.count || 0}
                  />
                </div>
              </GlassCard>

              <GlassCard className="rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-[#FFD700]">Problem Solving Distribution</h3>
                <div className="space-y-6">
                  {userData.submitStats?.acSubmissionNum?.map((item: { difficulty: string; count: number }, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg capitalize text-gray-400">{item.difficulty}</span>
                        <span className="text-lg font-semibold text-[#FFD700]">{item.count}</span>
                      </div>
                      <div className="w-full bg-black/30 backdrop-blur-sm rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-[#FFD700]/80 to-[#FFD700] h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${(item.count / userData.submitStats.acSubmissionNum[0].count) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}