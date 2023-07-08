# Adobe-Resume-Generator


 <h2>Problem Statement</h2>
  <p>The problem statement is to create an API for resume generation. The API should use Adobe PDF generation APIs - a template DOCX file, along with user information, to generate a PDF resume. The API should take the user's information and template selection as input and produce a downloadable PDF file as output.</p>

  <h2>Brief Solution</h2>
  <p>The proposed solution consists of the following steps:</p>
  <ol>
    <li>Create a JSON object containing the user's information and template selection.</li>
    <li>Merge the JSON object with the selected template using the Adobe PDF generation API.</li>
    <li>Generate a PDF file as the result of the API.</li>
  </ol>

  <h2>Tech Stack</h2>
  <p>The solution is implemented using the following technologies:</p>
  <ul>
    <li>C# language</li>
    <li>ASP.NET framework</li>
    <li>Visual Studio 2022</li>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>

  <h2>Implementation</h2>
  <p>The implementation details are as follows:</p>

  <p>For proper functioning of the application, ensure that the following dependencies are installed:</p>
    <ul>
        <li>Microsoft.EntityFrameworkCore</li>
        <li>Microsoft.EntityFrameworkCore.InMemory</li>
        <li>Swashbuckle.AspNetCore</li>
        <li>Adobe.PDFServicesSDK</li>
    </ul>

  <h3>Model - Resume_info</h3>
  <p>The <code>Resume_info</code> model represents the data schema for the API input. It contains the following properties:</p>
  <ul>
    <li><code>template_id</code>: The ID of the selected template.</li>
    <li><code>personal_info</code>: An object containing personal information of the user.</li>
    <li><code>job_title</code>: The desired job title for the resume.</li>
    <li><code>career_objective</code>: The career objective or summary for the resume.</li>
    <li><code>skills</code>: A list of skills.</li>
    <li><code>educations</code>: A list of educational experiences.</li>
    <li><code>experiences</code>: A list of work experiences.</li>
    <li><code>achievements</code>: A list of achievements.</li>
  </ul>

  <h3>Controller - ResumeController</h3>
  <p>The API endpoint is implemented in the <code>ResumeController</code> using the <code>HttpPost</code> method. The endpoint is located at <code>/resume</code>. The method accepts a JSON object of type <code>Resume_info</code> as the input. It internally uses the <code>pdfGenerator</code> class to generate the PDF file. Before generating the PDF, the method checks if the provided template ID exists in the database.</p>

  <h3>pdfGenerator Class</h3>
  <p>The <code>pdfGenerator</code> class takes a <code>Resume_info</code> object as input and returns a PDF file. It uses the selected template ID to locate the corresponding DOCX template file. The user's information and data are then converted into a JSON object that can be merged with the template. The merging operation is performed by calling the Adobe PDF generation API. The resulting PDF file is the final output of the Resume API.</p>

  <h3>Web Page - Resume Generator</h3>
  <p>A web page is designed to generate resumes. It allows the user to select a template and enter the required information. When the user clicks the "Generate" button, the web page calls the API and passes the user-provided information. The generated PDF file is then downloaded.</p>

  <h2>Steps to Use the API</h2>
  <ol>
    <li>Clone this repository to your local machine.</li>
    <li>Open the project in Microsoft Visual Studio 2022.</li>
    <li>Paste your <code>pdfservices-api-credentials.json</code> file (generated from Adobe PDF services) into the project.</li>
    <li>Run the application and access the auto-generated documentation using Swagger.</li>
    <li>To use the web page for resume generation, follow these steps:
      <ol type="a">
        <li>Launch a local server to serve the webpage.</li>
        <li>Open the webpage from the local server using your preferred browser.</li>
        <li>Select a template by choosing its corresponding number.</li>
        <li>Fill in the required information in the form.</li>
        <li>Click the "Generate" button to initiate the API call and download the generated PDF resume.</li>
      </ol>
    </li>
  </ol>
  
  <h2>Database</h2>
  <p>The application does not use an external database. Instead, an in-memory database is utilized. The database context is created when the application runs.</p>


![image](https://github.com/Pranay-Pandey/Adobe-Resume-Generator/assets/79053599/30b37edf-8692-495c-aad5-b64f9565e272)
<hr>

![image](https://github.com/Pranay-Pandey/Adobe-Resume-Generator/assets/79053599/31469298-7868-442e-ac28-ba0583b938e7)
<hr>

![image](https://github.com/Pranay-Pandey/Adobe-Resume-Generator/assets/79053599/97902567-ddf5-4eca-a939-2f98cd384aa2)
![image](https://github.com/Pranay-Pandey/Adobe-Resume-Generator/assets/79053599/e678633c-d91a-4e2f-816d-5529bf0c6d20)

<hr>

![GIF](https://github.com/Pranay-Pandey/Adobe-Resume-Generator/assets/79053599/4d393ce8-73ed-4e52-8ec4-2ff3af4093f4)

