type MockResponseOptions = {
  status?: number;
  ok?: boolean;
};

export const createMockResponse = (
  data: unknown,
  { status = 200, ok = status >= 200 && status < 300 }: MockResponseOptions = {}
) => {
  return new Response(JSON.stringify(data), {
    status,
    statusText: ok ? 'OK' : 'Error',
    headers: { 'Content-Type': 'application/json' },
  });
};
