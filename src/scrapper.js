const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");
const { createObjectCsvWriter } = require("csv-writer");

const router = express.Router();

const baseUrl = "https://weworkremotely.com/";

router.post("/scrape", async (req, res) => {
  const { url } = req.body;

  if (!url.includes(baseUrl)) {
    console.log("Invalid URL");
    return res.status(400).send("Invalid URL");
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Select the job listings section
    const jobSection = $("section.jobs");

    // Initialize CSV writer
    const csvWriter = createObjectCsvWriter({
      path: "jobs.csv",
      header: [
        { id: "title", title: "Title" },
        { id: "company", title: "Company" },
        { id: "jobLink", title: "Job Link" },
      ],
    });

    const jobs = [];

    // Iterate over each job listing and extract information
    jobSection.find("li").each((index, element) => {
      const jobElement = $(element);
      const title = jobElement.find("span.title").text();
      const company = jobElement.find("span.company").text();
      const jobLink = baseUrl + jobElement.find("a").eq(1).attr("href");

      // Push job data to array
      jobs.push({ title, company, jobLink });
    });

    // Write job data to CSV file
    await csvWriter.writeRecords(jobs);

    console.log("CSV file created successfully.");
    return res.status(200).send("CSV file created successfully.");
  } catch (error) {
    console.error("Error fetching job listings:", error);
    return res
      .status(500)
      .send("An error occurred while fetching job listings.");
  }
});

module.exports = router;
