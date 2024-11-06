// Smoothie Class with Quantity, Nutrition, and Animation
class Smoothie {
    constructor(size, ingredients, sweetness) {
        this.size = size;
        this.ingredients = ingredients; // { ingredient: quantity }
        this.sweetness = sweetness;
        this.prices = {
            size: { small: 3, medium: 5, large: 7 },
            ingredients: {
                banana: { price: 1.0, calories: 90 },
                strawberry: { price: 1.5, calories: 50 },
                mango: { price: 2.0, calories: 60 },
                spinach: { price: 1.2, calories: 20 },
                pineapple: { price: 1.5, calories: 70 },
                blueberry: { price: 1.8, calories: 80 },
            },
        };
    }

    // Calculate total cost
    calculateCost() {
        let cost = this.prices.size[this.size];
        for (const [ingredient, quantity] of Object.entries(this.ingredients)) {
            cost += this.prices.ingredients[ingredient].price * quantity;
        }
        return cost.toFixed(2);
    }

    // Generate description of the smoothie
    description() {
        let description = `You ordered a ${this.size} smoothie with `;
        const ingredientList = [];
        for (const [ingredient, quantity] of Object.entries(this.ingredients)) {
            if (quantity > 0) {
                ingredientList.push(`${quantity} ${ingredient}`);
            }
        }
        description += ingredientList.join(', ');
        description += ` and ${this.sweetness} sweetness.`;
        return description;
    }

    // Generate nutritional information based on ingredients
    calculateNutrition() {
        let totalCalories = 0;
        for (const [ingredient, quantity] of Object.entries(this.ingredients)) {
            totalCalories += this.prices.ingredients[ingredient].calories * quantity;
        }
        return `Estimated Calories: ${totalCalories} kcal`;
    }

    // Choose an image based on main ingredient
    getImage() {
        if (this.ingredients.banana > 0) return "img/banana-icon.png";
        if (this.ingredients.strawberry > 0) return "img/strawberry-icon.png";
        if (this.ingredients.mango > 0) return "img/mango-icon.png";
        if (this.ingredients.pineapple > 0) return "img/pineapple-icon.png";
        if (this.ingredients.spinach > 0) return "img/spinach-icon.png";
        if (this.ingredients.blueberry > 0) return "img/blueberry-icon.png";
    }
    // Serve the smoothie
    static serveIt(size) {
        const cupSizeDiv = document.getElementById('cup-size');
        //Generate image of smoothie cup
        const cup = document.createElement('img');
        // Set the image of the cup based on the size of the smoothie
        let cupImage;
        //set the IMG size according to Coffee size
        let cupSize;
        console.log(size);
        switch (size) {
            case 'small':
                cupSize = '100';
                cupImage = 'img/small-cup.png';
                break;
            case 'medium':
                cupSize = '125';
                cupImage = 'img/medium-cup.png';
                break;
            case 'large':
                cupSize = '150';
                cupImage = 'img/large-cup.png';
                break;
            default:
                cupImage = 'img/small-cup.png';
                cupSize = '100';
        }
        cup.setAttribute('src', cupImage);
        cup.setAttribute('height', cupSize);
        //Generate description of Coffee as IMG title
        let description = `A ${size} smoothie, ${cupSize}ml`;
        const descrElement = document.createElement('p');
        descrElement.textContent = description;
        // Append the image and description below the selec list
        cupSizeDiv.appendChild(descrElement);
        cupSizeDiv.appendChild(cup);
    }
}

// Order Button Event Listener
document.getElementById('orderButton').addEventListener('click', () => {
    // If there are no ingredients, do not proceed
    let totalIngredients = 0;
    for (const [ingredient, quantity] of Object.entries({
        banana: parseInt(document.querySelector('[name="banana"]').value),
        strawberry: parseInt(document.querySelector('[name="strawberry"]').value),
        mango: parseInt(document.querySelector('[name="mango"]').value),
        pineapple: parseInt(document.querySelector('[name="pineapple"]').value),
        spinach: parseInt(document.querySelector('[name="spinach"]').value),
        blueberry: parseInt(document.querySelector('[name="blueberry"]').value),
    })) {
        totalIngredients += quantity;
    }
    if (totalIngredients === 0) {
        alert('Please select at least one ingredient.');
        return;
    }
    const size = document.getElementById('size').value;
    const sweetness = document.getElementById('sweetness').value;
    const ingredients = {
        banana: parseInt(document.querySelector('[name="banana"]').value),
        strawberry: parseInt(document.querySelector('[name="strawberry"]').value),
        mango: parseInt(document.querySelector('[name="mango"]').value),
        pineapple: parseInt(document.querySelector('[name="pineapple"]').value),
        spinach: parseInt(document.querySelector('[name="spinach"]').value),
        blueberry: parseInt(document.querySelector('[name="blueberry"]').value),
    };

    const smoothie = new Smoothie(size, ingredients, sweetness);

    // Display order summary and cost
    document.getElementById('output').innerText = smoothie.description();
    document.getElementById('totalCost').innerText = `Total Cost: $${smoothie.calculateCost()}`;

    // Display nutrition facts
    document.getElementById('nutritionFacts').innerText = smoothie.calculateNutrition();

    // Show and animate the smoothie image
    const smoothieImage = document.getElementById('smoothieImage');
    smoothieImage.src = smoothie.getImage();
    smoothieImage.style.display = 'block';
    smoothieImage.classList.add('blending-animation'); // Add animation class
});

// put small size as default along with the image
document.getElementById('size').value = 'small';
Smoothie.serveIt('small');

// select the size of the smoothie event listener
document.getElementById('size').addEventListener('change', () => {
    let imageCreated = document.getElementById('cup-size').querySelector('img');
    let descrElement = document.getElementById('cup-size').querySelector('p');
    if (imageCreated) {
        imageCreated.remove();
    }
    if (descrElement) {
        descrElement.remove();
    }
    const size = document.getElementById('size').value;
    Smoothie.serveIt(size);
});