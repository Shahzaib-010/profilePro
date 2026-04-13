import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

const positionSchema = z.object({
  jobTitle:    z.string().min(1, "Job title is required"),
  company:     z.string().min(1, "Company is required"),
  location:    z.string().min(1, "Location is required"),
  startDate:   z.string().min(1, "Start date is required"),
  endDate:     z.string().optional(),
  currentJob:  z.boolean().default(false),
  description: z.string().min(1, "Description is required"),
});

const formSchema = z.object({
  positions: z.array(positionSchema).min(1),
});

const emptyPosition = {
  jobTitle: "", company: "", location: "",
  startDate: "", endDate: "", currentJob: false, description: "",
};

const Step3 = forwardRef(function Step3({ defaultValues, onSave }, ref) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      positions: defaultValues?.positions?.length
        ? defaultValues.positions
        : [emptyPosition],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "positions",
  });

  useImperativeHandle(ref, () => ({
    submitForm: () => form.handleSubmit(onSave)(),
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 md:px-1 md:py-2 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Work Experience</h2>
        <p className="text-muted-foreground text-[12px]">Add your most recent positions first and then onwards ...</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-6 border-b-2 border-black/5">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 ">

              {/* Position Header */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-base">
                  {index === 0 ? "Most Recent Position" : `Position ${index + 1}`}
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

              {/* Job Title + Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name={`positions.${index}.jobTitle`}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Job Title <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input placeholder="e.g. Software Engineer" {...field} /></FormControl>
                      {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name={`positions.${index}.company`}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Company <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input placeholder="e.g. Google" {...field} /></FormControl>
                      {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                    </FormItem>
                  )}
                />
              </div>

              {/* Location */}
              <FormField control={form.control} name={`positions.${index}.location`}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Location <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input placeholder="e.g. San Francisco, CA" {...field} /></FormControl>
                    {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                  </FormItem>
                )}
              />

              {/* Start + End Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name={`positions.${index}.startDate`}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Start Date <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name={`positions.${index}.endDate`}
                  render={({ field, fieldState }) => {
                    const isCurrentJob = form.watch(`positions.${index}.currentJob`);
                    return (
                      <FormItem>
                        <FormLabel>End Date <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="date" disabled={isCurrentJob} {...field} />
                        </FormControl>
                        {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                      </FormItem>
                    );
                  }}
                />
              </div>

              {/* Currently Work Here */}
              <FormField control={form.control} name={`positions.${index}.currentJob`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (checked) form.setValue(`positions.${index}.endDate`, "");
                        }}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0 font-normal cursor-pointer">I currently work here</FormLabel>
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField control={form.control} name={`positions.${index}.description`}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Description & Achievements <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="• Led development of new features that increased user engagement by 30%"
                        className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">Use the toolbar to format your text and add bullet points</p>
                    {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                  </FormItem>
                )}
              />
            </div>
          ))}

          {/* Add Another Position */}
          <button
            type="button"
            onClick={() => append(emptyPosition)}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-muted-foreground hover:border-gray-400 hover:text-foreground transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Another Position
          </button>

        </form>
      </Form>
    </div>
  );
});

export default Step3;