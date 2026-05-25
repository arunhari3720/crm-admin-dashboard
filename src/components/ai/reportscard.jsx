import AICard from "./aicard";

export default function ReportsCard(props) {
  const { item } = props;

  return (
    <AICard {...props}>
      <img
        src={item.image}
        alt={item.title}
        className="h-20 w-20 rounded-2xl object-cover"
      />

      <h2 className="mt-6 text-2xl font-bold text-gray-800">
        {item.title}
      </h2>

      <p className="mt-2 text-sm leading-7 text-gray-500">
        {item.description}
      </p>

      <button
        className={`mt-6 rounded-2xl bg-gradient-to-r ${item.color} px-6 py-3 text-sm font-semibold text-white shadow-lg`}
      >
        Generate Report
      </button>
    </AICard>
  );
}