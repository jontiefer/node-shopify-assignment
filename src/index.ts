import Shopify from 'shopify-api-node'

const main = async () => {
  const { SHOP, API_KEY, PASSWORD } = process.env

  const shopify = new Shopify({
    shopName: SHOP,
    apiKey: API_KEY,
    password: PASSWORD,
  })

  const orders = await shopify.order.list({ created_at_min: 'Sep 1 2021', status: 'any' })
  let totalNumLineItems = orders[0].line_items.length

  console.log({ totalNumLineItems })
}

main()
