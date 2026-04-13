import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Circle, Download, FileCheck2, Save, Sparkles } from "lucide-react";
import api from "@/api/axios";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().min(2, "Resume title must be at least 2 characters"),
});

function hasContactInfo(step1) {
  return Boolean(step1?.firstName && step1?.lastName && step1?.email && step1?.phone);
}

function hasSummary(step2) {
  return Boolean(step2?.summary?.trim());
}

function hasExperience(step3) {
  return Boolean(
    step3?.positions?.length &&
      step3.positions.some(
        (position) =>
          position?.jobTitle?.trim() &&
          position?.company?.trim() &&
          position?.location?.trim() &&
          position?.startDate?.trim()
      )
  );
}

function hasEducation(step4) {
  return Boolean(
    step4?.educations?.length &&
      step4.educations.some(
        (education) =>
          education?.degree?.trim() &&
          education?.institution?.trim() &&
          education?.location?.trim() &&
          education?.startYear?.trim()
      )
  );
}

function buildPayload(resumeData, values, completion) {
  return {
    title: values.title,
    template: "Modern Two-Column",
    completion_percentage: completion,
    contact_info: resumeData.step1 ?? {},
    summary: resumeData.step2?.summary ?? "",
    experiences: resumeData.step3?.positions ?? [],
    educations: resumeData.step4?.educations ?? [],
  };
}

const FinalStep = forwardRef(function FinalStep(
  { defaultValues, resumeData, onDraftChange, onSaveSuccess, onBack },
  ref
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title || "",
    },
  });

  const titleValue = useWatch({
    control: form.control,
    name: "title",
  });

  useEffect(() => {
    onDraftChange?.({ title: titleValue || "" });
  }, [onDraftChange, titleValue]);

  const completionItems = useMemo(
    () => [
      { label: "Contact Info", complete: hasContactInfo(resumeData.step1) },
      { label: "Summary", complete: hasSummary(resumeData.step2) },
      { label: "Experience", complete: hasExperience(resumeData.step3) },
      { label: "Education", complete: hasEducation(resumeData.step4) },
      { label: "Resume Title", complete: Boolean(titleValue?.trim()) },
    ],
    [resumeData, titleValue]
  );

  const completionPercentage = Math.round(
    (completionItems.filter((item) => item.complete).length / completionItems.length) * 100
  );

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const payload = buildPayload(resumeData, values, completionPercentage);
      const response = await api.post("/resume-store", payload);

      onSaveSuccess?.(values, response.data);
      setSubmitSuccess("Resume saved successfully.");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while saving the resume.";

      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => form.handleSubmit(handleSubmit)(),
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 md:px-1 md:py-2 space-y-6">
      <div className="rounded-xl border bg-white shadow-sm p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-black">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-1">Finalize Your Resume</h2>
            <p className="text-muted-foreground text-[12px]">
              Choose a template name, review your sections, and save your resume to your account
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm p-5 space-y-5">
        <div>
          <h3 className="text-xl font-semibold mb-1">Resume Completeness</h3>
          <p className="text-[15px]">Your resume is {completionPercentage}% complete</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Progress</span>
            <span>{completionPercentage}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-black transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {completionItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm">
              {item.complete ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-100" />
              ) : (
                <Circle className="w-4 h-4 text-slate-300 fill-slate-200" />
              )}
              <span className={item.complete ? "text-foreground" : "text-muted-foreground"}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="rounded-xl border bg-white shadow-sm p-5 space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">Resume Title</h3>
              <p className="text-muted-foreground text-[12px]">
                Give your resume a name for easy identification
              </p>
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Shahzaib - Software Engineer Resume" {...field} />
                  </FormControl>
                  {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                </FormItem>
              )}
            />
          </div>

          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-6 space-y-3">
            <h3 className="text-blue-800 font-semibold text-lg">Before downloading:</h3>
            <ul className="space-y-2 text-blue-800/90 text-[15px] list-disc pl-5">
              <li>Review all sections for accuracy and typos</li>
              <li>Ensure your contact information is up to date</li>
              <li>Check that dates are in the correct format</li>
              <li>Verify all links and details are working correctly</li>
              <li>Keep your resume concise and ideally within 1 to 2 pages</li>
            </ul>
          </div>

          <div className="rounded-3xl border-4 border-black/90 bg-white p-8 text-center space-y-4">
            <div className="mx-auto w-fit rounded-full bg-slate-100 p-3">
              <FileCheck2 className="w-6 h-6 text-slate-700" />
            </div>

            <div>
              <h3 className="text-3xl font-semibold mb-2">Ready to Save?</h3>
              <p className="text-slate-600 text-lg">
                Your resume will be saved with the <span className="font-semibold">Modern Two-Column</span> template
              </p>
              <p className="text-orange-500 mt-2">
                Save it to your account first, then we can connect PDF download next
              </p>
            </div>

            {submitError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {submitError}
              </div>
            )}

            {submitSuccess && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {submitSuccess}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                type="submit"
                variant="outline"
                size="lg"
                disabled={isSubmitting}
                className="min-w-[200px] shadow-sm"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? "Saving..." : "Save to Account"}
              </Button>

              <Button
                type="button"
                size="lg"
                disabled
                className="min-w-[250px] bg-black text-white hover:bg-black"
              >
                <Download className="w-4 h-4" />
                Download Resume PDF
              </Button>
            </div>
          </div>

          <div>
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
});

export default FinalStep;
