export const TwoColumnLayout = ({ left, right }) => (
  <div className="grid grid-cols-12 min-h-[297mm]">
    <div className="col-span-4 bg-gray-50 p-8 border-r border-gray-100 flex flex-col gap-4">
      {left}
    </div>
    <div className="col-span-8 p-10 flex flex-col gap-4 bg-white">
      {right}
    </div>
  </div>
);