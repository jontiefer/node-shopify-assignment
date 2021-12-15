# Code Challenge

This repo contains a function that fetches all Shopify orders for the month of September 2021, calculates a total sum of all the orders' number of line items, and prints it.

The correct output is `{ totalNumLineItems: 31 }`.

Your goal is to make sure that both `yarn dev` and `yarn start` print the correct output.

## To get started:

1. Make sure you have NodeJS and Yarn installed
1. `cp .env.example .env`
1. Fill in `.env` with correct values
1. `yarn`
1. `yarn dev`
1. `yarn start`

## Step 2:

Create a new file that does the following:

Fetch all unfulfilled orders in the last 20 days containing a variant with SKU “810007181677”. Write out the results in CSV format with `Order ID, First Name, Last Name, Email, Number of items, Date of order, Bundle ID`.

Bundle ID can be obtained within the properties of a line item on an order. The property name is `bundle_id`.

## Documentation

- [Shopify REST API](https://shopify.dev/api/admin-rest#top)


