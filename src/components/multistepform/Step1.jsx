

// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"

// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

// // Validation Schema
// const formSchema = z.object({
//   firstName: z.string().min(2, "First name must be at least 2 characters"),
//   lastName: z.string().min(2, "Last name must be at least 2 characters"),
//   title: z.string().min(20, "Title is required"),
//   email: z.string().email("Invalid email address"),
//   phone: z.string().min(10, "Phone number is required"),
//   city: z.string().optional(),
//   country: z.string().optional(),
// })

// export default function Step1() {
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       title: "",
//       email: "",
//       phone: "",
//       city: "",
//       country: "",
//     },
//   })

//   function onSubmit(values) {
//     // Store in localStorage
//     localStorage.setItem("step1Data", JSON.stringify(values))

//     console.log("Saved Data:", values)

//     // You can navigate to next step here
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-6">
//       <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
//       <p className="text-muted-foreground mb-6">
//         Let’s start with your basic contact details
//       </p>

//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-6"
//         >
//           {/* First + Last Name */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormField
//               control={form.control}
//               name="firstName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>First Name *</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter first name" {...field} />
//                   </FormControl>
//                   <p className="text-red-500 text-sm">
//                     {form.formState.errors.firstName?.message}
//                   </p>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="lastName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Last Name *</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter last name" {...field} />
//                   </FormControl>
//                   <p className="text-red-500 text-sm">
//                     {form.formState.errors.lastName?.message}
//                   </p>
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Title */}
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                   Professional Title
//                   <span className="text-sm text-muted-foreground ml-2">
//                     (appears under your name)
//                   </span>
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="e.g., Senior Software Engineer, Full Stack Developer"
//                     {...field}
//                   />
//                 </FormControl>
                
//                 <p className="text-red-500 text-sm">
//                     {form.formState.errors.title?.message}
//                   </p>
//               </FormItem>
//             )}
//           />

//           {/* Email + Phone */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email *</FormLabel>
//                   <FormControl>
//                     <Input type="email" placeholder="Enter email" {...field} />
//                   </FormControl>
//                   <p className="text-red-500 text-sm">
//                     {form.formState.errors.email?.message}
//                   </p>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone *</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter phone number" {...field} />
//                   </FormControl>
//                   <p className="text-red-500 text-sm">
//                     {form.formState.errors.email?.message}
//                   </p>
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* City + Country */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormField
//               control={form.control}
//               name="city"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>City</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter city" {...field} />
//                   </FormControl>
                  
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="country"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Country</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter country" {...field} />
//                   </FormControl>
                  
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Next Button */}
//           <div className="flex justify-end">
//             <Button type="submit" className="px-6">
//               Next
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   )
// }





import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { forwardRef, useImperativeHandle, useEffect } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  title: z.string().min(20, "Title must be at least 20 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  city: z.string().optional(),
  country: z.string().optional(),
})

  const Step1 = forwardRef(function Step1({ defaultValues, onSave, onDraftChange }, ref) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "", lastName: "", title: "",
      email: "", phone: "", city: "", country: "",
      ...defaultValues, // ← restores saved values when navigating back
    },
  })

  // Watch all fields for real-time updates
  const watchedValues = form.watch();

  useEffect(() => {
    if (onDraftChange) {
      onDraftChange(watchedValues);
    }
  }, [watchedValues, onDraftChange]);
  useImperativeHandle(ref, () => ({
    submitForm: () => form.handleSubmit(onSave)(),
  }))

  return (
    <div className="max-w-4xl px-4 py-4 md:px-1 md:py-2">
      <h2 className="text-xl font-semibold mb-1">Contact Information</h2>
      <p className="text-muted-foreground mb-6 text-[12px]">Let's start with your basic contact details</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="firstName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl><Input placeholder="Enter first name" {...field} /></FormControl>
                  {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                </FormItem>
              )}
            />
            <FormField control={form.control} name="lastName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl><Input placeholder="Enter last name" {...field} /></FormControl>
                  {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                </FormItem>
              )}
            />
          </div>

          <FormField control={form.control} name="title"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  Professional Title
                  <span className="text-sm text-muted-foreground ml-2">(appears under your name)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Senior Software Engineer, Full Stack Developer" {...field} />
                </FormControl>
                <p className="text-sm text-muted-foreground">This helps recruiters quickly understand your role</p>
                {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl><Input type="email" placeholder="Enter email" {...field} /></FormControl>
                  {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                </FormItem>
              )}
            />
            <FormField control={form.control} name="phone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Phone *</FormLabel>
                  <FormControl><Input placeholder="Enter phone number" {...field} /></FormControl>
                  {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl><Input placeholder="Enter city" {...field} /></FormControl>
                </FormItem>
              )}
            />
            <FormField control={form.control} name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl><Input placeholder="Enter country" {...field} /></FormControl>
                </FormItem>
              )}
            />
          </div>

        </form>
      </Form>
    </div>
  )
})

export default Step1