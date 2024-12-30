type UserStatsProps = {
    stats: {
      username: string;
      profile: {
        realName: string;
        aboutMe: string;
        userAvatar: string;
        ranking: number;
        reputation: number;
      };
      submitStats: {
        acSubmissionNum: {
          difficulty: string;
          count: number;
        }[];
      };
    };
  };
  
  export default function UserStats({ stats }: UserStatsProps) {
    return (
      <div className="mt-8 bg-white shadow-md rounded-md p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Your LeetCode Stats</h2>
        <img
          src={stats.profile.userAvatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <p className="text-center font-bold">{stats.profile.realName}</p>
        <p className="text-center text-sm text-gray-500">@{stats.username}</p>
        <p className="text-center text-sm text-gray-500">Ranking: {stats.profile.ranking}</p>
        <p className="text-center text-sm text-gray-500">Reputation: {stats.profile.reputation}</p>
  
        <h3 className="mt-6 text-lg font-semibold">Problems Solved:</h3>
        <ul className="space-y-2">
          {stats.submitStats.acSubmissionNum.map((stat) => (
            <li key={stat.difficulty}>
              {stat.difficulty}: {stat.count}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  