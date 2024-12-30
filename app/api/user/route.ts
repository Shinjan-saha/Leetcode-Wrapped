import { NextResponse } from 'next/server';
import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('https://leetcode.com/graphql/');

const QUERY = gql`
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        realName
        aboutMe
        userAvatar
        ranking
        reputation
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

interface UserProfileResponse {
  matchedUser: {
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
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const data = await client.request<UserProfileResponse>(QUERY, { username });
    return NextResponse.json(data.matchedUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch stats' }, { status: 500 });
  }
}
