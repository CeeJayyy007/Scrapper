const request = require("supertest");
const express = require("express");
const router = require("../scrapper");

const app = express();
app.use(express.json());
app.use("/", router);

jest.mock("axios");
jest.mock("csv-writer");

const axios = require("axios");
const { createObjectCsvWriter } = require("csv-writer");

describe("POST /scrape", () => {
  it("should return 400 if url does not include base url", async () => {
    const res = await request(app)
      .post("/scrape")
      .send({ url: "https://invalidurl.com" });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Invalid URL");
  });

  it("should return 500 if there is an error fetching job listings", async () => {
    axios.get.mockRejectedValue(new Error("Error fetching job listings"));

    const res = await request(app)
      .post("/scrape")
      .send({ url: "https://weworkremotely.com/valid-url" });

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual("An error occurred while fetching job listings.");
  });

  it("should return 200 and create CSV file if job listings are fetched successfully", async () => {
    axios.get.mockResolvedValue({ data: "<html></html>" });
    createObjectCsvWriter.mockReturnValue({
      writeRecords: jest.fn().mockResolvedValue(),
    });

    const res = await request(app)
      .post("/scrape")
      .send({ url: "https://weworkremotely.com/valid-url" });

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("CSV file created successfully.");
  });
});
