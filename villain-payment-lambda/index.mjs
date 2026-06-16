import Stripe from "stripe";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const dynamo = new DynamoDBClient({ region: "us-east-2" });
const ses = new SESClient({ region: "us-east-2" });

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Requested-With",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS_HEADERS, body: "" };
  }

  try {
    const body = JSON.parse(event.body);
    const { amount, currency = "usd", items, shipping } = body;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: {
        items: JSON.stringify(items),
      },
    });

    // Save order to DynamoDB
    await dynamo.send(
      new PutItemCommand({
        TableName: "villain-orders",
        Item: {
          orderId: { S: paymentIntent.id },
          status: { S: "pending" },
          amount: { N: amount.toString() },
          currency: { S: currency },
          items: { S: JSON.stringify(items) },
          shipping: { S: JSON.stringify(shipping || {}) },
          createdAt: { S: new Date().toISOString() },
        },
      }),
    );

    // Build items list for email
    const itemsList = items
      .map(
        (item) =>
          `${item.name} — Size: ${item.size} x${item.quantity} — $${(parseFloat(item.price) * item.quantity).toFixed(2)}`,
      )
      .join("\n");

    // Send confirmation email to customer
    if (shipping?.email) {
      await ses.send(
        new SendEmailCommand({
          Source: "ashanticocroft23@gmail.com",
          Destination: {
            ToAddresses: [shipping.email],
          },
          Message: {
            Subject: {
              Data: "Your Villain Culture Order is Confirmed 🖤",
            },
            Body: {
              Text: {
                Data: `
VILLAIN CULTURE
ORDER CONFIRMED

Hey ${shipping.name},

Your order has been received and is being processed.

ORDER ID: ${paymentIntent.id}

ITEMS ORDERED:
${itemsList}

TOTAL: $${amount.toFixed(2)}

SHIPPING TO:
${shipping.name}
${shipping.address}
${shipping.city}, ${shipping.state} ${shipping.zip}

WHAT HAPPENS NEXT:
- Your order will be processed within 1-2 business days
- Shipping takes 3-5 business days
- You will receive a tracking number via email

Thank you for being part of Villain World.
Built for the ones who never fit.

VILLAIN CULTURE
vllnculture.com
              `,
              },
            },
          },
        }),
      );
    }

    // Send notification email to you
    await ses.send(
      new SendEmailCommand({
        Source: "ashanticocroft23@gmail.com",
        Destination: {
          ToAddresses: ["ashanticocroft23@gmail.com"],
        },
        Message: {
          Subject: {
            Data: "🔥 New Villain Culture Order!",
          },
          Body: {
            Text: {
              Data: `
New order on vllnculture.com!

ORDER ID: ${paymentIntent.id}
AMOUNT: $${amount.toFixed(2)}

CUSTOMER:
${shipping?.name || "Unknown"}
${shipping?.email || "Unknown"}
${shipping?.address || ""}
${shipping?.city || ""}, ${shipping?.state || ""} ${shipping?.zip || ""}

ITEMS:
${itemsList}

Time: ${new Date().toLocaleString()}
            `,
            },
          },
        },
      }),
    );

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        orderId: paymentIntent.id,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
