/**
 * Transforms raw resume form data (step1-5) into the format expected by ResumeRenderer components
 */
export function transformResumeData(resumeData) {
  const transformed = {};

  // Transform Step 1 (Contact Info) → Header data
  if (resumeData.step1) {
    const { firstName, lastName, title, email, phone, city, country } = resumeData.step1;
    transformed.personal = {
      name: [firstName, lastName].filter(Boolean).join(" ") || "Your Name",
      title: title || "Professional Title",
      email: email || "",
      phone: phone || "",
      location: [city, country].filter(Boolean).join(", ") || "",
      link: "", // Not collected in current form, can be added later
    };
  }

  // Transform Step 2 (Summary) → Summary data (plain string)
  transformed.summary = resumeData.step2?.summary || "";

  // Transform Step 3 (Experience) → Experience data
  if (resumeData.step3?.positions?.length) {
    transformed.experience = resumeData.step3.positions.map((pos) => {
      // Format dates for display
      const startDate = pos.start_date || pos.startDate || "";
      const endDate = pos.currentJob ? "Present" : (pos.end_date || pos.endDate || "");

      return {
        role: pos.role || pos.jobTitle || "Job Title",
        company: pos.company || "Company",
        location: pos.location || "",
        startDate,
        endDate,
        description: pos.description || "",
      };
    });
  } else {
    transformed.experience = [];
  }

  // Transform Step 4 (Education) → Education data
  if (resumeData.step4?.educations?.length) {
    transformed.education = resumeData.step4.educations.map((edu) => {
      // Format year for display
      const startYear = edu.startYear || edu.startDate || "";
      const endYear = edu.currentStudy ? "Present" : (edu.endYear || edu.endDate || "");
      const year = [startYear, endYear].filter(Boolean).join(" - ") || "";

      return {
        degree: edu.degree || "Degree",
        school: edu.institute || edu.institution || "Institution",
        location: edu.location || "",
        year,
        gpa: edu.gpa || "",
        additionalInfo: edu.additionalInfo || edu.information || "",
      };
    });
  } else {
    transformed.education = [];
  }

  // Placeholder arrays for skills/projects (not yet implemented in current steps)
  transformed.skills = [];
  transformed.projects = [];

  return transformed;
}
