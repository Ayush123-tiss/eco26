import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Avatar } from '@/shared/components/ui/avatar';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  posts: number;
  followers: number;
  following: number;
  bio: string;
  location: string;
  website: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'activity'>('posts');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        joinDate: 'January 2023',
        posts: 42,
        followers: 1250,
        following: 180,
        bio: 'Passionate about sustainable living and eco-friendly solutions. Love to share tips for reducing our environmental footprint.',
        location: 'San Francisco, CA',
        website: 'https://johndoe.eco'
      });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-32 rounded-lg mb-6"></div>
            <div className="flex space-x-6">
              <div className="bg-gray-200 w-32 h-32 rounded-full"></div>
              <div className="flex-1 space-y-4">
                <div className="bg-gray-200 h-6 w-3/4 rounded"></div>
                <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        {/* Cover Photo */}
        <div 
          className="h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg mb-6"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=300&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-end md:space-x-6 mb-8">
          <div className="relative mb-4 md:mb-0">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </Avatar>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
            <p className="text-gray-600 mb-4">{user.bio}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <span>📍 {user.location}</span>
              <span>🔗 <a href={user.website} className="text-blue-600 hover:underline">{user.website}</a></span>
              <span>📅 Joined {user.joinDate}</span>
            </div>

            <div className="flex space-x-6 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{user.posts}</div>
                <div className="text-sm text-gray-500">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{user.followers.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{user.following}</div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button>Follow</Button>
              <Button variant="outline">Message</Button>
              <Button variant="outline">Share</Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {(['posts', 'about', 'activity'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'posts' && (
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10">
                      <img src={user.avatar} alt={user.name} />
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge variant="secondary">Eco Warrior</Badge>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-700 mb-3">
                        Just switched to solar panels! 🌞 The installation process was smoother than expected, 
                        and I'm already seeing a reduction in my electricity bills. Here's what I learned...
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button className="hover:text-blue-600">❤️ 24 likes</button>
                        <button className="hover:text-blue-600">💬 8 comments</button>
                        <button className="hover:text-blue-600">🔄 Share</button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">About</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                  <p className="text-gray-700">{user.bio}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Renewable Energy', 'Sustainable Living', 'Zero Waste', 'Climate Action', 'Green Technology'].map((interest) => (
                      <Badge key={interest} variant="outline">{interest}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Achievements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span>🏆</span>
                      <span>Top Contributor 2023</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>🌱</span>
                      <span>Early Adopter</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>⭐</span>
                      <span>Community Helper</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'activity' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Posted a new article', time: '2 hours ago', icon: '📝' },
                  { action: 'Liked a post about solar energy', time: '5 hours ago', icon: '❤️' },
                  { action: 'Joined the "Zero Waste" group', time: '1 day ago', icon: '👥' },
                  { action: 'Shared a sustainability tip', time: '2 days ago', icon: '🔄' },
                  { action: 'Commented on a discussion', time: '3 days ago', icon: '💬' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-xl">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
