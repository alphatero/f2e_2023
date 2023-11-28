export async function getTotals() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(`${apiUrl}/total`);

  return data.json();
}

