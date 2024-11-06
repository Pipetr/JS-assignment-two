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
      if (this.ingredients.banana > 0) return "images/banana-smoothie.jpg";
      if (this.ingredients.strawberry > 0) return "images/strawberry-smoothie.jpg";
      if (this.ingredients.mango > 0) return "images/mango-smoothie.jpg";
      if (this.ingredients.spinach > 0) return "images/spinach-smoothie.jpg";
      if (this.ingredients.blueberry > 0) return "images/blueberry-smoothie.jpg";
      return "images/default-smoothie.jpg";
    }
  }
  
  // Order Button Event Listener
  document.getElementById('orderButton').addEventListener('click', () => {
    const size = document.getElementById('size').value;
    const sweetness = document.getElementById('sweetness').value;
    const ingredients = {
      banana: parseInt(document.querySelector('[name="banana"]').value),
      strawberry: parseInt(document.querySelector('[name="strawberry"]').value),
      mango: parseInt(document.querySelector('[name="mango"]').value),
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
  