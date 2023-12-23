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
    var resultText = name + " BMI is: " + bmi + " kg/m2\n\n";
    resultText += "BMI Range: " + bmiRange + "\n\n";
    resultText += "Your calories are: " + calories.toFixed(0) + " kcal/day \n\n";


    document.getElementById("result").innerText = resultText;

    var cardElement = document.createElement('div');
    cardElement.className = 'col';
    cardElement.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-center mb-2">Are you Satisfied with your BMI?</h5>
               
                <div class="d-flex justify-content-around align-items-center mt-2 mb-3">
                    <div><a href="index.html" class="btn custom-button-bg text-white py-3">Yes (Back to Home)</a></div>
                    <div><a href="dietFood.html" class="btn custom-button-bg text-white">Custom food recommendation <br> <span class="small-font">based on you expected BMI</span> </a></div>
                </div>
            </div>
        </div>
    `;

    // Append the card to the container
    var cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = ''; // Clear previous results
    cardContainer.appendChild(cardElement);



    // Get values from the form



    // Fetch the JSON data (assuming your JSON file is named 'diet_data.json')
    fetch('/diet/dietFoods.json')
        .then(response => response.json())
        .then(data => displayDietRecommendations(data, bmi, age, gender))
        .catch(error => console.error('Error fetching data:', error));

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



function displayDietRecommendations(data, bmi, age, gender) {
    // Filter data based on user input
    const userDietData = data.filter(item =>
        bmi >= item.bmiValue.min && bmi <= item.bmiValue.max &&
        age >= item.age.min && age <= item.age.max &&
        gender === item.gender
    );

    // Display diet recommendations in the specified HTML format
    const dietFoodRecElement = document.getElementById('dietFoodRec');
    dietFoodRecElement.innerHTML = ''; // Clear previous recommendations

    userDietData.forEach(item => {
        const mealTypes = ['breakfast', 'lunch', 'snacks', 'dinner'];

        mealTypes.forEach(mealType => {
            const mealData = item.meals[mealType];

            // Get an image URL based on the meal type (replace these with your actual image URLs)
            const imageUrl = getImageUrlForMealType(mealType);

            const cardElement = document.createElement('div');
            cardElement.className = 'col';
            cardElement.innerHTML = `
            

                <div class="card">
                    <img src="${imageUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center">${mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h5>
                        ${mealData.map((food, index) => `
                            <div class="">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <p><span class="fw-bold">${index + 1}.</span> ${food.food}</p>
                                        <p><span class="fw-bold">Calories :</span> ${food.calories}</p>
                                    </li>
                                </ul>
                                <hr>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            dietFoodRecElement.appendChild(cardElement);
        });
    });



    // Function to get image URL based on meal type
    function getImageUrlForMealType(mealType) {
        // Add logic to return the image URL based on the meal type
        // Replace these URLs with your actual image URLs
        if (mealType === 'breakfast') {
            return 'https://img.freepik.com/free-photo/english-breakfast-fried-eggs-sausages-zucchini-sweet-peppers_2829-19900.jpg?w=740&t=st=1703239168~exp=1703239768~hmac=b160fb156683a582252e297a99efa411a03aa928d94dccfe757bc0e9ce6098bd';
        } else if (mealType === 'lunch') {
            return 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?w=740&t=st=1703239242~exp=1703239842~hmac=9fd1eb115ccf13de65bb3d89501143c006b5c00b1f308f75e6ccced583f42754';
        } else if (mealType === 'snacks') {
            return 'https://img.freepik.com/free-photo/pretzels-chips-crackers-popcorn-bowls_114579-6490.jpg?w=740&t=st=1703239331~exp=1703239931~hmac=1eff8fdffc0d1caa4b41b4e1f353caebe7c0ba32d7c1e3a3e57c21402e61e373';
        } else if (mealType === 'dinner') {
            return 'https://img.freepik.com/free-photo/roasted-pork-steak-vegetables-plate_1150-45293.jpg?w=740&t=st=1703239530~exp=1703240130~hmac=1856fc9633b36c16dd59753fc9afc488f4da01c78d917222e6cc4ca94f2524c6';
        } else {
            // Default image URL if no match is found
            return 'https://img.freepik.com/free-photo/front-view-cooked-rice-with-dough-slices-dark-surface-dish-meal-dark-food-photo_140725-81864.jpg?w=740&t=st=1703233990~exp=1703234590~hmac=62a5d60a4b260b9f6fd6456bb5b96e3ac8c6460b1785638ca99cd9e418db377d';
        }
    }

}