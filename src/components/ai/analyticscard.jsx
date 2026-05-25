import AICard from "./aicard";

export default function AnalyticsCard(props) {
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

      <div className="mt-6 h-24 rounded-2xl bg-gradient-to-r from-cyan-100 to-blue-100" />
    </AICard>
  );
}