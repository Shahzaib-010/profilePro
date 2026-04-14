import React, { useRef, useState } from "react";
import Step1 from "@/components/multistepform/Step1";
import Step2 from "@/components/multistepform/Step2";
import Step3 from "@/components/multistepform/Step3";
import Step4 from "@/components/multistepform/Step4";
import FinalStep from "@/components/multistepform/FinalStep";

const STORAGE_KEY = "resumeData";

function formatWorkDate(position) {
  if (!position) return "";

  const start = position.startDate || "";
  const end = position.currentJob ? "Present" : position.endDate || "";

  return [start, end].filter(Boolean).join(" - ");
}

function formatEducationDate(education) {
  if (!education) return "";

  const start = [education.startMonth, education.startYear].filter(Boolean).join(" ");
  const end = education.currentStudy
    ? "Present"
    : [education.endMonth, education.endYear].filter(Boolean).join(" ");

  return [start, end].filter(Boolean).join(" - ");
}

function ResumePreview({ resumeData }) {
  const contact = resumeData.step1 || {};
  const summary = resumeData.step2?.summary || "";
  const positions = resumeData.step3?.positions || [];
  const educations = resumeData.step4?.educations || [];
  const resumeTitle = resumeData.step5?.title || "Untitled Resume";

  const fullName = [contact.firstName, contact.lastName].filter(Boolean).join(" ") || "Your Name";
  const contactLine = [contact.email, contact.phone, contact.city, contact.country]
    .filter(Boolean)
    .join(" | ");

  return (
    <div className="w-full max-w-[550px] bg-white shadow-2xl border border-slate-200 sticky top-10">
      <div className="border-b border-slate-200 px-8 py-4 bg-slate-50">
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Live Preview</p>
        <h2 className="text-base font-semibold text-slate-800 mt-1">{resumeTitle}</h2>
      </div>

      <div className="aspect-[1/1.41] overflow-y-auto p-8 text-slate-800">
        <div className="border-b border-slate-300 pb-5 mb-5">
          <h1 className="text-3xl font-bold uppercase tracking-[0.15em]">{fullName}</h1>
          <p className="mt-2 text-sm font-medium text-slate-600">
            {contact.title || "Professional Title"}
          </p>
          <p className="mt-3 text-xs text-slate-500 leading-relaxed">
            {contactLine || "Email | Phone | City | Country"}
          </p>
        </div>

        <div className="grid grid-cols-[1.25fr_0.9fr] gap-6 text-sm">
          <div className="space-y-5">
            <section>
              <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-slate-500 mb-2">
                Summary
              </h3>
              <p className="text-sm leading-6 text-slate-700">
                {summary || "Your professional summary will appear here after you save Step 2."}
              </p>
            </section>

            <section>
              <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-slate-500 mb-3">
                Experience
              </h3>
              <div className="space-y-4">
                {positions.length ? (
                  positions.map((position, index) => (
                    <div key={`${position.company}-${index}`} className="space-y-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{position.jobTitle || "Job Title"}</p>
                          <p className="text-slate-600">{position.company || "Company"}</p>
                        </div>
                        <p className="text-[11px] text-slate-500 text-right">
                          {formatWorkDate(position)}
                        </p>
                      </div>
                      <p className="text-[12px] text-slate-500">{position.location}</p>
                      <p className="text-[12px] leading-5 text-slate-700 whitespace-pre-line">
                        {position.description || "Experience details will appear here."}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-[12px] text-slate-500">
                    Your experience section will appear here after Step 3.
                  </p>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-5">
            <section>
              <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-slate-500 mb-3">
                Education
              </h3>
              <div className="space-y-4">
                {educations.length ? (
                  educations.map((education, index) => (
                    <div key={`${education.institution}-${index}`} className="space-y-1">
                      <p className="font-semibold leading-5">{education.degree || "Degree"}</p>
                      <p className="text-slate-600 text-[12px]">{education.institution}</p>
                      <p className="text-[11px] text-slate-500">
                        {[education.location, formatEducationDate(education)].filter(Boolean).join(" | ")}
                      </p>
                      {education.gpa && (
                        <p className="text-[12px] text-slate-700">GPA: {education.gpa}</p>
                      )}
                      {education.additionalInfo && (
                        <p className="text-[12px] text-slate-700 leading-5">{education.additionalInfo}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-[12px] text-slate-500">
                    Your education section will appear here after Step 4.
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
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
        return <Step1 ref={stepRef} defaultValues={resumeData.step1} onSave={(v) => handleStepSave("step1", v)} />;
      case 2:
        return <Step2 ref={stepRef} defaultValues={resumeData.step2} onSave={(v) => handleStepSave("step2", v)} />;
      case 3:
        return <Step3 ref={stepRef} defaultValues={resumeData.step3} onSave={(v) => handleStepSave("step3", v)} />;
      case 4:
        return <Step4 ref={stepRef} defaultValues={resumeData.step4} onSave={(v) => handleStepSave("step4", v)} />;
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

      <aside className="hidden lg:flex items-center justify-center p-8">
        <ResumePreview resumeData={resumeData} />
      </aside>
    </div>
  );
}

export default ResumeBuilder;




