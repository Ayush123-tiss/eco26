import React, { useState } from 'react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Separator } from '@/shared/components/ui/separator';
import { Badge } from '@/shared/components/ui/badge';

interface SettingsData {
  profile: {
    name: string;
    email: string;
    bio: string;
    location: string;
    website: string;
  };
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    showEmail: boolean;
    showLocation: boolean;
    allowMessages: boolean;
    allowFollowers: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    postComments: boolean;
    newFollowers: boolean;
    mentions: boolean;
    newsletter: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
    contentFilter: 'none' | 'moderate' | 'strict';
  };
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData>({
    profile: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      bio: 'Passionate about sustainable living and eco-friendly solutions.',
      location: 'San Francisco, CA',
      website: 'https://johndoe.eco'
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showLocation: true,
      allowMessages: true,
      allowFollowers: true
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      postComments: true,
      newFollowers: true,
      mentions: true,
      newsletter: false
    },
    preferences: {
      theme: 'system',
      language: 'en',
      timezone: 'America/Los_Angeles',
      contentFilter: 'moderate'
    }
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSettings = (section: keyof SettingsData, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate API call
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Show success toast
  };

  const handleReset = () => {
    // Reset to original values
    setHasChanges(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={settings.profile.name}
                      onChange={(e) => updateSettings('profile', 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => updateSettings('profile', 'email', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    value={settings.profile.bio}
                    onChange={(e) => updateSettings('profile', 'bio', e.target.value)}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={settings.profile.location}
                      onChange={(e) => updateSettings('profile', 'location', e.target.value)}
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={settings.profile.website}
                      onChange={(e) => updateSettings('profile', 'website', e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Account Actions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Download Your Data</h4>
                    <p className="text-sm text-gray-600">Get a copy of all your data</p>
                  </div>
                  <Button variant="outline">Download</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Deactivate Account</h4>
                    <p className="text-sm text-gray-600">Temporarily disable your account</p>
                  </div>
                  <Button variant="outline">Deactivate</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-red-700">Delete Account</h4>
                    <p className="text-sm text-red-600">Permanently delete your account and data</p>
                  </div>
                  <Button variant="destructive">Delete</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Privacy Settings</h3>
              <div className="space-y-6">
                <div>
                  <Label>Profile Visibility</Label>
                  <Select
                    value={settings.privacy.profileVisibility}
                    onValueChange={(value: any) => updateSettings('privacy', 'profileVisibility', value)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                      <SelectItem value="friends">Friends - Only your followers can see</SelectItem>
                      <SelectItem value="private">Private - Only you can see</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Visible Information</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Email Address</Label>
                      <p className="text-sm text-gray-600">Allow others to see your email</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showEmail}
                      onCheckedChange={(checked) => updateSettings('privacy', 'showEmail', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Location</Label>
                      <p className="text-sm text-gray-600">Display your location on your profile</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showLocation}
                      onCheckedChange={(checked) => updateSettings('privacy', 'showLocation', checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Interaction Settings</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Direct Messages</Label>
                      <p className="text-sm text-gray-600">Let others send you private messages</p>
                    </div>
                    <Switch
                      checked={settings.privacy.allowMessages}
                      onCheckedChange={(checked) => updateSettings('privacy', 'allowMessages', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow New Followers</Label>
                      <p className="text-sm text-gray-600">Allow others to follow your account</p>
                    </div>
                    <Switch
                      checked={settings.privacy.allowFollowers}
                      onCheckedChange={(checked) => updateSettings('privacy', 'allowFollowers', checked)}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Delivery Methods</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.notifications.emailNotifications}
                      onCheckedChange={(checked) => updateSettings('notifications', 'emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-600">Receive push notifications in your browser</p>
                    </div>
                    <Switch
                      checked={settings.notifications.pushNotifications}
                      onCheckedChange={(checked) => updateSettings('notifications', 'pushNotifications', checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Activity Notifications</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Post Comments</Label>
                      <p className="text-sm text-gray-600">When someone comments on your posts</p>
                    </div>
                    <Switch
                      checked={settings.notifications.postComments}
                      onCheckedChange={(checked) => updateSettings('notifications', 'postComments', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New Followers</Label>
                      <p className="text-sm text-gray-600">When someone follows you</p>
                    </div>
                    <Switch
                      checked={settings.notifications.newFollowers}
                      onCheckedChange={(checked) => updateSettings('notifications', 'newFollowers', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mentions</Label>
                      <p className="text-sm text-gray-600">When someone mentions you in a post</p>
                    </div>
                    <Switch
                      checked={settings.notifications.mentions}
                      onCheckedChange={(checked) => updateSettings('notifications', 'mentions', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Newsletter</Label>
                      <p className="text-sm text-gray-600">Weekly newsletter with community highlights</p>
                    </div>
                    <Switch
                      checked={settings.notifications.newsletter}
                      onCheckedChange={(checked) => updateSettings('notifications', 'newsletter', checked)}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">App Preferences</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Theme</Label>
                    <Select
                      value={settings.preferences.theme}
                      onValueChange={(value: any) => updateSettings('preferences', 'theme', value)}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Language</Label>
                    <Select
                      value={settings.preferences.language}
                      onValueChange={(value: any) => updateSettings('preferences', 'language', value)}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Timezone</Label>
                    <Select
                      value={settings.preferences.timezone}
                      onValueChange={(value: any) => updateSettings('preferences', 'timezone', value)}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="Europe/London">GMT (UTC+0)</SelectItem>
                        <SelectItem value="Europe/Paris">CET (UTC+1)</SelectItem>
                        <SelectItem value="Asia/Tokyo">JST (UTC+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Content Filter</Label>
                    <Select
                      value={settings.preferences.contentFilter}
                      onValueChange={(value: any) => updateSettings('preferences', 'contentFilter', value)}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None - Show all content</SelectItem>
                        <SelectItem value="moderate">Moderate - Filter some content</SelectItem>
                        <SelectItem value="strict">Strict - Filter most content</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Data & Storage</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Clear Cache</h4>
                    <p className="text-sm text-gray-600">Clear stored data to free up space</p>
                  </div>
                  <Button variant="outline">Clear</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Export Settings</h4>
                    <p className="text-sm text-gray-600">Download your settings as a backup</p>
                  </div>
                  <Button variant="outline">Export</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save/Reset Actions */}
        {hasChanges && (
          <div className="fixed bottom-6 right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="flex items-center space-x-3">
              <Badge variant="secondary">Unsaved changes</Badge>
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="outline" onClick={handleReset}>Reset</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
