'use client';

import { useState } from 'react';
import { Trophy, Target, Award, Search, Github, Code2, Brain } from 'lucide-react';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`/api/user?username=${username}`);
      const data = await response.json();
      if (response.ok) {
        setUserData(data);
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
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex justify-center mb-6">
            <Brain className="w-16 h-16 text-[#FFD700]" />
          </div>
          <h1 className="text-6xl font-bold text-[#FFD700] tracking-tight">
            LeetCode Wrapped 
          </h1>
          <p className="text-xl text-gray-400">Celebrate Your Coding Journey</p>
        </div>

        {/* Search Section */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter your LeetCode username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-4 rounded-xl bg-[#2A2A2A] border-2 border-[#FFD700] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all"
            />
            <button
              onClick={fetchUserData}
              disabled={loading}
              className={`absolute right-2 top-2 px-6 py-2 rounded-lg font-semibold transition-all ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-[#FFD700] hover:bg-[#FFC000] text-black'
              }`}
            >
              {loading ? 'Loading...' : 'Generate'}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 rounded-lg text-red-500 text-center">
              {error}
            </div>
          )}
        </div>

        {/* Stats Section */}
        {userData && (
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-[#2A2A2A] rounded-2xl p-8 border-2 border-[#FFD700]">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-[#FFD700] rounded-full flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-black" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[#FFD700]">{userData.username}</h2>
                  <p className="text-gray-400 text-lg">Global Rank #{userData.profile?.ranking}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#333] p-6 rounded-xl">
                  <Target className="w-8 h-8 text-[#FFD700] mb-3" />
                  <p className="text-gray-400">Total Solved</p>
                  <p className="text-3xl font-bold text-[#FFD700]">
                    {userData.submitStats?.acSubmissionNum?.[0]?.count || 0}
                  </p>
                </div>
                <div className="bg-[#333] p-6 rounded-xl">
                  <Award className="w-8 h-8 text-[#FFD700] mb-3" />
                  <p className="text-gray-400">Reputation</p>
                  <p className="text-3xl font-bold text-[#FFD700]">
                    {userData.profile?.reputation || 0}
                  </p>
                </div>
                <div className="bg-[#333] p-6 rounded-xl">
                  <Code2 className="w-8 h-8 text-[#FFD700] mb-3" />
                  <p className="text-gray-400">Submissions</p>
                  <p className="text-3xl font-bold text-[#FFD700]">
                    {userData.submitStats?.totalSubmissionNum?.[0]?.count || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Problem Distribution */}
            <div className="bg-[#2A2A2A] rounded-2xl p-8 border-2 border-[#FFD700]">
              <h3 className="text-2xl font-bold mb-6 text-[#FFD700]">Problem Solving Distribution</h3>
              <div className="space-y-6">
                {userData.submitStats?.acSubmissionNum?.map((item: { difficulty: string; count: number }, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg capitalize text-gray-400">{item.difficulty}</span>
                      <span className="text-lg font-semibold text-[#FFD700]">{item.count}</span>
                    </div>
                    <div className="w-full bg-[#333] rounded-full h-3">
                      <div
                        className="bg-[#FFD700] h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${(item.count / userData.submitStats.acSubmissionNum[0].count) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}