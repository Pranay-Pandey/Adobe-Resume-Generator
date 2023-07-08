// Schema for our Resume Info 
using Adobe.PDFServicesSDK.core;
using System.ComponentModel.DataAnnotations;

namespace resumeapi.Models
{
    public class Resume_info
    {
        [Required(ErrorMessage = "Template ID is required.")]
        public string template_id { get; set; }

        [Required(ErrorMessage = "Personal information is required.")]
        public personal_information personal_info { get; set; }

        [Required(ErrorMessage = "Job title is required.")]
        public string job_title { get; set; }

        [Required(ErrorMessage = "Career objective is required.")]
        public string career_objective { get; set; }

        [Required(ErrorMessage = "Skills are required.")]
        public List<string> skills { get; set; }

        [Required(ErrorMessage = "Education details are required.")]
        public List<Education> educations { get; set; }

        [Required(ErrorMessage = "Experience details are required.")]
        public List<Experience> experiences { get; set; }

        [Required(ErrorMessage = "Achievement details are required.")]
        public List<Achievement> achievements { get; set; }
    }

    public class personal_information
    {
        public string name { get; set; }
        public string last_name { get; set; }
        public string email_address { get; set; }
        public string phone_number { get; set; }
        public string linkedin_url { get; set; }
    }


    public class Education
    {
        public string SchoolName { get; set; }
        public string Year { get; set; }
        public string Description { get; set; }
    }

    public class Experience
    {
        public string CompanyName { get; set; }
        public string Year { get; set; }
        public string Description { get; set; }
    }

    public class Achievement
    {
        public string Type { get; set; }
        public string Description { get; set; }
    }
}
