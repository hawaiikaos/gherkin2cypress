# gherkin2cypress
Script to create stubbed cypress file from a gherkin feature file

Usage:

`node gherkin2cypress.js somefeature.feature`

The script reads through the file and creates stubbed Given, When, Then statements that return true. And steps are outputted as Then statements. Feature and Scenario statements are outputted as comments, and tags are currently ignored. Will place the output js file in a new folder named as the feature, within the same folder as the feature file. Checks to see if the file already exists and prevents overwriting.
