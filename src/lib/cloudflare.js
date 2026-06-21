// Cloudflare integration utilities

const CLOUDFLARE_API = 'https://api.cloudflare.com/client/v4';

export async function updateDNSRecord(zoneId, recordId, data) {
  const response = await fetch(
    `${CLOUDFLARE_API}/zones/${zoneId}/dns_records/${recordId}`,
    {
      method: 'PUT',
      headers: {
        'X-Auth-Email': import.meta.env.VITE_CLOUDFLARE_EMAIL,
        'X-Auth-Key': import.meta.env.VITE_CLOUDFLARE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
}

export async function getZoneStats(zoneId) {
  const response = await fetch(
    `${CLOUDFLARE_API}/zones/${zoneId}/analytics/dashboard`,
    {
      headers: {
        'X-Auth-Email': import.meta.env.VITE_CLOUDFLARE_EMAIL,
        'X-Auth-Key': import.meta.env.VITE_CLOUDFLARE_API_KEY,
      },
    }
  );
  return response.json();
}

export async function purgeCDNCache(zoneId) {
  const response = await fetch(
    `${CLOUDFLARE_API}/zones/${zoneId}/purge_cache`,
    {
      method: 'POST',
      headers: {
        'X-Auth-Email': import.meta.env.VITE_CLOUDFLARE_EMAIL,
        'X-Auth-Key': import.meta.env.VITE_CLOUDFLARE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ purge_everything: true }),
    }
  );
  return response.json();
}
