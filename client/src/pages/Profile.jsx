import { useEffect, useState } from 'react';
import { MyProfile } from '../component/MyProfile';
import { Post } from '../component/Post';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await currentUser.getIdToken();
      const res = await axios.get('http://localhost:5000/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
    };
    fetchProfile();
  }, [currentUser]);

  if (!profile) return <div>Loading...</div>;

  const userPosts = profile.posts || [];
  const isOwnProfile = true; // Assuming this is the user's own profile
  const skills = ["React", "Node.js", "Tailwind CSS", "Firebase", "MongoDB"]; // Placeholder skills
  const experience = [
    { title: "Senior Developer", company: "Tech Co", duration: "2020-Present", location: "Remote" },
    { title: "Junior Developer", company: "Startup Inc", duration: "2018-2020", location: "New York" }
  ]; // Placeholder experience

  return (
    <div className="w-180 mx-40">
      <MyProfile
        username={profile.username}
        email={profile.email}
        bio={profile.bio}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Main Content */}
        <div className="lg:col-span-2 w-180">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 h-9 rounded-md ${activeTab === 'posts' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Posts ({userPosts.length})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 h-9 rounded-md ${activeTab === 'about' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`flex-1 h-9 rounded-md ${activeTab === 'activity' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Activity
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {userPosts.length === 0 ? (
                <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {/* Placeholder icon for Briefcase */}
                    <svg className="h-8 w-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.87 0-7.367-1.01-10-2.745M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2zm7-10V7m0 4v4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {isOwnProfile ? "You haven't posted anything yet" : "No posts to show"}
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {isOwnProfile 
                      ? "Share your thoughts, experiences, or industry insights with your network."
                      : "This user hasn't shared any posts yet."
                    }
                  </p>
                </div>
              ) : (
                userPosts.map((post) => (
                  <Post
                    key={post._id}
                    username={profile.username}
                    time={new Date(post.time).toLocaleString()}
                    message={post.message}
                  />
                ))
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className=" shadow-sm border border-gray-200 rounded-lg">
                <div className="p-6">
                  <h3 className="font-semibold mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full border border-blue-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
                <div className="p-6">
                  <h3 className="font-semibold mb-4">Experience</h3>
                  <div className="space-y-4">
                    {experience.map((exp, index) => (
                      <div key={index}>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                            {/* Placeholder icon for Briefcase */}
                            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.87 0-7.367-1.01-10-2.745M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2zm7-10V7m0 4v4" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                            <p className="text-blue-600 font-medium">{exp.company}</p>
                            <p className="text-sm text-gray-500">{exp.duration} • {exp.location}</p>
                          </div>
                        </div>
                        {index < experience.length - 1 && <hr className="mt-4 border-gray-200" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {/* Placeholder icon for Calendar */}
                <svg className="h-8 w-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity Timeline</h3>
              <p className="text-gray-500">Coming soon - Track all profile activities and engagement.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
