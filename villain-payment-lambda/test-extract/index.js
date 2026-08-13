const Stripe = require("stripe");
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const dynamo = new DynamoDBClient({ region: "us-east-2" });
const ses = new SESClient({ region: "us-east-2" });

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Requested-With",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS_HEADERS, body: "" };
  }

  try {
    const body = JSON.parse(event.body);
    console.log("Body:", JSON.stringify(body));

    const { amount, currency = "usd", items = [], shipping = {} } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { items: JSON.stringify(items) },
    });

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

    const itemsList = items
      .map(
        (item) =>
          `${item.name} — Size: ${item.size} x${item.quantity} — $${(parseFloat(item.price) * item.quantity).toFixed(2)}`,
      )
      .join("\n");

    if (shipping.email) {
      await ses.send(
        new SendEmailCommand({
          Source: "ashanticocroft23@gmail.com",
          Destination: { ToAddresses: [shipping.email] },
          Message: {
            Subject: { Data: "Your Villain Culture Order is Confirmed" },
            Body: {
              Text: {
                Data: `VILLAIN CULTURE — ORDER CONFIRMED\n\nHey ${shipping.name || "Villain"},\n\nYour order has been received!\n\nORDER ID: ${paymentIntent.id}\n\nITEMS:\n${itemsList}\n\nTOTAL: $${parseFloat(amount).toFixed(2)}\n\nSHIPPING TO:\n${shipping.name}\n${shipping.address}\n${shipping.city}, ${shipping.state} ${shipping.zip}\n\nThank you for being part of Villain World.\n\nVILLAIN CULTURE\nvllnculture.com`,
              },
            },
          },
        }),
      );
    }

    await ses.send(
      new SendEmailCommand({
        Source: "ashanticocroft23@gmail.com",
        Destination: { ToAddresses: ["ashanticocroft23@gmail.com"] },
        Message: {
          Subject: { Data: "New Villain Culture Order!" },
          Body: {
            Text: {
              Data: `New order!\n\nORDER ID: ${paymentIntent.id}\nAMOUNT: $${parseFloat(amount).toFixed(2)}\n\nCUSTOMER:\nName: ${shipping.name || "Not provided"}\nEmail: ${shipping.email || "Not provided"}\nAddress: ${shipping.address || "Not provided"}\nCity: ${shipping.city || "Not provided"}\nState: ${shipping.state || "Not provided"}\nZIP: ${shipping.zip || "Not provided"}\n\nITEMS:\n${itemsList}\n\nTime: ${new Date().toLocaleString()}`,
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
