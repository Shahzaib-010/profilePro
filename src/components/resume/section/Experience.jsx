export const Experience = ({ data }) => {
  if (!data?.length) return null;
  return (
    <section className="mb-6">
      <h3 className="text-lg font-bold uppercase text-gray-800 mb-3 border-b">Work Experience</h3>
      <div className="space-y-4">
        {data.map((exp, i) => (
          <div key={i}>
            <div className="flex justify-between items-baseline">
              <h4 className="font-bold text-gray-900">{exp.role}</h4>
              <span className="text-xs font-semibold text-gray-500">{exp.startDate} — {exp.endDate}</span>
            </div>
            <p className="text-sm font-medium text-gray-700">{exp.company}</p>
            <p className="text-xs text-gray-600 mt-1 leading-normal">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};