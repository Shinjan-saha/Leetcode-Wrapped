'use client';

import { useState } from 'react';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    setError(null);
    setLoading(true); // Show loading state while fetching
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
      setLoading(false); // Hide loading state once done
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">LeetCode Wrap 2024</h1>
      <input
        type="text"
        placeholder="Enter your LeetCode username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border rounded w-64 mb-4"
      />
      <button
        onClick={fetchUserData}
        className={`px-4 py-2 rounded ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Fetch Stats'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {userData && (
        <div className="mt-8 bg-white shadow-md rounded-md p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Your LeetCode Stats</h2>
          <p className="mb-2">
            <span className="font-bold">Username:</span> {userData.username}
          </p>
          <p className="mb-2">
            <span className="font-bold">Ranking:</span> {userData.profile?.ranking}
          </p>
          <p className="mb-2">
            <span className="font-bold">Reputation:</span> {userData.profile?.reputation}
          </p>
          <p className="font-bold mt-4">Problems Solved:</p>
          <ul className="list-disc list-inside">
            {userData.submitStats?.acSubmissionNum?.map(
              (item: { difficulty: string; count: number }, index: number) => (
                <li key={index}>
                  <span className="capitalize">{item.difficulty}</span>: {item.count}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
