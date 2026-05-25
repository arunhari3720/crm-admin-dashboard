import AIGrid from "./aigrid";

export default function AIWorkspace() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-purple-100 px-6 py-24">
      {/* Background Blobs */}
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-purple-300/30 blur-[120px]" />

      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-300/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-6xl font-black tracking-tight text-gray-800">
            AI Workspace
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-500">
            Unlock powerful AI-driven CRM automation tools
            designed to improve productivity and business
            intelligence.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-24">
          <AIGrid />
        </div>
      </div>
    </div>
  );
}