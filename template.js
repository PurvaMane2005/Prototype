// Variable to track if materials have been updated
let materialsUpdated = false;

// Function to update the title
function updateTitle() {
    const newTitle = document.getElementById("title-input").value;
    document.getElementById("title-label").textContent = newTitle;

    // Hide title input and button after updating the title
    document.getElementById("title-input-container").style.display = "none";
}

// Function to update the ingredients label
function updateMaterials() {
    const newMaterials = document.getElementById("materials-input").value;
    document.getElementById("materials-label").textContent = "Ingredients required: " + newMaterials;

    // Hide materials input and button after updating the materials
    document.getElementById("materials-input-container").style.display = "none";
    materialsUpdated = true; // Mark materials as updated
}

// Function to add step-by-step instructions
function addStep() {
    const stepDescription = document.getElementById("step-description").value;
    const stepImageInput = document.getElementById("step-image").files[0];

    // Only proceed if a description and image are provided
    if (stepDescription && stepImageInput) {
        const stepsContainer = document.getElementById("steps-container");

        // Create a new step element
        const stepDiv = document.createElement("div");
        stepDiv.classList.add("step");

        // Add step title
        const stepNumber = stepsContainer.children.length + 1;
        const stepTitle = document.createElement("h3");
        stepTitle.textContent = "Step No. " + stepNumber;
        stepDiv.appendChild(stepTitle);

        // Add step description
        const stepText = document.createElement("p");
        stepText.textContent = stepDescription;
        stepDiv.appendChild(stepText);

        // Add the image
        const stepImage = document.createElement("img");
        stepImage.src = URL.createObjectURL(stepImageInput);
        stepImage.alt = "Step Image";
        stepDiv.appendChild(stepImage);

        // Create "Remove Step" button
        const removeStepButton = document.createElement("button");
        removeStepButton.textContent = "Remove Step";
        removeStepButton.classList.add("remove-step-btn");
        removeStepButton.onclick = function() {
            stepDiv.remove(); // Remove the step when the button is clicked
            // Show submit button if at least one step remains
            if (stepsContainer.children.length > 0) {
                document.getElementById("submit-btn").style.display = "block";
            }
        };

        // Append the remove button to the step container
        stepDiv.appendChild(removeStepButton);

        // Append the new step to the steps container
        stepsContainer.appendChild(stepDiv);

        // Clear the current input fields for new step
        document.getElementById("step-description").value = "";
        document.getElementById("step-image").value = "";

        // Show submit button if at least one step is added
        document.getElementById("submit-btn").style.display = "block";
    } else {
        alert("Please provide both a step description and an image.");
    }
}

// Function to handle the submit action
function submitSteps() {
    // Hide the instructions section
    document.getElementById("instructions-section").style.display = "none";

    // Display the final result section
    document.getElementById("result-section").style.display = "block";

    // Clear previous final result content
    const finalTitle = document.getElementById("final-title");
    const finalMaterials = document.getElementById("final-materials");
    const finalStepsContainer = document.getElementById("final-steps-container");
    
    finalTitle.textContent = ""; // Clear the previous title
    finalMaterials.textContent = ""; // Clear the previous materials
    finalStepsContainer.innerHTML = ""; // Clear previous steps

    // Transfer the title to the final result section
    finalTitle.textContent = document.getElementById("title-label").textContent;

    // Transfer the materials to the final result section
    finalMaterials.textContent = document.getElementById("materials-label").textContent;

    // Transfer the steps to the final result section
    const stepsContainer = document.getElementById("steps-container");

    // Clone each step and append it to the final steps container
    stepsContainer.querySelectorAll(".step").forEach(step => {
        const clonedStep = step.cloneNode(true);
        // Remove "Remove Step" button from cloned step
        clonedStep.querySelector(".remove-step-btn").remove();
        finalStepsContainer.appendChild(clonedStep);
    });

    // Reset materialsUpdated flag
    materialsUpdated = false;
}