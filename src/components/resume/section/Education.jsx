export const Education = ({ data }) => {
  if (!data?.length) return null;
  return (
    <section className="mb-6">
      <h3 className="text-lg font-bold uppercase text-gray-800 mb-2 border-b">Education</h3>
      {data.map((edu, i) => (
        <div key={i} className="mb-2">
          <div className="flex justify-between items-baseline">
            <h4 className="font-bold text-sm">{edu.degree}</h4>
            <span className="text-[10px] text-gray-500">{edu.year}</span>
          </div>
          <p className="text-xs text-gray-600">{edu.school}</p>
        </div>
      ))}
    </section>
  );
};