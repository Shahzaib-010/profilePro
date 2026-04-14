import { templateConfig } from "./templates/templateConfig";
import { OneColumnLayout } from "./layouts/OneColumnLayout";
import { TwoColumnLayout } from "./layouts/TwoColumnLayout";

const ResumeRenderer = ({ selectedTemplate = "modern", resumeData }) => {
  const config = templateConfig[selectedTemplate];

  // Helper to render component lists
  const renderList = (list) => 
    list.map(({ component: Component, key }, index) => (
      <Component key={index} data={resumeData[key]} />
    ));

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
