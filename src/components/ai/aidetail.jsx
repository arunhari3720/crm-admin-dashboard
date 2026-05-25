export default function Aidetails({ item }) {
  return (
    <div className="mt-20 text-center">
      <h2 className="text-5xl font-black text-gray-800">
        {item.title}
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">
        {item.description}
      </p>

      <button
        className={`mt-8 rounded-2xl bg-gradient-to-r ${item.color} px-8 py-4 font-semibold text-white shadow-xl`}
      >
        Open Workspace
      </button>
    </div>
  );
}