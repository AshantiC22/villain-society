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
    // ── PARSE BODY ──
    const body = JSON.parse(event.body);
    console.log("Full body received:", JSON.stringify(body));

    const { amount, currency = "usd", items = [], shipping = {} } = body;
    console.log("Shipping received:", JSON.stringify(shipping));
    console.log("Amount received:", amount);

    // ── CREATE PAYMENT INTENT ──
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { items: JSON.stringify(items) },
    });

    // ── SAVE ORDER TO DYNAMODB ──
    await dynamo.send(
      new PutItemCommand({
        TableName: "villain-orders",
        Item: {
          orderId: { S: paymentIntent.id },
          status: { S: "pending" },
          amount: { N: amount.toString() },
          currency: { S: currency },
          items: { S: JSON.stringify(items) },
          shipping: { S: JSON.stringify(shipping) },
          createdAt: { S: new Date().toISOString() },
        },
      }),
    );

    // ── BUILD ITEMS LIST ──
    const itemsList = items
      .map(
        (item) =>
          `${item.name} — Size: ${item.size} x${item.quantity} — $${(parseFloat(item.price) * item.quantity).toFixed(2)}`,
      )
      .join("\n");

    // ── SEND CUSTOMER CONFIRMATION EMAIL ──
    if (shipping.email) {
      await ses.send(
        new SendEmailCommand({
          Source: "ashanticocroft23@gmail.com",
          Destination: { ToAddresses: [shipping.email] },
          Message: {
            Subject: { Data: "Your Villain Culture Order is Confirmed" },
            Body: {
              Text: {
                Data: `
VILLAIN CULTURE — ORDER CONFIRMED

Hey ${shipping.name || "Villain"},

Your order has been received and is being processed.

ORDER ID: ${paymentIntent.id}

ITEMS ORDERED:
${itemsList}

TOTAL: $${parseFloat(amount).toFixed(2)}

SHIPPING TO:
${shipping.name || ""}
${shipping.address || ""}
${shipping.city || ""}, ${shipping.state || ""} ${shipping.zip || ""}

WHAT HAPPENS NEXT:
- Order processed within 1-2 business days
- Shipping takes 3-5 business days via UPS or FedEx
- You will receive a tracking number via email

Thank you for being part of Villain World.
Built for the ones who never fit.

VILLAIN CULTURE
vllnculture.com
              `.trim(),
              },
            },
          },
        }),
      );
    }

    // ── SEND ORDER NOTIFICATION TO YOU ──
    await ses.send(
      new SendEmailCommand({
        Source: "ashanticocroft23@gmail.com",
        Destination: { ToAddresses: ["ashanticocroft23@gmail.com"] },
        Message: {
          Subject: { Data: "New Villain Culture Order!" },
          Body: {
            Text: {
              Data: `
New order on vllnculture.com!

ORDER ID: ${paymentIntent.id}
AMOUNT: $${parseFloat(amount).toFixed(2)}

CUSTOMER:
Name:    ${shipping.name || "Not provided"}
Email:   ${shipping.email || "Not provided"}
Address: ${shipping.address || "Not provided"}
City:    ${shipping.city || "Not provided"}
State:   ${shipping.state || "Not provided"}
ZIP:     ${shipping.zip || "Not provided"}

ITEMS:
${itemsList}

Time: ${new Date().toLocaleString()}
            `.trim(),
            },
          },
        },
      }),
    );

    // ── RETURN SUCCESS ──
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        orderId: paymentIntent.id,
      }),
    };
  } catch (error) {
    console.error("Lambda error:", error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
