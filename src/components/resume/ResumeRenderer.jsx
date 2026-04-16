import { templateConfig } from "./templates/templateConfig";
import { OneColumnLayout } from "./layouts/OneColumnLayout";
import { TwoColumnLayout } from "./layouts/TwoColumnLayout";

const ResumeRenderer = ({ selectedTemplate = "modern", resumeData }) => {
  const config = templateConfig[selectedTemplate];

  if (!config) {
    return <div className="p-8">Template not found</div>;
  }

  // Helper to render component lists with proper data passing
  const renderList = (list) => 
    list.map((item, index) => {
      const Component = item.component;
      const dataKey = item.key;
      return <Component key={index} data={resumeData[dataKey]} />;
    });

  if (config.layoutType === "one-column") {
    return (
      <OneColumnLayout>
        {renderList(config.sections)}
      </OneColumnLayout>
    );
  }

  if (config.layoutType === "two-column") {
    return (
      <TwoColumnLayout 
        left={renderList(config.left)}
        right={renderList(config.right)}
      />
    );
  }

  return null;
};

export default ResumeRenderer;
