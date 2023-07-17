export default defineEventHandler((e) => {
  const id = [...e.node.req.url.split('/')].pop();
  const config = useRuntimeConfig();
  return $fetch(`${config.apiBaseUrl}/movie/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`
    }
  });
});