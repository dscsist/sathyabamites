import profileData from "../../data/profileData";

import ProfileHeader from "../../components/profile/ProfileHeader";
import StatsSection from "../../components/profile/StatsSection";
import ProjectsSection from "../../components/profile/ProjectsSection";
import SkillsSection from "../../components/profile/SkillsSection";

export default function ProfilePage() {

  return (

    <main className="bg-gray-100 min-h-screen p-8">

      <div className="max-w-7xl mx-auto">

        <ProfileHeader personal={profileData.personal} />

        <StatsSection stats={profileData.stats} />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">

          <div className="lg:col-span-2">

            <ProjectsSection
              projects={profileData.projects}
            />

          </div>

          <div>

            <SkillsSection
              skills={profileData.skills}
            />

          </div>

        </div>

      </div>

    </main>

  );

}