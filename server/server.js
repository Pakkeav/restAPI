// Import the required modules
const express = require('express');

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Define the port for your server to listen on
const port = process.env.PORT || 3000; 

// Define an array to store issues 
const issues = [];

// POST endpoint for creating a new issue
app.post('/api/issues', (req, res) => {
  try {
    // Parse the request body to extract title and description
    const { title, description } = req.body;

    // Generate a unique ID for the new issue 
    const id = getLargestIdAndIncrement(issues);

    // Create a new issue object
    const newIssue = { id, title, description };

    // Push the new issue to the array
    issues.push(newIssue);

    // Send a success response with the newly created issue
    res.status(201).json(newIssue);
  } catch (error) {
    // Handle any errors and send an error response
    console.error('Error creating issue:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Define an API endpoint for reading an issue by ID
app.get('/api/issues/:id', (req, res) => {
    const { id } = req.params;
    const issueId = parseInt(id);

    // Find the issue in the array by its ID
    const issue = issues.find((issue) => issue.id === issueId);

    if (issue) {
        res.json(issue); // Return the found issue as JSON response
    } else {
        res.status(404).json({ message: 'Issue not found' }); // Issue with the specified ID was not found
    }
});
  

// PUT endpoint for updating an issue by ID
app.put('/api/issues/:id', (req, res) => {
  try {
    // Parse the request body to extract updated title and description
    const { title, description } = req.body;

    // Find the issue in the array by its ID
    const issueId = parseInt(req.params.id);
    const existingIssue = issues.find((issue) => issue.id === issueId);

    if (!existingIssue) {
      // If the issue with the specified ID doesn't exist, send a not found response
      res.status(404).json({ message: 'Issue not found' });
      return;
    }

    // Update the title and description of the existing issue
    existingIssue.title = title;
    existingIssue.description = description;

    // Send a success response with the updated issue
    res.json(existingIssue);
  } catch (error) {
    // Handle any errors and send an error response
    console.error('Error updating issue:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE endpoint for deleting an issue by ID
app.delete('/api/issues/:id', (req, res) => {
  try {
    // Find the issue in the array by its ID
    const issueId = parseInt(req.params.id);
    const existingIssueIndex = issues.findIndex((issue) => issue.id === issueId);

    if (existingIssueIndex === -1) {
      // If the issue with the specified ID doesn't exist, send a not found response
      res.status(404).json({ message: 'Issue not found' });
      return;
    }

    // Remove the issue from the array using splice
    issues.splice(existingIssueIndex, 1);

    // Send a success response with a message indicating the issue was deleted
    res.json({ message: 'Issue deleted' });
  } catch (error) {
    // Handle any errors and send an error response
    console.error('Error deleting issue:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Function to get the largest ID from the issues array and add 1
function getLargestIdAndIncrement(issues) {
    const largestId = issues.reduce((maxId, issue) => {
      return issue.id > maxId ? issue.id : maxId;
    }, 0); // Start with an initial maxId of 0
  
    return largestId + 1; // Add 1 to the largest ID
  }


// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});