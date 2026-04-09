// import Step1 from "@/components/multistepform/Step1";
// import React from "react";

// function ResumeBuilder() {

//   const shadcnCard = "rounded-xl border bg-card text-card-foreground shadow-sm";

//   return (
//    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full overflow-hidden bg-background text-foreground">
      
//       {/* Left: Form/Editor Section */}
//       <main className="overflow-y-auto p-10 space-y-8 border-r"> 
//         {/* Stepper Placeholder */}
//         <div className="w-full h-24 bg-muted rounded-xl flex items-center justify-center">
//            <p className="text-muted-foreground text-sm font-medium">Stepper Component</p>
//         </div>

//         {/* Input Card with Custom Class */}
//         <div className={`${shadcnCard} p-5`}>
//           <Step1 />
//         </div>
//       </main>

//       {/* Right: Preview Section */}
//       <aside className=" hidden lg:flex flex-col items-center justify-center p-8 overflow-y-auto ">
//         {/* Resume Sheet Wrapper */}
//         <div className="w-full max-w-[550px] aspect-[1/1.41] bg-white shadow-2xl border border-slate-200">
//              {/* Resume Content Here */}
//         </div>
//       </aside>

//     </div>
//   );
// }

// export default ResumeBuilder;



import React, { useState } from "react";
import Step1 from "@/components/multistepform/Step1";
import Step2 from "@/components/multistepform/Step2"; // Assuming you have these
import Step3 from "@/components/multistepform/Step3";

function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(1);

  // Custom Shadcn-style constants
  const cardStyle = "rounded-xl border bg-white shadow-sm p-8";
  const stepperCard = "rounded-xl border bg-muted/50 p-4 mb-6";

  // Function to render the active step
  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 />;
      case 2: return <Step2 />;
      case 3: return <Step3 />;
      default: return <Step1 />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full overflow-hidden bg-slate-50/30">
      
      {/* Left Side: Dynamic Content */}
      <main className="overflow-y-auto p-6 md:p-12 flex flex-col"> 
        
        {/* 1. Dynamic Stepper Indicator */}
        <div className={stepperCard}>
          <div className="flex justify-between items-center px-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div 
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                  ${currentStep >= step ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Dynamic Form Section */}
        <div className={cardStyle}>
          {renderStep()}
        </div>

        {/* 3. Navigation Buttons */}
        <div className="flex justify-between mt-auto pt-8">
          <button 
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="px-6 py-2 text-sm font-medium disabled:opacity-50"
          >
            Back
          </button>
          
          <button 
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="bg-black text-white px-8 py-2 rounded-lg font-medium hover:bg-zinc-800 transition-all"
          >
            {currentStep === 5 ? "Finish" : "Next Section →"}
          </button>
        </div>
      </main>

      {/* Right Side: Static Preview (Does not re-render layout) */}
      <aside className="bg-slate-100 hidden lg:flex items-center justify-center p-8">
        <div className="w-full max-w-[550px] aspect-[1/1.41] bg-white shadow-2xl border border-slate-200 sticky top-10">
            {/* The Resume Preview stays here regardless of the step */}
            <div className="p-10">
               <h1 className="text-2xl font-bold uppercase tracking-widest text-slate-800">
                  Preview Mode
               </h1>
               <div className="h-1 w-full bg-slate-800 my-2"></div>
               <p className="text-slate-500 text-sm">Real-time updates happen here...</p>
            </div>
        </div>
      </aside>

    </div>
  );
}

export default ResumeBuilder;


