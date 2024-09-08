document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeOutput = document.getElementById('resume-output');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent page refresh
        var profilePictureInput = document.getElementById("profilePicture");
        var profilePicture = profilePictureInput.files ? profilePictureInput.files[0] : null;
        var profilePictureURL = "";
        if (profilePicture) {
            profilePictureURL = URL.createObjectURL(profilePicture);
        }
        // Get form values
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var education = document.getElementById('education').value;
        var educationDuration = document.getElementById('Educationduration').value;
        var workExperience = document.getElementById('work-experience').value;
        var workDuration = document.getElementById('workDuration').value;
        var skills = document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); });
        var profile = document.getElementById('profile').value;
        var projects = document.getElementById('projects').value;
        var projectsDuration = document.getElementById('projectsDuration').value;
        var interests = document.getElementById('interests').value.split(',').map(function (interest) { return interest.trim(); });
        // Generate resume
        var resumeHtml = "\n            <header>\n                <h1 contenteditable=\"true\">".concat(name, "</h1>\n                ").concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" id=\"profile-pic\" />") : "", "\n            </header>\n            <div class=\"profile\">\n                <h2>Profile</h2>\n                <p class=\"profileDescription\" contenteditable=\"true\">").concat(profile, "</p>\n            </div>\n            <div class=\"two-sections\">\n                <div>\n                    <section id=\"education\">\n                        <h2>Education</h2>\n                        <div contenteditable=\"true\">\n                            <h3>").concat(education, "</h3>\n                            <h3>Duration: ").concat(educationDuration, "</h3>\n                        </div>\n                    </section>\n                    <section id=\"project\">\n                        <h2>Projects</h2>\n                        <div class=\"project-section\" contenteditable=\"true\">\n                            <p>").concat(projects, "</p>\n                            <h5>Duration: ").concat(projectsDuration, "</h5>\n                        </div>\n                    </section>\n                    <section id=\"work-experience\">\n                        <h2>Work Experience</h2>\n                        <div contenteditable=\"true\">\n                            <p><span class=\"spanMERN\">").concat(workExperience, "</span></p>\n                            <p>Duration: ").concat(workDuration, "</p>\n                        </div>\n                    </section>\n                </div>\n                <div>\n                    <section id=\"skills-section\">\n                        <h2 id=\"skills-heading\">Skills</h2>\n                        <ul id=\"skills\" contenteditable=\"true\">\n                            ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n                        </ul>\n                    </section>\n                    <section id=\"interests-section\">\n                        <h2>Interests</h2>\n                        <div class=\"interestButtons\" contenteditable=\"true\">\n                            ").concat(interests.map(function (interest) { return "<button disable=\"true\">".concat(interest, "</button>"); }).join(''), "\n                        </div>\n                    </section>\n                </div>\n            </div>\n        ");
        resumeOutput.innerHTML = resumeHtml;
        // Add event listener for editing
        resumeOutput.addEventListener('input', function (event) {
            console.log('Content changed:', event.target);
        });
        // Add Share and Download buttons
        addShareAndDownloadButtons();
    });
    // Function to add Share and Download buttons
    function addShareAndDownloadButtons() {
        var shareButton = document.createElement('button');
        shareButton.textContent = 'Share Resume';
        shareButton.onclick = shareResume;
        var downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download as PDF';
        downloadButton.onclick = downloadResumeAsPDF;
        resumeOutput.appendChild(shareButton);
        resumeOutput.appendChild(downloadButton);
    }
    // Function to share the resume URL
    function shareResume() {
        var username = document.getElementById('name').value.toLowerCase().replace(/\s+/g, '-');
        var shareURL = "".concat(window.location.origin, "/").concat(username, "/resume");
        navigator.clipboard.writeText(shareURL)
            .then(function () { return alert("Link copied to clipboard: ".concat(shareURL)); })
            .catch(function (error) { return console.error('Failed to copy link:', error); });
    }
    // Function to download the resume as PDF using html2pdf.js
    function downloadResumeAsPDF() {
        var element = resumeOutput;
        // Check if html2pdf is loaded
        if (window.html2pdf) {
            window.html2pdf()
                .from(element)
                .save('resume.pdf');
        }
        else {
            alert('html2pdf.js is not loaded. Please include it via script tag.');
        }
    }
    // Skills section toggle functionality
});
