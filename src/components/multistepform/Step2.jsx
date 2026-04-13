// import React, { forwardRef, useImperativeHandle } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
// import { Lightbulb } from "lucide-react"; // For the tip icon

// // Validation Schema
// const formSchema = z.object({
//   summary: z
//     .string()
//     .max(500, "Summary cannot exceed 500 characters")
//     .optional(),
// });

// const Step2 = forwardRef(function Step2({ onNext }, ref) {
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: JSON.parse(localStorage.getItem("step2Data")) || {
//       summary: "",
//     },
//   });

//   // Watch the summary field for the character counter
//   const summaryValue = form.watch("summary") || "";

//   useImperativeHandle(ref, () => ({
//     submitForm: () => form.handleSubmit(onSubmit)(),
//   }));

//   function onSubmit(values) {
//     localStorage.setItem("step2Data", JSON.stringify(values));
//     console.log("Saved Step2:", values);
//     onNext?.();
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
//       {/* Header Section */}
//       <div>
//         <h2 className="text-2xl font-semibold mb-1">Professional Summary</h2>
//         <p className="text-muted-foreground">
//           Write a brief summary that highlights your key qualifications and career goals (2-4 sentences)
//         </p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <FormField
//             control={form.control}
//             name="summary"
//             render={({ field, fieldState }) => (
//               <FormItem>
//                 <FormLabel className="text-base font-medium">Summary (Optional)</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Write summary here! Don't use Enter key to break lines in this section"
//                     className="min-h-[120px] resize-none "
//                     {...field}
//                   />
//                 </FormControl>
                
//                 {/* Character Counter & Error Message Row */}
//                 <div className="flex justify-between items-center pt-1">
//                   <div className="flex-1">
//                     {fieldState.error && (
//                       <p className="text-red-500 text-sm">{fieldState.error.message}</p>
//                     )}
//                   </div>
//                   <p className={`text-sm ${summaryValue.length > 500 ? "text-red-500 font-bold" : "text-muted-foreground"}`}>
//                     {summaryValue.length} / 500 characters
//                   </p>
//                 </div>
//               </FormItem>
//             )}
//           />
//         </form>
//       </Form>

//       {/* Tips Section - Shadcn style blue box */}
//       <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 space-y-3">
//         <div className="flex items-center gap-2 text-blue-700">
//           <Lightbulb className="w-5 h-5" />
//           <h3 className="font-semibold text-[1.2rem]">Tips for a great summary:</h3>
//         </div>
//         <ul className="space-y-2 text-blue-900/80 ml-7 text-[0.9rem] list-disc ">
//           <li>Start with your professional title and years of experience</li>
//           <li>Highlight 2-3 key skills or achievements</li>
//           <li>Mention what you're looking for or your career goals</li>
//           <li>Keep it concise and impactful (2-4 sentences)</li>
//         </ul>
//       </div>
//     </div>
//   );
// });

// export default Step2;


import React, { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb } from "lucide-react";

const formSchema = z.object({
  summary: z.string().max(500, "Summary cannot exceed 500 characters").optional(),
});

const Step2 = forwardRef(function Step2({ defaultValues, onSave }, ref) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      summary: "",
      ...defaultValues, // ← restores saved value when navigating back
    },
  });

  const summaryValue = form.watch("summary") || "";

  useImperativeHandle(ref, () => ({
    submitForm: () => form.handleSubmit(onSave)(),
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 md:px-1 md:py-2 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Professional Summary</h2>
        <p className="text-muted-foreground text-[12px]">
          Write a brief summary that highlights your key qualifications and career goals (2-4 sentences)
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
          <FormField
            control={form.control}
            name="summary"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Summary (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write summary here ..."
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center pt-1">
                  <div className="flex-1">
                    {fieldState.error && (
                      <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                    )}
                  </div>
                  <p className={`text-sm ${summaryValue.length > 500 ? "text-red-500 font-bold" : "text-muted-foreground"}`}>
                    {summaryValue.length} / 500 characters
                  </p>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-blue-700">
          <Lightbulb className="w-5 h-5" />
          <h3 className="font-semibold text-[1rem]">Tips for a great summary:</h3>
        </div>
        <ul className="space-y-2 text-blue-900/80 ml-7 text-[0.8rem] list-disc">
          <li>Start with your professional title and years of experience</li>
          <li>Highlight 2-3 key skills or achievements</li>
          <li>Mention what you're looking for or your career goals</li>
          <li>Keep it concise and impactful (2-4 sentences)</li>
        </ul>
      </div>
    </div>
  );
});

export default Step2;