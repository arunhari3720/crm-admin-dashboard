export default function TeamDetails({ member }) {
  return (
    <div className="mt-10 text-center">
      <h2 className="text-4xl font-bold text-gray-800">
        {member.name}
      </h2>

      <p className="mt-2 text-lg text-gray-500">
        {member.role}
      </p>

      <div className="mt-6 flex justify-center gap-4">
        <button className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105">
          View Profile
        </button>

        <button className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:scale-105">
          Message
        </button>
      </div>
    </div>
  );
}