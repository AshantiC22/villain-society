import Stripe from "stripe";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const dynamo = new DynamoDBClient({ region: "us-east-2" });

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
