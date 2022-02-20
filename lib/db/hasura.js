export async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDU1NmM5YjExOGVEQTA1QURhNjI2NDZiRTJiYzY4ODg2ZDE5NTczNTEiLCJwdWJsaWNBZGRyZXNzIjoiMHg1NTZjOWIxMThlREEwNUFEYTYyNjQ2YkUyYmM2ODg4NmQxOTU3MzUxIiwiZW1haWwiOiJrZW5zdWtlc2hpYmF0YUBnbWFpbC5jb20iLCJvYXV0aFByb3ZpZGVyIjpudWxsLCJwaG9uZU51bWJlciI6bnVsbCwiaWF0IjoxNjQ1MzM4MTgwLCJleHAiOjE2NDU5NDI5ODAsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiJkaWQ6ZXRocjoweDU1NmM5YjExOGVEQTA1QURhNjI2NDZiRTJiYzY4ODg2ZDE5NTczNTEifX0.gQj_dezyVsbfF04Ag9I1D77HH92cO5zKXFVXdMCvvT0",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}