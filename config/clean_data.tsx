// Helper function to clean the response and map it to your state structure
export function mapResponseToResumeState(responseData: any) {
    return {
      firstName: responseData.first_name?.[0] || "",
      surname: responseData.last_name?.[1] || responseData.last_name?.[0] || "",
      email: responseData.email?.[0] || "",
      phone: responseData.phone?.[0] || "",
      city: responseData.city?.[0] || "",
      country: responseData.country?.[0] || "",
      postalCode: responseData.pincode?.[0] || "",
      profession: responseData.designation?.[0] || "Software Engineer", // default value
      workHistory: responseData.position_held
        ? responseData.position_held.map((position: string) => ({
            title: position,
            description: responseData.education?.[0] ? [responseData.education?.[0]] : [],
            employer: responseData.companies_worked?.[0] || "Unknown",
            location: responseData.city?.[0] || "",
            startDate: { month: "January", year: "2020" }, // Placeholder values
            endDate: { month: "June", year: "2023", current: false }, // Placeholder values
          }))
        : [],
      education: responseData.education
        ? responseData.education.map((edu: string, index: number) => ({
            schoolName: responseData.college_name?.[index] || "Unknown",
            schoolLocation: "Unknown", // Placeholder
            degree: edu.split(",")[0] || "Bachelor of Science", // Extract the degree
            fieldOfStudy: "Computer Science", // Placeholder
            graduationDate: { month: "May", year: "2023" }, // Placeholder
          }))
        : [],
      skills: responseData.skills || [],
      languages: responseData.language
        ? responseData.language.map((lang: string) => ({
            name: lang,
            proficiency: "Intermediate", // Default proficiency
          }))
        : [],
      summary: "Passionate developer with experience in web applications.", // Default or modify
    };
  }
  
 