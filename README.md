# Job Scraper App - POC

This POC is a Node.js application scrapes job listings from a specified URL and saves them to a CSV file. It provides an API endpoint to initiate the scraping process and expects a URL to be provided in the request body.

## How to Use

### Clone the Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
cd job-scraper-app
npm install
```

### Run the Application

```bash
npm start
```

- Note: The server will start running on port 3000 by default. You can modify the port in the index.js file if needed.

## API Endpoint

### POST /scrape

Initiates the scraping process to extract job listings from the provided URL.

### Request Body

- url: The URL of the webpage containing job listings to be scraped (currently designed for scrapping from weworkremotely.com).

Example:

```bash
{
  "url": "https://weworkremotely.com/scrape"
}
```

### Response

-Success: If the scraping process is successful, a CSV file named jobs.csv will be created in the root directory of the application and a success message "CSV file created successfully" will be logged in the console.

-Error: If an error occurs during the scraping process, an appropriate error message will be returned.
