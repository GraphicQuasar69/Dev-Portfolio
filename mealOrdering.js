

    // Function to make a GET request to the MealDB API
    async function fetchMealsByIngredient(ingredient) {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.meals; // Array of meals
      } catch (error) {
        console.error('Error fetching meals:', error);
        return null;
      }
    }

    // Function to display a prompt and get user input
    function getUserInput(message) {
      return prompt(message);
    }

    // Function to generate a random index within the range of array length
    function getRandomIndex(array) {
      return Math.floor(Math.random() * array.length);
    }

    // Function to handle ordering process
    async function placeOrder() {
      // Step 1: Taking Orders
      const mainIngredient = getUserInput('Enter main ingredient:');
      const meals = await fetchMealsByIngredient(mainIngredient.toLowerCase().replace(' ', '_'));
      
      if (!meals) {
        alert('No meals found for the given ingredient. Please try again.');
        return;
      }

      const randomMeal = meals[getRandomIndex(meals)];
      const order = {
        description: randomMeal.strMeal,
        orderNumber: sessionStorage.getItem('lastOrderNumber') ? 
                      parseInt(sessionStorage.getItem('lastOrderNumber')) + 1 : 1,
        completionStatus: 'incomplete'
      };

      // Step 2: Storing Orders
      let orders = sessionStorage.getItem('orders') ? JSON.parse(sessionStorage.getItem('orders')) : [];
      orders.push(order);
      sessionStorage.setItem('orders', JSON.stringify(orders));
      sessionStorage.setItem('lastOrderNumber', order.orderNumber);

      // Step 3: Displaying and Completing Orders
      const incompleteOrders = orders.filter(order => order.completionStatus === 'incomplete');
      const incompleteOrderNumbers = incompleteOrders.map(order => order.orderNumber).join(', ');

      if (incompleteOrders.length === 0) {
        alert('No incomplete orders.');
        return;
      }

      const orderToComplete = getUserInput(`Incomplete orders: ${incompleteOrderNumbers}. Enter order number to mark as complete:`);
      const orderIndex = incompleteOrders.findIndex(order => order.orderNumber === parseInt(orderToComplete));

      if (orderIndex === -1) {
        alert('Invalid order number.');
        return;
      }

      orders[orderIndex].completionStatus = 'completed';
      sessionStorage.setItem('orders', JSON.stringify(orders));
      alert(`Order ${orderToComplete} marked as complete.`);
    }

    // Initialize the app
    placeOrder();

