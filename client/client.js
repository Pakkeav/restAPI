// Import required modules
const axios = require('axios');

const yargs = require('yargs');

// Set up the command-line interface (CLI) using yargs
const argv = yargs
  .command('create', 'Create a new issue', {
    title: {
      describe: 'Title of the issue',
      demand: true, // The title is required for creating an issue
      alias: 't', // Short alias for the title option
    },
    description: {
      describe: 'Description of the issue',
      demand: true, // The description is required for creating an issue
      alias: 'd', // Short alias for the description option
    },
  })
  .command('read', 'Read an issue by ID', {
    id: {
      describe: 'ID of the issue to read',
      demand: true, // The ID is required for reading an issue
      alias: 'i', // Short alias for the ID option
    },
  })
  .command('update', 'Update an issue by ID', {
    id: {
      describe: 'ID of the issue to update',
      demand: true, // The ID is required for updating an issue
      alias: 'i', // Short alias for the ID option
    },
    title: {
      describe: 'New title for the issue',
      alias: 't', // Short alias for the title option
    },
    description: {
      describe: 'New description for the issue',
      alias: 'd', // Short alias for the description option
    },
  })
  .command('delete', 'Delete an issue by ID', {
    id: {
      describe: 'ID of the issue to delete',
      demand: true, // The ID is required for deleting an issue
      alias: 'i', // Short alias for the ID option
    },
  })
  .help() // Show help message for available commands
  .argv;


// Define the base URL for the API server
const baseURL = 'http://localhost:3000/api/issues';

// Define functions for Create, Read, Update, and Delete operations
const createIssue = async (title, description) => {
  try {
    const response = await axios.post(baseURL, { title, description });
    console.log('Issue created:', response.data);
  } catch (error) {
    console.error('Error creating issue:', error.message);
  }
};

const readIssue = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/${id}`);
    console.log('Issue read:', response.data);
  } catch (error) {
    console.error('Error reading issue:', error.message);
  }
};

const updateIssue = async (id, title, description) => {
  try {
    const response = await axios.put(`${baseURL}/${id}`, { title, description });
    console.log('Issue updated:', response.data);
  } catch (error) {
    console.error('Error updating issue:', error.message);
  }
};

const deleteIssue = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    console.log('Issue deleted:', response.data);
  } catch (error) {
    console.error('Error deleting issue:', error.message);
  }
};

// Determine the command specified in the CLI and execute the corresponding function
const command = argv._[0];

switch (command) {
  case 'create':
    createIssue(argv.title, argv.description);
    break;
  case 'read':
    readIssue(argv.id);
    break;
  case 'update':
    updateIssue(argv.id, argv.title, argv.description);
    break;
  case 'delete':
    deleteIssue(argv.id);
    break;
  default:
    console.log('Invalid command. Use --help for usage information.');
}