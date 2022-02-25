import Shopify, { IOrderLineItem, OrderFulfillmentStatus } from "shopify-api-node";

export interface ShopifyOrderOutputData {
    orderId: number;    
    firstName: string;
    lastName: string;
    email: string;
    numItems: number;
    orderDate: Date;
    bundleId: string;
    fulfillmentStatus: OrderFulfillmentStatus;
}

/** The ShopifyOrders class handles all operations related to orders with the ShopifyAPI. */
export class ShopifyOrders {    
    constructor(private shopifyLib: Shopify) {                        
        shopifyLib
    }

    /** Loads and calculates the total number of all the shopify order line items from a specific month
    * and year and returns the value.
    * @param month The month of the orders to calculate
    * @param year The year of the orders to calculate
    * @returns The total number of orders for the month **/
    public calculateTotalShopifyOrderLineItemsByDate = async (month: number, year: number): Promise<number | undefined> => {
        try {
            const dateRange = { 
                startDate: new Date(year, month, 1).toISOString(),
                endDate: new Date(year, month + 1, 0, 11, 59, 59).toISOString()
            };

            const orders = await this.shopifyLib.order.list(            
                { created_at_min: dateRange.startDate, created_at_max: dateRange.endDate, status: 'any' });

            return orders.reduce((numLineItems, order) => {
                return numLineItems + order.line_items.length}, 0);            
        }
        catch (ex) {
            console.log(`Error in calculateTotalShopifyOrderLineItemsByDate function\r\n: ${ex}`);

            //TODO: Add logging code if neccessary. 

            return undefined;
        }
    }

    /** Loads all the orders into an object formatted for output from a specific date range with the
     *  specified SKU.
     * @param SKU SKU of orders
     * @param startDate Starting date of orders to load
     * @param endDate Ending date of orders to load
     * @returns A list of all orders in output format */
    public loadOrdersContainingSKU = async (SKU: string, startDate: Date, endDate: Date): Promise<ShopifyOrderOutputData[]> => {
        try {            
            const orders = await this.shopifyLib.order.list(            
                { created_at_min: startDate.toISOString(), created_at_max: endDate.toISOString(),
                status: 'any' });        
            
            const ordersBySku: ShopifyOrderOutputData[] = [];           
            
            orders.forEach(o => {                
                if(o.line_items.some(li => li.sku === SKU)) {                
                    const orderData: ShopifyOrderOutputData = {
                        orderId: o.id,                        
                        firstName: o.customer?.first_name ?? '',
                        lastName: o.customer?.last_name ?? '',
                        email: o.customer?.email ?? '',
                        numItems: o.line_items.length,
                        orderDate: new Date(o.created_at),
                        bundleId: this.getBundleId(o.line_items) ?? '',
                        fulfillmentStatus: o.fulfillment_status,                    
                    };

                    ordersBySku.push(orderData);
                }                
            });            

            return ordersBySku;
        }
        catch(ex) {
            console.log(`Error in loadOrdersBySku function\r\n: ${ex}`);

            //TODO: Add logging code if neccessary. 

            return [];
        }
    }

     /** Retrieves the BundleID for the order embedded in the properties object of the line items of
     * the order.  BundleID may be stored in bundle_id or parent_bundle_id field of the line item.
     * BundleID is the same for all line items in the order, so first bundleId discovered will be 
     * extracted for perfomrance optimization.
     */
      private getBundleId = (lineItems: IOrderLineItem[]): string | undefined => {
        let bundleId: string | undefined;
        
        lineItems.some(li => { li.properties.every((p) => { 
                if (p.name === 'bundle_id' || p.name === 'parent_bundle_id') {
                    bundleId = p.value;        
                    return false;
                }
                
                return true;
            });
        });
        
        return bundleId;
    }

    /** Not Used: GraphQL method is complex.  I do not have time to learn Shopify GraphQL API, but 
     * it may be a faster and more direct solution.
     */
    /*
    public loadOrdersBySKU_GraphQL = async (SKU: string, startDate: Date, endDate: Date): Promise<string[]> => {
        // const orders = await this.shopifyLib.order.list(            
        //     { created_at_min: startDate.toISOString(), created_at_max: endDate.toISOString(),
        //       status: 'any' });

        // NOTE: If there is a way to query the sku of the line items through GraphQLAPI query this would lead to optimized
        // performant solution.
        const query = `{
            orders(first:50, query: "created_at:>=${startDate.toISOString()} created_at:<=${endDate.toISOString()} line_items.sku:'${SKU}'") {
              edges {
                node {
                  id
                  name
                  createdAt                                    
                  lineItems (first: 10) {
                    edges {
                        node {
                            id
                            name
                            sku
                            vendor
                        }
                    }
                }
                }                
              }              
            }            
          }`

        const orders = await this.shopifyLib.graphql(query)

        return [];
    }*/
}