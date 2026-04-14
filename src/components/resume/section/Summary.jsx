export const Summary = ({ data }) => {
  if (!data) return null;
  return (
    <section className="mb-6">
      <h3 className="text-lg font-bold uppercase text-gray-800 mb-2 border-b">Professional Summary</h3>
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{data}</p>
    </section>
  );
};