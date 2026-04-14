export const Projects = ({ data }) => {
  if (!data?.length) return null;
  return (
    <section className="mb-6">
      <h3 className="text-lg font-bold uppercase text-gray-800 mb-3 border-b">Projects</h3>
      <div className="space-y-3">
        {data.map((project, i) => (
          <div key={i}>
            <h4 className="font-bold text-sm text-gray-900">{project.name}</h4>
            <p className="text-xs text-gray-600 italic mb-1">{project.techStack}</p>
            <p className="text-xs text-gray-700">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};