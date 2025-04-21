import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Title, TextInput, Textarea, NumberInput, Select, MultiSelect, Button, Group, Paper, Divider, FileInput, Text, ActionIcon, SimpleGrid, Switch } from '@mantine/core';
import { IconArrowLeft, IconUpload, IconTrash, IconPlus } from '@tabler/icons-react';
import Header from '../components/Header';

function CreateRecipePage() {
  const navigate = useNavigate();

  // Recipe details state
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [servings, setServings] = useState(4);
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(30);
  const [difficulty, setDifficulty] = useState('Medium');
  const [cuisine, setCuisine] = useState('');
  const [tags, setTags] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  // Ingredients state
  const [ingredients, setIngredients] = useState([{ id: 1, name: '', amount: '', unit: '' }]);

  // Instructions state
  const [steps, setSteps] = useState([{ id: 1, description: '', image: null }]);

  // Recipe notes
  const [notes, setNotes] = useState('');

  // Nutrition information
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  // Privacy settings
  const [isPublic, setIsPublic] = useState(true);

  const difficultyOptions = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' }
  ];

  const cuisineOptions = [
    { value: 'Italian', label: 'Italian' },
    { value: 'Mexican', label: 'Mexican' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Indian', label: 'Indian' },
    { value: 'French', label: 'French' },
    { value: 'Thai', label: 'Thai' },
    { value: 'Mediterranean', label: 'Mediterranean' },
    { value: 'American', label: 'American' },
    { value: 'Other', label: 'Other' }
  ];

  const unitOptions = [
    { value: 'g', label: 'grams (g)' },
    { value: 'kg', label: 'kilograms (kg)' },
    { value: 'ml', label: 'milliliters (ml)' },
    { value: 'l', label: 'liters (l)' },
    { value: 'tsp', label: 'teaspoons (tsp)' },
    { value: 'tbsp', label: 'tablespoons (tbsp)' },
    { value: 'cup', label: 'cups' },
    { value: 'oz', label: 'ounces (oz)' },
    { value: 'lb', label: 'pounds (lb)' },
    { value: 'pinch', label: 'pinch' },
    { value: 'piece', label: 'piece(s)' },
    { value: '', label: 'none' }
  ];

  const tagOptions = [
    { value: 'Vegetarian', label: 'Vegetarian' },
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Gluten-Free', label: 'Gluten-Free' },
    { value: 'Dairy-Free', label: 'Dairy-Free' },
    { value: 'Low-Carb', label: 'Low-Carb' },
    { value: 'Keto', label: 'Keto' },
    { value: 'Paleo', label: 'Paleo' },
    { value: 'High-Protein', label: 'High-Protein' },
    { value: 'Low-Fat', label: 'Low-Fat' },
    { value: 'Quick', label: 'Quick' },
    { value: 'Budget', label: 'Budget' },
    { value: 'Kid-Friendly', label: 'Kid-Friendly' },
    { value: 'Dessert', label: 'Dessert' },
    { value: 'Breakfast', label: 'Breakfast' },
    { value: 'Lunch', label: 'Lunch' },
    { value: 'Dinner', label: 'Dinner' },
    { value: 'Snack', label: 'Snack' },
    { value: 'Appetizer', label: 'Appetizer' },
    { value: 'Side Dish', label: 'Side Dish' },
    { value: 'Main Course', label: 'Main Course' }
  ];

  // Handler functions
  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page in history
  };

  const addIngredient = () => {
    const newId = ingredients.length > 0 ? Math.max(...ingredients.map(i => i.id)) + 1 : 1;
    setIngredients([...ingredients, { id: newId, name: '', amount: '', unit: '' }]);
  };

  const removeIngredient = (id) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
    }
  };

  const updateIngredient = (id, field, value) => {
    setIngredients(ingredients.map(ingredient =>
      ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
    ));
  };

  const addStep = () => {
    const newId = steps.length > 0 ? Math.max(...steps.map(s => s.id)) + 1 : 1;
    setSteps([...steps, { id: newId, description: '', image: null }]);
  };

  const removeStep = (id) => {
    if (steps.length > 1) {
      setSteps(steps.filter(step => step.id !== id));
    }
  };

  const updateStep = (id, field, value) => {
    setSteps(steps.map(step =>
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!recipeTitle) {
      alert('Please enter a recipe title');
      return;
    }

    if (!recipeDescription) {
      alert('Please enter a recipe description');
      return;
    }

    if (ingredients.some(ingredient => !ingredient.name)) {
      alert('Please fill in all ingredient names');
      return;
    }

    if (steps.some(step => !step.description)) {
      alert('Please fill in all instruction steps');
      return;
    }

    // In a real app, you would submit the form data to a server
    // For this example, we'll just log it and navigate to the home page
    console.log({
      title: recipeTitle,
      description: recipeDescription,
      servings,
      prepTime,
      cookTime,
      difficulty,
      cuisine,
      tags,
      mainImage,
      ingredients,
      steps,
      notes,
      nutrition: {
        calories,
        protein,
        carbs,
        fat
      },
      isPublic
    });

    // Navigate to home page after submission
    navigate('/');
  };

  return (
    <Box>
      <Header />
      {/* Back Button */}
      <Button
        leftSection={<IconArrowLeft size={16} />}
        variant="subtle"
        color="gray"
        onClick={handleGoBack}
        mb="md"
      >
        Back
      </Button>
      <Box p="xl">
        <Paper shadow="md" p="xl" withBorder>
          <Title order={1} mb="lg">Create New Recipe</Title>

          <form onSubmit={handleSubmit}>
            {/* Basic Recipe Information */}
            <Title order={3} mb="md">Recipe Details</Title>

            <TextInput
              label="Recipe Title"
              placeholder="Enter a descriptive title"
              value={recipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
              required
              mb="md"
            />

            <Textarea
              label="Description"
              placeholder="Describe your recipe briefly"
              minRows={3}
              value={recipeDescription}
              onChange={(e) => setRecipeDescription(e.target.value)}
              required
              mb="md"
            />

            <Group grow mb="md">
              <NumberInput
                label="Servings"
                placeholder="Number of servings"
                value={servings}
                onChange={(val) => setServings(val)}
                min={1}
                max={50}
              />

              <NumberInput
                label="Prep Time (minutes)"
                placeholder="Preparation time"
                value={prepTime}
                onChange={(val) => setPrepTime(val)}
                min={0}
                max={300}
              />

              <NumberInput
                label="Cook Time (minutes)"
                placeholder="Cooking time"
                value={cookTime}
                onChange={(val) => setCookTime(val)}
                min={0}
                max={300}
              />
            </Group>

            <Group grow mb="md">
              <Select
                label="Difficulty"
                placeholder="Select difficulty level"
                data={difficultyOptions}
                value={difficulty}
                onChange={setDifficulty}
              />

              <Select
                label="Cuisine"
                placeholder="Select cuisine type"
                data={cuisineOptions}
                value={cuisine}
                onChange={setCuisine}
                searchable
              />
            </Group>

            <MultiSelect
              label="Tags"
              placeholder="Select tags for your recipe"
              data={tagOptions}
              value={tags}
              onChange={setTags}
              searchable
              mb="md"
            />

            <FileInput
              label="Main Recipe Image"
              placeholder="Upload a photo of your finished dish"
              accept="image/*"
              value={mainImage}
              onChange={setMainImage}
              icon={<IconUpload size={14} />}
              mb="xl"
            />

            <Divider my="xl" />

            {/* Ingredients Section */}
            <Title order={3} mb="md">Ingredients</Title>

            {ingredients.map((ingredient, index) => (
              <Group key={ingredient.id} mb="md" align="flex-end">
                <TextInput
                  label={index === 0 ? "Ingredient" : ""}
                  placeholder="e.g. Onion, Chicken breast"
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                  required
                  style={{ flex: 2 }}
                />

                <TextInput
                  label={index === 0 ? "Amount" : ""}
                  placeholder="e.g. 2, 1/2"
                  value={ingredient.amount}
                  onChange={(e) => updateIngredient(ingredient.id, 'amount', e.target.value)}
                  style={{ flex: 1 }}
                />

                <Select
                  label={index === 0 ? "Unit" : ""}
                  placeholder="Select unit"
                  data={unitOptions}
                  value={ingredient.unit}
                  onChange={(value) => updateIngredient(ingredient.id, 'unit', value)}
                  style={{ flex: 1 }}
                  searchable
                />

                <ActionIcon
                  color="red"
                  onClick={() => removeIngredient(ingredient.id)}
                  disabled={ingredients.length === 1}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ))}

            <Button
              leftSection={<IconPlus size={14} />}
              variant="outline"
              onClick={addIngredient}
              mb="xl"
            >
              Add Ingredient
            </Button>

            <Divider my="xl" />

            {/* Instructions Section */}
            <Title order={3} mb="md">Instructions</Title>

            {steps.map((step, index) => (
              <Box key={step.id} mb="lg">
                <Group mb="xs" position="apart">
                  <Text fw={500}>Step {index + 1}</Text>

                  <ActionIcon
                    color="red"
                    onClick={() => removeStep(step.id)}
                    disabled={steps.length === 1}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>

                <Textarea
                  placeholder="Describe this step"
                  minRows={2}
                  value={step.description}
                  onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                  required
                  mb="md"
                />

                <FileInput
                  placeholder="Add photo for this step (optional)"
                  accept="image/*"
                  value={step.image}
                  onChange={(file) => updateStep(step.id, 'image', file)}
                  icon={<IconUpload size={14} />}
                />
              </Box>
            ))}

            <Button
              leftSection={<IconPlus size={14} />}
              variant="outline"
              onClick={addStep}
              mb="xl"
            >
              Add Step
            </Button>

            <Divider my="xl" />

            {/* Additional Information */}
            <Title order={3} mb="md">Additional Information</Title>

            <Textarea
              label="Recipe Notes (Optional)"
              placeholder="Add any tips, variations, or additional notes"
              minRows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              mb="xl"
            />

            <Title order={4} mb="md">Nutrition Information (Optional)</Title>

            <SimpleGrid cols={4} mb="xl">
              <TextInput
                label="Calories"
                placeholder="e.g. 250"
                rightSection="kcal"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />

              <TextInput
                label="Protein"
                placeholder="e.g. 15"
                rightSection="g"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />

              <TextInput
                label="Carbohydrates"
                placeholder="e.g. 30"
                rightSection="g"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />

              <TextInput
                label="Fat"
                placeholder="e.g. 10"
                rightSection="g"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
              />
            </SimpleGrid>

            <Divider my="xl" />

            {/* Privacy Settings */}
            <Title order={3} mb="md">Privacy Settings</Title>

            <Group mb="xl">
              <Switch
                label="Make this recipe public"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
            </Group>

            {/* Submit Buttons */}
            <Group position="right" mt="xl">
              <Button variant="outline" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button type="submit" color="orange">
                Publish Recipe
              </Button>
            </Group>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}

export default CreateRecipePage;