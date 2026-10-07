export default function Card({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center border border-gray-100">
      <div className="text-4xl mb-4 text-blue-600">{icon}
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
    </div>
  );
}