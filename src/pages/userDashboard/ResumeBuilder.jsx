import React, { useRef, useState } from "react";
import Step1 from "@/components/multistepform/Step1";
import Step2 from "@/components/multistepform/Step2";
import Step3 from "@/components/multistepform/Step3";
import Step4 from "@/components/multistepform/Step4";
import FinalStep from "@/components/multistepform/FinalStep";
import ResumeRenderer from "@/components/resume/ResumeRenderer";
import { transformResumeData } from "@/utils/resumeDataTransformer";

const STORAGE_KEY = "resumeData";

function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      return data.templateChoice || "modern";
    } catch {
      return "modern";
    }
  });
  const [resumeData, setResumeData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  });

  const stepRef = useRef(null);

  const cardStyle = "rounded-xl border bg-white shadow-sm p-8";
  const stepperCard = "rounded-xl border bg-muted/50 p-4 mb-6";
  const isFinalStep = currentStep === 5;

  const persistResumeData = (updated) => {
    setResumeData(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleStepDraft = (stepKey, values) => {
    const updated = { ...resumeData, [stepKey]: values };
    persistResumeData(updated);
  };

  const handleStepSave = (stepKey, values) => {
    const updated = { ...resumeData, [stepKey]: values };
    persistResumeData(updated);
    setCurrentStep((prev) => prev + 1);
  };

  const handleNextClick = () => {
    if (stepRef.current?.submitForm) {
      stepRef.current.submitForm();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
    const updated = { ...resumeData, templateChoice: template };
    persistResumeData(updated);
  };

  const handleFinalDraftChange = (values) => {
    const updated = { ...resumeData, step5: { ...resumeData.step5, ...values } };
    persistResumeData(updated);
  };

  const handleFinalSave = (values) => {
    const updated = { ...resumeData, step5: values };
    persistResumeData(updated);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 ref={stepRef} defaultValues={resumeData.step1} onDraftChange={(v) => handleStepDraft("step1", v)} onSave={(v) => handleStepSave("step1", v)} />;
      case 2:
        return <Step2 ref={stepRef} defaultValues={resumeData.step2} onDraftChange={(v) => handleStepDraft("step2", v)} onSave={(v) => handleStepSave("step2", v)} />;
      case 3:
        return <Step3 ref={stepRef} defaultValues={resumeData.step3} onDraftChange={(v) => handleStepDraft("step3", v)} onSave={(v) => handleStepSave("step3", v)} />;
      case 4:
        return <Step4 ref={stepRef} defaultValues={resumeData.step4} onDraftChange={(v) => handleStepDraft("step4", v)} onSave={(v) => handleStepSave("step4", v)} />;
      case 5:
        return (
          <FinalStep
            ref={stepRef}
            defaultValues={resumeData.step5}
            resumeData={resumeData}
            onDraftChange={handleFinalDraftChange}
            onSaveSuccess={handleFinalSave}
            onBack={() => setCurrentStep(4)}
          />
        );
      default:
        return null;
    }
  };

  // Transform raw data for the renderer in real-time
  const transformedData = transformResumeData(resumeData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full overflow-hidden bg-slate-50/30">
      <main className="overflow-y-auto p-4 md:p-4 flex flex-col">
        <div className={stepperCard}>
          <div className="flex justify-between items-center px-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  currentStep >= step ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        <div className={cardStyle}>{renderStep()}</div>

        {!isFinalStep && (
          <div className="flex justify-between pt-6">
            <button
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="px-6 py-2 text-sm font-medium disabled:opacity-50"
            >
              Back
            </button>

            <button
              onClick={handleNextClick}
              className="bg-black text-white px-5 py-2 rounded-lg font-medium text-[13px] hover:bg-zinc-800 transition-all"
            >
              Next Section
            </button>
          </div>
        )}
      </main>

      <aside className="hidden lg:flex flex-col items-center justify-start p-8 bg-gray-200 overflow-y-auto">
        <div className="w-full mb-4 space-y-3">
          <p className="text-sm font-semibold text-gray-700">Live Preview</p>
          
          <div className="bg-white rounded-lg p-3 border border-gray-300">
            <p className="text-xs font-medium text-gray-600 mb-2">Template</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleTemplateChange("modern")}
                className={`flex-1 px-3 py-2 rounded text-xs font-medium transition-all ${
                  selectedTemplate === "modern"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Modern
              </button>
              <button
                onClick={() => handleTemplateChange("professional")}
                className={`flex-1 px-3 py-2 rounded text-xs font-medium transition-all ${
                  selectedTemplate === "professional"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Professional
              </button>
            </div>
          </div>
        </div>
        <div className="w-full max-w-2xl bg-white shadow-lg rounded">
          <ResumeRenderer selectedTemplate={selectedTemplate} resumeData={transformedData} />
        </div>
      </aside>
    </div>
  );
}

export default ResumeBuilder;




