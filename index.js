function calculateBMI(event) {
    // Get input values
    event.preventDefault();
    var name = document.getElementById("name").value;
    var age = parseFloat(document.getElementById("age1").value);
    var height = parseFloat(document.getElementById("height").value);
    var weight = parseFloat(document.getElementById("weight").value);
    var gender = document.getElementById("gender").value;
    var activityLevel = document.getElementById("activityLevel").value;

    // Perform BMI calculation (assuming height is in cm)
    var heightInMeters = height / 100;
    var bmi = weight / (heightInMeters * heightInMeters);
    bmi = bmi.toFixed(2);

    // Determine BMI Range
    var bmiRange = getBmiRange(bmi);

    // Calculate recommended daily calories
    var calories = calculateCalories(age, gender, weight, height, activityLevel);

    // Display results
    var resultText = "Your BMI is: " + bmi + " kg/m2\n\n";
    resultText += "BMI Range: " + bmiRange + "\n\n";
    resultText += "Your calories are: " + calories.toFixed(0) + " kcal/day \n\n";
    resultText += "Healthy BMI range: 18.5 kg/m2 - 25 kg/m2";

    document.getElementById("result").innerText = resultText;

    var cardElement = document.createElement('div');
    cardElement.className = 'col';
    cardElement.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-center mb-2">Are you Satisfied with your BMI?</h5>
               
                <div class="d-flex justify-content-around align-items-center mt-2 mb-3">
                    <div><a href="index.html" class="btn custom-button-bg text-white">Yes (Back to Home)</a></div>
                    <div><a href="dietFood.html" class="btn custom-button-bg text-white">Food Recommendation</a></div>
                </div>
            </div>
        </div>
    `;

    // Append the card to the container
    var cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = ''; // Clear previous results
    cardContainer.appendChild(cardElement);
}

function getBmiRange(bmi) {
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 24.9) {
        return "Normal Weight";
    } else if (bmi < 29.9) {
        return "Overweight";
    } else {
        return "Obese";
    }
}

function calculateCalories(age, gender, weight, height, activityLevel) {
    // Formula for calculating calories based on various factors (simplified for illustration)
    var baseCalories = (gender === "male") ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

    var activityMultiplier = getActivityMultiplier(activityLevel);
    var calories = baseCalories * activityMultiplier;
    return calories;
}

function getActivityMultiplier(activityLevel) {
    // Activity level multipliers (simplified for illustration)
    switch (activityLevel) {
        case "sedentary":
            return 1.2;
        case "lightlyActive":
            return 1.375;
        case "moderatelyActive":
            return 1.55;
        case "veryActive":
            return 1.725;
        default:
            return 1.2;
    }
}