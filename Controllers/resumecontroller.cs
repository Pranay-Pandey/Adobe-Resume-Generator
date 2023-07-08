using Microsoft.AspNetCore.Mvc;
using resumeapi.Data;
using resumeapi.Models;

namespace resumeapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class resumecontroller : ControllerBase
    {
        private readonly apiContext _context;

        public resumecontroller(apiContext context)
        {
            _context = context;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FileContentResult))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]

        public IActionResult CreateEdit(Resume_info info)
        {
            pdfGeneration generator = new pdfGeneration(); // The class responsible for making PDF
            
            // to check if the template_id is valid or not
            if (generator.isValid(info.template_id)==false)
            {
                return StatusCode(404, "Template Not Found");
            }

            try
            {
                byte[] stream = generator.GeneratePdf(info);    // pdf object

                return File(stream, "application/pdf", "resume.pdf");   // return pdf
            }

            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
