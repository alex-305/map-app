export async function post(url: string, payload?: any, headers?: any): Promise<any> {
  // we have to manually put the csrf token in the request
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
      'X-CSRF-TOKEN': csrfToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload || {})
  })
  const data = await res.json()

  let errors: {
    message?: string
  } | undefined

  if (!res.ok)
    errors = { message: data.message }

  return { data, errors }
}

export async function get(url: string, headers?: any): Promise<any> {
  // we have to manually put the csrf token in the request
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const res = await fetch(url, {
    method: 'get',
    headers: {
      ...headers,
      'X-CSRF-TOKEN': csrfToken,
      'Accept': 'application/json',
    },
  })
  const data = await res.json()

  let errors: {
    message?: string
  } | undefined

  if (!res.ok)
    errors = { message: data.message }

  return { data, errors }
}
