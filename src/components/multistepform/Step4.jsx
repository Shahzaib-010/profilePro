import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Lightbulb, Plus, Trash2 } from "lucide-react";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1959 }, (_, index) => String(currentYear - index));
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const educationSchema = z.object({
  degree: z.string().min(1, "Degree/Certificate is required"),
  institution: z.string().min(1, "Institution is required"),
  location: z.string().min(1, "Location is required"),
  startYear: z.string().min(1, "Start year is required"),
  startMonth: z.string().optional(),
  endYear: z.string().optional(),
  endMonth: z.string().optional(),
  currentStudy: z.boolean().default(false),
  gpa: z.string().optional(),
  additionalInfo: z.string().optional(),
}).superRefine((value, ctx) => {
  if (!value.currentStudy && !value.endYear) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["endYear"],
      message: "End year is required",
    });
  }
});

const formSchema = z.object({
  educations: z.array(educationSchema).min(1),
});

const emptyEducation = {
  degree: "",
  institution: "",
  location: "",
  startYear: "",
  startMonth: "",
  endYear: "",
  endMonth: "",
  currentStudy: false,
  gpa: "",
  additionalInfo: "",
};

const selectClassName =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50";

function EducationFields({ control, form, index, remove }) {
  const isCurrentStudy = useWatch({
    control,
    name: `educations.${index}.currentStudy`,
  });

  return (
    <div className="space-y-4 rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base">
          {index === 0 ? "Most Recent Education" : `Education ${index + 1}`}
        </h3>
        {index > 0 && (
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`educations.${index}.degree`}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Degree/Certificate <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="e.g. Bachelor of Science in Computer Science" {...field} />
              </FormControl>
              {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`educations.${index}.institution`}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Institution <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="e.g. Stanford University" {...field} />
              </FormControl>
              {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name={`educations.${index}.location`}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Location <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="e.g. Stanford, CA" {...field} />
            </FormControl>
            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormLabel>Start Year <span className="text-red-500">*</span></FormLabel>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={control}
              name={`educations.${index}.startYear`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <select
                      className={selectClassName}
                      value={field.value || ""}
                      onChange={field.onChange}
                    >
                      <option value="">Year *</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`educations.${index}.startMonth`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <select
                      className={selectClassName}
                      value={field.value || ""}
                      onChange={field.onChange}
                    >
                      <option value="">Month (optional)</option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-2">
          <FormLabel>End Year <span className="text-red-500">*</span></FormLabel>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={control}
              name={`educations.${index}.endYear`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <select
                      className={selectClassName}
                      value={field.value || ""}
                      onChange={field.onChange}
                      disabled={isCurrentStudy}
                    >
                      <option value="">Year *</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`educations.${index}.endMonth`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <select
                      className={selectClassName}
                      value={field.value || ""}
                      onChange={field.onChange}
                      disabled={isCurrentStudy}
                    >
                      <option value="">Month (optional)</option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      <FormField
        control={control}
        name={`educations.${index}.currentStudy`}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (checked) {
                    form.setValue(`educations.${index}.endYear`, "");
                    form.setValue(`educations.${index}.endMonth`, "");
                  }
                }}
              />
            </FormControl>
            <FormLabel className="!mt-0 font-normal cursor-pointer">
              I currently study here
            </FormLabel>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`educations.${index}.gpa`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>GPA (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="e.g. 3.8/4.0" {...field} />
            </FormControl>
            <p className="text-xs text-muted-foreground">Only include it if 3.5 or higher, or if required</p>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`educations.${index}.additionalInfo`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Information (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Honors, relevant coursework, thesis, achievements, etc."
                className="min-h-[120px] resize-none"
                {...field}
              />
            </FormControl>
            <p className="text-xs text-muted-foreground">
              E.g., honors, thesis topic, scholarships, coursework, or academic achievements
            </p>
          </FormItem>
        )}
      />
    </div>
  );
}

const Step4 = forwardRef(function Step4({ defaultValues, onSave }, ref) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      educations: defaultValues?.educations?.length ? defaultValues.educations : [emptyEducation],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  useImperativeHandle(ref, () => ({
    submitForm: () => form.handleSubmit(onSave)(),
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 md:px-0 md:py-0 space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-1">Education</h2>
        <p className="text-muted-foreground text-[12px]">
          Add your educational background, starting with your most recent degree
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
          {fields.map((field, index) => (
            <EducationFields
              key={field.id}
              control={form.control}
              form={form}
              index={index}
              remove={remove}
            />
          ))}

          <button
            type="button"
            onClick={() => append(emptyEducation)}
            className="w-full flex items-center justify-center gap-2 py-3 border rounded-xl text-sm font-medium text-foreground hover:bg-muted/60 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Another Education
          </button>
        </form>
      </Form>

      <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-blue-700">
          <Lightbulb className="w-5 h-5" />
          <h3 className="font-semibold text-[1rem]">Tips for education section:</h3>
        </div>
        <ul className="space-y-2 text-blue-900/80 ml-7 text-[0.8rem] list-disc">
          <li>List education in reverse chronological order, starting with the most recent</li>
          <li>Include relevant coursework or academic projects if you're early in your career</li>
          <li>Mention honors, awards, distinctions, or scholarships when they strengthen your resume</li>
          <li>Only include GPA if it is strong or specifically requested</li>
        </ul>
      </div>
    </div>
  );
});

export default Step4;
