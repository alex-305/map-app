export async function post(url: string, payload?: any, headers?: any): Promise<any> { return http_request('POST', url, headers, payload)}

export async function del(url: string, payload?: any, headers?: any): Promise<any> { return http_request('DELETE', url, headers) }

export async function get(url: string, headers?: any): Promise<any> { return http_request('GET', url, headers) }


async function http_request(req_type: string, url: string, headers_passed?: any, payload?: any): Promise<any> {
  // we have to manually put the csrf token in the request
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const headers = {
    ...headers_passed,
    'X-CSRF-TOKEN': csrfToken,
    'Accept': 'application/json'
  }

  if(req_type==='POST') {
    headers['Content-Type'] = 'application/json'
  }

  const requestOptions: RequestInit = {
    method: req_type,
    headers: headers
  }

  if(payload) {
    requestOptions['body'] = payload
  }

  const res = await fetch(url, requestOptions)


  const data = await res.json()

  let errors: {
    message?: string
  } | undefined

  const status = res.status

  if (!res.ok)
    errors = { message: data.message }

  return { data, errors, status }
}