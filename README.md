# Code Challenge

## To get started:

1. Make sure you have NodeJS and Yarn installed
1. `cp .env.example .env`
1. Fill in `.env` with correct values
1. `yarn`

## Bug fix (part A):

[This file](src/index.ts) contains a function that fetches all Shopify orders for the month of September 2021, calculates a total sum of all the orders' number of line items, and prints it.

The correct output is `{ totalNumLineItems: 31 }`.

Your goal is to make sure that:

1. `yarn dev` prints the correct output.
2. `yarn start` prints the correct output. You will encounter a separate bug with this step.

## API challenge (part B):

Create a new file that does the following:

Fetch all orders in the last four years containing a variant with SKU `HBWIPE60DTC`. Write out the results in CSV format with `Order ID, First Name, Last Name, Email, Number of items, Date of order, Bundle ID, Fulfillment Status`.

Bundle ID can be obtained within the properties of a line item on an order. The property name is `bundle_id`.

## Documentation

- [Shopify REST API](https://shopify.dev/api/admin-rest#top)


