import React from 'react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Simple overview of your EcoBingle activity</p>
        </div>

        {/* Simple Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900">42</p>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Likes</p>
                <p className="text-3xl font-bold text-gray-900">1,250</p>
              </div>
              <div className="text-4xl">❤️</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Followers</p>
                <p className="text-3xl font-bold text-gray-900">180</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">📝</span>
              <span>Create New Post</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">🌱</span>
              <span>Eco Tips</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">👤</span>
              <span>Edit Profile</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
        totalLikes: 1250,
        totalFollowers: 180,
        totalViews: 15000,
        weeklyGrowth: {
          posts: 8,
          likes: 156,
          followers: 12,
          views: 1200
        }
      });

      setActivities([
        {
          id: '1',
          type: 'post',
          description: 'Published "10 Tips for Sustainable Living"',
          timestamp: '2 hours ago'
        },
        {
          id: '2',
          type: 'like',
          description: 'Sarah liked your post about solar panels',
          timestamp: '4 hours ago',
          user: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
        },
        {
          id: '3',
          type: 'follow',
          description: 'Mike started following you',
          timestamp: '6 hours ago',
          user: 'Mike Johnson',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
        },
        {
          id: '4',
          type: 'comment',
          description: 'Emma commented on your eco-friendly recipe',
          timestamp: '8 hours ago',
          user: 'Emma Davis',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
        },
        {
          id: '5',
          type: 'post',
          description: 'Shared a sustainable product review',
          timestamp: '1 day ago'
        }
      ]);

      setAchievements([
        {
          id: '1',
          title: 'First Post',
          description: 'Create your first post',
          icon: '📝',
          progress: 1,
          maxProgress: 1,
          unlocked: true
        },
        {
          id: '2',
          title: 'Community Builder',
          description: 'Get 100 followers',
          icon: '👥',
          progress: 180,
          maxProgress: 100,
          unlocked: true
        },
        {
          id: '3',
          title: 'Content Creator',
          description: 'Publish 50 posts',
          icon: '✍️',
          progress: 42,
          maxProgress: 50,
          unlocked: false
        },
        {
          id: '4',
          title: 'Engagement Master',
          description: 'Receive 1000 likes',
          icon: '❤️',
          progress: 1250,
          maxProgress: 1000,
          unlocked: true
        },
        {
          id: '5',
          title: 'Eco Warrior',
          description: 'Post 10 sustainability tips',
          icon: '🌱',
          progress: 7,
          maxProgress: 10,
          unlocked: false
        },
        {
          id: '6',
          title: 'Trending Topic',
          description: 'Get 10,000 post views',
          icon: '🔥',
          progress: 15000,
          maxProgress: 10000,
          unlocked: true
        }
      ]);

      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="bg-gray-200 h-8 w-48 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-200 h-96 rounded-lg"></div>
              <div className="bg-gray-200 h-96 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return '📝';
      case 'like': return '❤️';
      case 'follow': return '👥';
      case 'comment': return '💬';
      default: return '📱';
    }
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of your EcoBingle activity and achievements</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPosts}</p>
                <p className={`text-sm ${getGrowthColor(stats.weeklyGrowth.posts)}`}>
                  +{stats.weeklyGrowth.posts} this week
                </p>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Likes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalLikes.toLocaleString()}</p>
                <p className={`text-sm ${getGrowthColor(stats.weeklyGrowth.likes)}`}>
                  +{stats.weeklyGrowth.likes} this week
                </p>
              </div>
              <div className="text-4xl">❤️</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Followers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalFollowers}</p>
                <p className={`text-sm ${getGrowthColor(stats.weeklyGrowth.followers)}`}>
                  +{stats.weeklyGrowth.followers} this week
                </p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                <p className={`text-sm ${getGrowthColor(stats.weeklyGrowth.views)}`}>
                  +{stats.weeklyGrowth.views} this week
                </p>
              </div>
              <div className="text-4xl">👁️</div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Recent Activity</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-shrink-0">
                    {activity.avatar ? (
                      <img 
                        src={activity.avatar} 
                        alt={activity.user} 
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                        {getActivityIcon(activity.type)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Achievements</h3>
              <Badge variant="secondary">
                {achievements.filter(a => a.unlocked).length}/{achievements.length} Unlocked
              </Badge>
            </div>
            
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.unlocked 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-medium ${achievement.unlocked ? 'text-green-800' : 'text-gray-700'}`}>
                          {achievement.title}
                        </h4>
                        {achievement.unlocked && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            ✓ Unlocked
                          </Badge>
                        )}
                      </div>
                      <p className={`text-sm mt-1 ${achievement.unlocked ? 'text-green-600' : 'text-gray-600'}`}>
                        {achievement.description}
                      </p>
                      
                      {!achievement.unlocked && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <Progress 
                            value={(achievement.progress / achievement.maxProgress) * 100} 
                            className="h-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mt-8">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">📝</span>
              <span>Create New Post</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">📊</span>
              <span>View Analytics</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">🎯</span>
              <span>Set Goals</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
