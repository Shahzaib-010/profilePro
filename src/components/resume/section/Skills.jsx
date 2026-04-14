export const Skills = ({ data }) => {
  if (!data?.length) return null;
  return (
    <section className="mb-6">
      <h3 className="text-lg font-bold uppercase text-gray-800 mb-2 border-b">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {data.map((skill, i) => (
          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};