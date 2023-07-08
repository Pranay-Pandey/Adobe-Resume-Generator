// Function to add an education item dynamically
function addEducationItem() {
    var educationGroup = document.getElementById('educationGroup');
  
    var newEducationItem = document.createElement('div');
    newEducationItem.className = 'form-group education-item';
  
    var removeButton = createRemoveButton();
    removeButton.addEventListener('click', removeItem);
  
    var schoolNameInput = createTextInput('schoolName[]', 'School Name', true);
    var yearInput = createTextInput('year[]', 'Year', true);
    var descriptionInput = createTextInput('description[]', 'Description', true);
  
    appendChildren(newEducationItem, [schoolNameInput, yearInput, descriptionInput, removeButton]);
  
    educationGroup.insertBefore(newEducationItem, educationGroup.lastElementChild);
  }
  
  // Function to add an experience item dynamically
  function addExperienceItem() {
    var experienceGroup = document.getElementById('experienceGroup');
  
    var newExperienceItem = document.createElement('div');
    newExperienceItem.className = 'form-group experience-item';
  
    var removeButton = createRemoveButton();
    removeButton.addEventListener('click', removeItem);
  
    var companyNameInput = createTextInput('companyName[]', 'Company Name', true);
    var expYearInput = createTextInput('expYear[]', 'Year', true);
    var expDescriptionInput = createTextAreaInput('expDescription[]', 'Description', 2, true);
  
    appendChildren(newExperienceItem, [companyNameInput, expYearInput, expDescriptionInput, removeButton]);
  
    experienceGroup.insertBefore(newExperienceItem, experienceGroup.lastElementChild);
  }
  
  // Function to add an achievement item dynamically
  function addAchievementItem() {
    var achievementGroup = document.getElementById('achievementGroup');
  
    var newAchievementItem = document.createElement('div');
    newAchievementItem.className = 'form-group achievement-item';
  
    var removeButton = createRemoveButton();
    removeButton.addEventListener('click', removeItem);
  
    var achievementTypeInput = createTextInput('achievementType[]', 'Type', true);
    var achievementDescriptionInput = createTextAreaInput('achievementDescription[]', 'Description', 2, true);
  
    appendChildren(newAchievementItem, [achievementTypeInput, achievementDescriptionInput, removeButton]);
  
    achievementGroup.insertBefore(newAchievementItem, achievementGroup.lastElementChild);
  }
  
  // Function to remove an item
  function removeItem() {
    var group = this.parentNode.parentNode;
    var itemContainer = this.parentNode;
    if (group.children.length > 2) {
      group.removeChild(itemContainer);
    }
  }
  
  // Function to generate the resume
  function generateResume() {
    var templateId = document.getElementById('templateId').value;
  
    // Gather personal information
    var personalInfo = {
      name: document.getElementById('name').value,
      last_name: document.getElementById('lastName').value,
      email_address: document.getElementById('email').value,
      phone_number: document.getElementById('phone').value,
      linkedin_url: document.getElementById('linkedin').value
    };
  
    var jobTitle = document.getElementById('jobTitle').value;
    var careerObjective = document.getElementById('objective').value;
    var skills = document.getElementById('skills').value.split(',').map(function (skill) {
      return skill.trim();
    });
  
    // Gather education items
    var educations = [];
    var educationItems = document.querySelectorAll('.education-item');
    for (var i = 0; i < educationItems.length; i++) {
      var educationItem = educationItems[i];
      if (educationItem != null) {
        var schoolName = educationItem.children[0].value;
        var year = educationItem.children[1].value;
        var description = educationItem.children[2].value;
  
        educations.push({
          schoolName: schoolName,
          year: year,
          description: description
        });
      }
    }
  
    // Gather experience items
    var experiences = [];
    var experienceItems = document.querySelectorAll('.experience-item');
    for (var i = 0; i < experienceItems.length; i++) {
      var experienceItem = experienceItems[i];
      var companyName = experienceItem.children[0].value;
      var year = experienceItem.children[1].value;
      var description = experienceItem.children[2].value;
  
      experiences.push({
        companyName: companyName,
        year: year,
        description: description
      });
    }
  
    // Gather achievement items
    var achievements = [];
    var achievementItems = document.querySelectorAll('.achievement-item');
    for (var i = 0; i < achievementItems.length; i++) {
      var achievementItem = achievementItems[i];
      var type = achievementItem.children[0].value;
      var description = achievementItem.children[1].value;
  
      achievements.push({
        type: type,
        description: description
      });
    }
  
    var resumeData = {
      template_id: templateId,
      personal_info: personalInfo,
      job_title: jobTitle,
      career_objective: careerObjective,
      skills: skills,
      educations: educations,
      experiences: experiences,
      achievements: achievements
    };
  
    console.log(resumeData);
  
    if (validateData(resumeData)) {
      generateResumeAndDownload(resumeData);
    }
  }
  
  // Function to generate the resume and initiate download
  function generateResumeAndDownload(data) {
    var spinner = document.getElementById('spinner');
  
    // Display the spinner
    spinner.style.display = 'block';
  
    fetch('https://localhost:7131/resume', {
      method: 'POST',
      headers: {
        'accept': 'application/pdf',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (!response.ok) {
          var errorMessage = 'Error: ' + response.status;
          if (response.status === 400) {
            errorMessage += ' - Bad Request';
          } else if (response.status === 401) {
            errorMessage += ' - Unauthorized';
          } else if (response.status === 404) {
            errorMessage += ' - Template not found';
          } else if (response.status === 500) {
            errorMessage += ' - Internal Server Error';
          }
          throw new Error(errorMessage);
        }
        return response.blob();
      })
      .then(function (blob) {
        // Create a temporary download link
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'resume.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(function (error) {
        alert(error.message);
        console.error(error);
        // Handle the error
      })
      .finally(function () {
        // Hide the spinner
        spinner.style.display = 'none';
      });
  }
  
  // Function to validate the data before generating the resume
  function validateData(resumeData) {
    // Check if any required field is empty or contains only whitespace
    if (
      resumeData.template_id.trim() === '' ||
      resumeData.personal_info.name.trim() === '' ||
      resumeData.personal_info.last_name.trim() === '' ||
      resumeData.personal_info.email_address.trim() === '' ||
      resumeData.personal_info.phone_number.trim() === '' ||
      resumeData.personal_info.linkedin_url.trim() === '' ||
      resumeData.job_title.trim() === '' ||
  resumeData.career_objective.trim() === '' ||
      resumeData.skills.length === 0 ||
      resumeData.educations.length === 0 ||
      resumeData.experiences.length === 0 ||
      resumeData.achievements.length === 0
    ) {
      alert('Please fill in all the required fields.');
      return false;
    }
  
    // Check if any education object is null
    for (var i = 0; i < resumeData.educations.length; i++) {
      var education = resumeData.educations[i];
      if (
        education.schoolName.trim() === '' ||
        education.year.trim() === '' ||
        education.description.trim() === ''
      ) {
        alert('Please fill in all the education fields.');
        return false;
      }
    }
  
    // Check if any experience object is null
    for (var i = 0; i < resumeData.experiences.length; i++) {
      var experience = resumeData.experiences[i];
      if (
        experience.companyName.trim() === '' ||
        experience.year.trim() === '' ||
        experience.description.trim() === ''
      ) {
        alert('Please fill in all the experience fields.');
        return false;
      }
    }
  
    // Check if any achievement object is null
    for (var i = 0; i < resumeData.achievements.length; i++) {
      var achievement = resumeData.achievements[i];
      if (
        achievement.type.trim() === '' ||
        achievement.description.trim() === ''
      ) {
        alert('Please fill in all the achievement fields.');
        return false;
      }
    }
  
    return true;
  }
  
  // Function to create a remove button element
  function createRemoveButton() {
    var removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger remove-item';
    removeButton.textContent = 'Remove';
    return removeButton;
  }
  
  // Function to create a text input element
  function createTextInput(name, placeholder, required) {
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control';
    input.name = name;
    input.placeholder = placeholder;
    input.required = required;
    return input;
  }
  
  // Function to create a textarea input element
  function createTextAreaInput(name, placeholder, rows, required) {
    var textarea = document.createElement('textarea');
    textarea.className = 'form-control';
    textarea.name = name;
    textarea.placeholder = placeholder;
    textarea.rows = rows;
    textarea.required = required;
    return textarea;
  }
  
  // Function to append multiple children to a parent element
  function appendChildren(parent, children) {
    children.forEach(function (child) {
      parent.appendChild(child);
    });
  }
  
  // Event listener to hide modal overlay
  document.addEventListener('DOMContentLoaded', function () {
    var modalOverlay = document.getElementById('modal-overlay');
    var modalNumbers = document.querySelectorAll('.modal-number');
  
    function hideModal(event) {
      var selectedNumber = event.target.getAttribute('data-value');
      modalOverlay.classList.add('hidden');
    }
  
    modalNumbers.forEach(function (number) {
      number.addEventListener('click', hideModal);
    });
  });
  
  // Event listener to handle image click and set template ID
  document.addEventListener('DOMContentLoaded', function () {
    var templateImages = document.querySelectorAll('.template-image');
  
    templateImages.forEach(function (image) {
      image.addEventListener('click', handleImageClick);
    });
  });

  function handleImageClick(event) {
    var number = event.parentNode.getAttribute('data-value');
    var templateId = document.getElementById('templateId');
    templateId.value = number;
  }
