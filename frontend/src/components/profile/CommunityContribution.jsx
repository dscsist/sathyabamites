export default function CommunityContribution() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-5">
        🌟 Community
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Questions Answered</span>
          <span className="font-bold">95</span>
        </div>

        <div className="flex justify-between">
          <span>Projects Shared</span>
          <span className="font-bold">12</span>
        </div>

        <div className="flex justify-between">
          <span>Events Participated</span>
          <span className="font-bold">18</span>
        </div>

        <div className="flex justify-between">
          <span>Peer Collaborations</span>
          <span className="font-bold">27</span>
        </div>

      </div>
    </div>
  );
}