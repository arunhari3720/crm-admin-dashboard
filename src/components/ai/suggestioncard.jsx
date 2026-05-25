import AICard from "./aicard";

export default function SuggestionsCard(props) {
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

      <div className="mt-6 space-y-3">
        <div className="rounded-2xl bg-white/70 p-4 text-sm text-gray-600">
          3 employees are nearing overtime.
        </div>

        <div className="rounded-2xl bg-white/70 p-4 text-sm text-gray-600">
          Sales increased by 12% today.
        </div>
      </div>
    </AICard>
  );
}