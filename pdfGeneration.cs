using Adobe.PDFServicesSDK.auth;
using Adobe.PDFServicesSDK.pdfops;
using Adobe.PDFServicesSDK.io;
using Adobe.PDFServicesSDK.options.documentmerge;
using Newtonsoft.Json.Linq;
using resumeapi.Models;
using ExecutionContext = Adobe.PDFServicesSDK.ExecutionContext;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

/*
 This class is responsible for the PDF merge operation. This class gets the Resume_info
 object and uses it along with the specified template to merge the two into a PDF file.
 This class is called in the API to generation of the Resume PDF. The Merge Operation 
 uses the Adobe API to merge the word template with the information from the Resume_info
 object.
 */

namespace resumeapi
{
    public class pdfGeneration
    {
        internal byte[] GeneratePdf(Resume_info info)
        {
            // Get the base directory
            string baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
            string baseDir = Directory.GetParent(baseDirectory)?.Parent?.Parent?.Parent?.FullName;

            // Specify the template directory and file
            string templateDirectory = Path.Combine(baseDir, "Resume Templates");
            string fileName = $"{info.template_id}.docx";
            string templateLocation = Path.Combine(templateDirectory, fileName);

            // Read the API credentials from the JSON file
            string credentialsFileName = "pdfservices-api-credentials.json";
            string credentialsJsonLocation = Path.Combine(baseDir, credentialsFileName);
            string credentialsJson = File.ReadAllText(credentialsJsonLocation);
            JObject crd = JObject.Parse(credentialsJson);
            string clientId = (string)crd["client_credentials"]["client_id"];
            string clientSecret = (string)crd["client_credentials"]["client_secret"];

            // Convert resume data to JSON
            JObject resumeData = ConvertResumeToJson(info);

            Credentials credentials = Credentials.ServicePrincipalCredentialsBuilder()
                .WithClientId(clientId)
                .WithClientSecret(clientSecret)
                .Build();

            // Create the PDF services execution context
            ExecutionContext executionContext = ExecutionContext.Create(credentials);

            // Specify document merge options and operation
            DocumentMergeOptions documentMergeOptions = new DocumentMergeOptions(resumeData, OutputFormat.PDF);
            DocumentMergeOperation documentMergeOperation = DocumentMergeOperation.CreateNew(documentMergeOptions);

            // Set the input template file
            FileRef sourceFileRef = FileRef.CreateFromLocalFile(templateLocation);
            documentMergeOperation.SetInput(sourceFileRef);

            // Execute the document merge operation by calling Adobe API
            FileRef result = documentMergeOperation.Execute(executionContext);

            // Save the result as byte array
            using (MemoryStream ms = new MemoryStream())
            {
                result.SaveAs(ms);
                return ms.ToArray();
            }
        }

        private JObject ConvertResumeToJson(Resume_info info)
        {
            JObject jsonResume = new JObject();
            
            // Extract the information from the Resume_info object and convert it into
            // the object ready for merge operation

            // Personal Information
            jsonResume["Name"] = info.personal_info.name;
            jsonResume["LastName"] = info.personal_info.last_name;
            jsonResume["EmailAddress"] = info.personal_info.email_address;
            jsonResume["PhoneNumber"] = info.personal_info.phone_number;
            jsonResume["LinkedIn"] = info.personal_info.linkedin_url;

            jsonResume["JobTitle"] = info.job_title;
            jsonResume["Summary"] = info.career_objective;

            // Skills
            JArray skillsArray = new JArray(info.skills);
            jsonResume["Skills"] = skillsArray;

            // Education
            JArray educationArray = new JArray();
            foreach (Education education in info.educations)
            {
                JObject educationObj = new JObject();
                educationObj["SchoolName"] = education.SchoolName;
                educationObj["Year"] = education.Year;
                educationObj["Description"] = education.Description;
                educationArray.Add(educationObj);
            }
            jsonResume["Education"] = educationArray;

            // Experience
            JArray experienceArray = new JArray();
            foreach (Experience experience in info.experiences)
            {
                JObject experienceObj = new JObject();
                experienceObj["CompanyName"] = experience.CompanyName;
                experienceObj["Year"] = experience.Year;
                experienceObj["Description"] = experience.Description;
                experienceArray.Add(experienceObj);
            }
            jsonResume["Experience"] = experienceArray;

            // Achievements
            JArray achievementArray = new JArray();
            foreach (Achievement achievement in info.achievements)
            {
                JObject achievementObj = new JObject();
                achievementObj["Type"] = achievement.Type;
                achievementObj["Description"] = achievement.Description;
                achievementArray.Add(achievementObj);
            }
            jsonResume["Achievements"] = achievementArray;

            return jsonResume;
        }

        public bool isValid(string template_id)
        {
            /*
            Here we check if the template is valid or not.
            Since currently there are only three valid ids we check for them directly
            If there will be more in the future we can use a database or keep a variable count
            */
            if (template_id == null) { return false;}
            if (template_id=="0" || template_id=="1" || template_id == "2")
            {
                return true;
            }
            return false;
        }
    }
}
