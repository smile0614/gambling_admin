import React from "react";

interface StatsSectionProps {
  title: string;
  value: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({ title, value }) => {
  return (
    <div className="relative rounded-sm border border-stroke bg-white p-2 text-center  dark:border-strokedark dark:bg-boxdark">
      <h3 className="mb-2 text-sm font-medium">{title}</h3>
      <h4 className="text-sm font-semibold text-black dark:text-white">{value}</h4>
    </div>
  );
};

interface TopStatsSectionProps {
  sections: { title: string; value: string }[];
}

const TopStatsSection: React.FC<TopStatsSectionProps> = ({ sections }) => {
  return (
    <div className="column mb-3 grid grid-cols-12 gap-x-2 gap-y-2">
      {sections.map((section, index) => (
        <div key={index} className="col-span-12 md:col-span-3 2xl:col-span-3 xl:col-span-4">
          <StatsSection title={section.title} value={section.value} />
        </div>
      ))}
    </div>
  );
};

export default TopStatsSection;
