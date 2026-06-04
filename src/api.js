const BASE_URL = "https://52m6m73pkj.execute-api.us-east-2.amazonaws.com/prod";

export const submitWaitlist = async (data) => {
  const response = await fetch(`${BASE_URL}/waitlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const submitContact = async (data) => {
  const response = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};
