// Smoothie Class Definition
class Smoothie {
    constructor(size, ingredients, sweetness) {
      this.size = size;
      this.ingredients = ingredients;
      this.sweetness = sweetness;
    }
  
    description() {
      return `You ordered a ${this.size} smoothie with ${this.ingredients.join(', ')} and a sweetness level of ${this.sweetness}.`;
    }
  }
  
  // Order Button Event Listener
  document.getElementById('orderButton').addEventListener('click', () => {
    const size = document.getElementById('size').value;
    const ingredients = Array.from(document.getElementById('ingredients').selectedOptions).map(opt => opt.value);
    const sweetness = document.getElementById('sweetness').value;
  
    const smoothie = new Smoothie(size, ingredients, sweetness);
    document.getElementById('output').innerText = smoothie.description();
  });
  