import { useState } from "react";
import NavBar from "../NavBar";

function CreateDietPlan() {
  const [formData, setFormData] = useState({
    calories: "",
    budget: "",
    age: "",
    weight: "",
    height: "",
    dietaryPreference: "balanced",
  });

  const [dietPlan, setDietPlan] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { calories, budget, age, weight, height, dietaryPreference } =
      formData;
    let generatedPlan = {};

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Basic logic for meals based on calorie intake
    if (calories < 1500) {
      generatedPlan.meals = [
        {
          meal: "Breakfast",
          items: ["Oatmeal with fruits", "Boiled eggs", "Green tea"],
        },
        {
          meal: "Lunch",
          items: ["Grilled chicken salad", "Brown rice", "Steamed vegetables"],
        },
        {
          meal: "Dinner",
          items: ["Quinoa salad", "Roasted vegetables", "Herbal tea"],
        },
      ];
    } else if (calories >= 1500 && calories <= 2500) {
      generatedPlan.meals = [
        {
          meal: "Breakfast",
          items: [
            "Greek yogurt with granola",
            "Scrambled eggs",
            "Fruit smoothie",
          ],
        },
        {
          meal: "Lunch",
          items: [
            "Turkey sandwich",
            "Sweet potato fries",
            "Salad with olive oil dressing",
          ],
        },
        {
          meal: "Dinner",
          items: ["Grilled salmon", "Quinoa", "Sauteed spinach"],
        },
      ];
    } else {
      generatedPlan.meals = [
        {
          meal: "Breakfast",
          items: [
            "Pancakes with syrup",
            "Omelette with cheese",
            "Orange juice",
          ],
        },
        {
          meal: "Lunch",
          items: ["Pasta with marinara sauce", "Caesar salad", "Garlic bread"],
        },
        {
          meal: "Dinner",
          items: [
            "Steak with mashed potatoes",
            "Roasted broccoli",
            "Red wine (optional)",
          ],
        },
      ];
    }

    // Adjust meals for dietary preferences
    if (dietaryPreference === "vegetarian") {
      generatedPlan.meals = generatedPlan.meals.map((meal) => ({
        ...meal,
        items: meal.items.map((item) =>
          item.includes("chicken") ||
          item.includes("salmon") ||
          item.includes("turkey")
            ? item.replace(/chicken|salmon|turkey/g, "tofu")
            : item
        ),
      }));
    } else if (dietaryPreference === "vegan") {
      generatedPlan.meals = generatedPlan.meals.map((meal) => ({
        ...meal,
        items: meal.items.map((item) =>
          item.includes("eggs") ||
          item.includes("cheese") ||
          item.includes("yogurt")
            ? item.replace(/eggs|cheese|yogurt/g, "soy products")
            : item
        ),
      }));
    } else if (dietaryPreference === "low-carb") {
      generatedPlan.meals = generatedPlan.meals.map((meal) => ({
        ...meal,
        items: meal.items.map((item) =>
          item.includes("bread") ||
          item.includes("pasta") ||
          item.includes("rice")
            ? item.replace(
                /bread|pasta|rice/g,
                "cauliflower rice or zucchini noodles"
              )
            : item
        ),
      }));
    } else if (dietaryPreference === "high-protein") {
      generatedPlan.meals = generatedPlan.meals.map((meal) => ({
        ...meal,
        items: [...meal.items, "Protein shake", "Nuts"],
      }));
    }

    // Adjust meals based on BMI (e.g., adding more fiber or protein)
    if (bmi < 18.5) {
      generatedPlan.notes =
        "Your BMI is below the healthy range. Consider increasing your calorie intake and adding more protein-rich foods like nuts and beans.";
    } else if (bmi >= 25) {
      generatedPlan.notes =
        "Your BMI suggests you may benefit from a calorie-controlled diet. Try adding more fiber-rich foods like vegetables and whole grains.";
    }

    // Adjust meals for age (e.g., seniors may need softer or more nutrient-dense foods)
    if (age > 60) {
      generatedPlan.meals = generatedPlan.meals.map((meal) => ({
        ...meal,
        items: meal.items.map((item) =>
          item.includes("steak")
            ? item.replace("steak", "soft fish or tofu")
            : item
        ),
      }));
      generatedPlan.notes =
        "Based on your age, we recommend focusing on nutrient-dense meals and avoiding tough-to-digest foods.";
    }

    // Adjust meals for budget constraints
    if (budget < 50) {
      generatedPlan.meals = generatedPlan.meals.map((meal) => ({
        ...meal,
        items: meal.items.filter((item) => !["Steak", "Salmon"].includes(item)),
      }));
      generatedPlan.notes =
        "Since your budget is low, we've removed expensive items like steak and salmon.";
    } else if (budget >= 100) {
      generatedPlan.notes =
        "With your budget, you can afford premium ingredients like organic produce and lean meats.";
    }

    // Display the generated plan
    setDietPlan(generatedPlan);
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-between p-6">
        {/* Left Section: Form */}
        <div className="w-1/2 pr-4">
          <h1 className="text-2xl font-bold mb-4">Create Your Diet Plan</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md"
          >
            <div className="mb-4">
              <label className="block text-gray-700">
                Calories (kcal/day):
              </label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter daily calorie requirement"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Budget (per week):</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter your budget"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter your age"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Weight (kg):</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter your weight"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Height (cm):</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter your height"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Dietary Preference:</label>
              <select
                name="dietaryPreference"
                value={formData.dietaryPreference}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              >
                <option value="balanced">Balanced</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="low-carb">Low Carb</option>
                <option value="high-protein">High Protein</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Generate Diet Plan
            </button>
          </form>
        </div>

        {/* Right Section: Diet Plan Result */}
        <div className="w-1/2 pl-4">
          {dietPlan ? (
            <div className="bg-gray-100 p-6 rounded shadow-md">
              <h2 className="text-xl font-bold mb-4">Your Diet Plan</h2>
              {dietPlan.meals.map((meal, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-lg">{meal.meal}</h3>
                  <ul className="list-disc ml-6">
                    {meal.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 ">
              <p>Your diet plan will appear here after you generate it.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateDietPlan;
