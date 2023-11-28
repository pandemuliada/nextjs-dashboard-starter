const { CourierClient } = require("@trycourier/courier");
const courier = CourierClient({
  authorizationToken: process.env.COURIER_PUBLISHED_API_KEY as string,
});

export async function GET(request: Request) {
  const { requestId } = await courier.send({
    message: {
      to: [
        {
          user_id: "8207a313-725d-410e-8c98-8bd95007abdf",
        },
        {
          firebaseToken:
            "cv9xTcrpmB0VsAcNfgsZ7B:APA91bHE8iewp8HmQLS2es2EuDdcR_C0C6CNtTD_GefC4f7Rdb7UG-DNAw3PPKkjTqOQvsCIhngtgO4ycC_PXK7lpC0BBmZ6vJ93TdJUC013-Cs5HzwdVHjWBMESVP2koAzmK8ioidNt",
        },
      ],
      content: {
        title: "Welcome!",
        body: "Test form courier",
        elements: [
          {
            type: "action",
            content: "Click me",
            href: "https://example.com",
          },
        ],
        version: "2020-01-01",
      },
      data: {
        name: "Pande Muliada",
      },
      routing: {
        method: "all",
        channels: ["firebase-fcm", "inbox"],
      },
      providers: {
        "firebase-fcm": {
          override: {
            body: {
              data: {
                YOUR_CUSTOM_KEY: "YOUR_CUSTOM_VALUE",
              },
              apns: {
                payload: {
                  aps: {
                    sound: "ping.aiff",
                    badge: 99,
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return new Response(JSON.stringify({ requestId }), {
    headers: { "content-type": "application/json" },
  });
}
