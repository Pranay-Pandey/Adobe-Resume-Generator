// Schema for our Resume Info 
namespace resumeapi.Models
{
    public class Resume_info
    {
        public string template_id { get; set; }
        public personal_information personal_info { get; set; }

        public string job_title { get; set; }

        public string career_objective { get; set; }

        public List<string> skills { get; set; }

        public List<Education> educations { get; set; }

        public List<Experience> experiences { get; set; }

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
