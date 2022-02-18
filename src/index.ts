import Shopify from 'shopify-api-node'
import * as dotenv from 'dotenv';
import { ShopifyOrders } from './shopify-orders';
import { CSVGenerator } from './csv-generator';

dotenv.config();

const main = async () => {  
  const { SHOP, API_KEY, PASSWORD } = process.env;

  const shopify = new Shopify({
    shopName: SHOP!,
    apiKey: API_KEY!,
    password: PASSWORD!,
  })
  
  const shopifyOrders = new ShopifyOrders(shopify);
  
  const totalNumLineItems = await shopifyOrders.calculateTotalShopifyOrderLineItemsByDate(8, 2021);
  console.log({ totalNumLineItems })

  // Retrieves all the orders from the last year filtered by specific SKU.
  const endDate = new Date();
  const startDate = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDay());
  const ordersList = await shopifyOrders.loadOrdersContainingSKU('810007181677',
     startDate, endDate);

  //Converts the orders from the javascript object into CSV array.
  const ordersListCSV = CSVGenerator.generateCSVArrayFromObjectArray(ordersList);

  //Outputs CSV array of orders from the last year of specified SKU.
  console.log(ordersListCSV);
}

main()
