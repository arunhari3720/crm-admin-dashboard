import StackCards from "./stackcards";

export default function TeamSection() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-purple-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-6xl font-black tracking-tight text-gray-800">
            Meet Our Team
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
            Interactive team showcase with modern stacked card
            animations for your CRM dashboard.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-24">
          <StackCards />
        </div>
      </div>
    </div>
  );
}