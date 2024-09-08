document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeOutput = document.getElementById('resume-output') as HTMLDivElement;

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent page refresh

        const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
        const profilePicture = profilePictureInput.files ? profilePictureInput.files[0] : null;
        let profilePictureURL = "";
        if (profilePicture) {
            profilePictureURL = URL.createObjectURL(profilePicture);
        }

        // Get form values
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const educationDuration = (document.getElementById('Educationduration') as HTMLInputElement).value;
        const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
        const workDuration = (document.getElementById('workDuration') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',').map(skill => skill.trim());
        const profile = (document.getElementById('profile') as HTMLInputElement).value;
        const projects = (document.getElementById('projects') as HTMLTextAreaElement).value;
        const projectsDuration = (document.getElementById('projectsDuration') as HTMLTextAreaElement).value;
        const interests = (document.getElementById('interests') as HTMLInputElement).value.split(',').map(interest => interest.trim());

        // Generate resume
        const resumeHtml = `
            <header>
                <h1 contenteditable="true">${name}</h1>
                ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" id="profile-pic" />` : ""}
            </header>
            <div class="profile">
                <h2>Profile</h2>
                <p class="profileDescription" contenteditable="true">${profile}</p>
            </div>
            <div class="two-sections">
                <div>
                    <section id="education">
                        <h2>Education</h2>
                        <div contenteditable="true">
                            <h3>${education}</h3>
                            <h3>Duration: ${educationDuration}</h3>
                        </div>
                    </section>
                    <section id="project">
                        <h2>Projects</h2>
                        <div class="project-section" contenteditable="true">
                            <p>${projects}</p>
                            <h5>Duration: ${projectsDuration}</h5>
                        </div>
                    </section>
                    <section id="work-experience">
                        <h2>Work Experience</h2>
                        <div contenteditable="true">
                            <p><span class="spanMERN">${workExperience}</span></p>
                            <p>Duration: ${workDuration}</p>
                        </div>
                    </section>
                </div>
                <div>
                    <section id="skills-section">
                        <h2 id="skills-heading">Skills</h2>
                        <ul id="skills" contenteditable="true">
                            ${skills.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </section>
                    <section id="interests-section">
                        <h2>Interests</h2>
                        <div class="interestButtons" contenteditable="true">
                            ${interests.map(interest => `<button disable="true">${interest}</button>`).join('')}
                        </div>
                    </section>
                </div>
            </div>
        `;

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
        const shareButton = document.createElement('button');
        shareButton.textContent = 'Share Resume';
        shareButton.onclick = shareResume;

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download as PDF';
        downloadButton.onclick = downloadResumeAsPDF;

        resumeOutput.appendChild(shareButton);
        resumeOutput.appendChild(downloadButton);
    }

    // Function to share the resume URL
    function shareResume() {
        const username = (document.getElementById('name') as HTMLInputElement).value.toLowerCase().replace(/\s+/g, '-');
        const shareURL = `${window.location.origin}/${username}/resume`;

        navigator.clipboard.writeText(shareURL)
            .then(() => alert(`Link copied to clipboard: ${shareURL}`))
            .catch((error) => console.error('Failed to copy link:', error));
    }

    // Function to download the resume as PDF using html2pdf.js
    function downloadResumeAsPDF() {
        const element = resumeOutput;
        // Check if html2pdf is loaded
        if (window.html2pdf) {
            window.html2pdf()
                .from(element)
                .save('resume.pdf');
        } else {
            alert('html2pdf.js is not loaded. Please include it via script tag.');
        }
    }

    // Skills section toggle functionality
  

});




