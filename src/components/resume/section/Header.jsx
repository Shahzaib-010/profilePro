export const Header = ({ data }) => {
  if (!data?.name) return null;
  return (
    <div className="border-b-2 border-gray-900 pb-4 mb-6">
      <h1 className="text-4xl font-bold uppercase tracking-tighter text-gray-900">{data.name}</h1>
      <p className="text-xl text-gray-600 font-medium">{data.title}</p>
      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>{data.phone}</span>}
        {data.location && <span>{data.location}</span>}
        {data.link && <a href={data.link} className="underline">{data.link}</a>}
      </div>
    </div>
  );
};