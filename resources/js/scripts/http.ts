export type HTTPError = {
  message?: string
  status: number
}

export async function post(url: string, payload?: any, headers?: any): Promise<any> { return http_request('POST', url, headers, payload)}

export async function del(url: string, payload?: any, headers?: any): Promise<any> { return http_request('DELETE', url, headers) }

export async function get(url: string, headers?: any): Promise<any> { return http_request('GET', url, headers) }

export type HTTP_STATUS_CLASSES = "INFORMATIONAL" | "SUCCESS" | "REDIRECTION" | "CLIENT" | "ERROR"

export function http_status_type(status:number):HTTP_STATUS_CLASSES {
  if(status >=100 && status < 200) return "INFORMATIONAL"
  if(status >=200 && status < 300) return "SUCCESS"
  if(status >=300 && status < 400) return "REDIRECTION"
  if(status >=400 && status < 500) return "CLIENT"
  return "ERROR"
}

async function http_request(req_type: string, url: string, headers_passed?: any, payload?: any): 
Promise<{data: any, error: HTTPError | null, status: number}> 
{
  // we have to manually put the csrf token in the request
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

  const headers = {
    ...headers_passed,
    'X-CSRF-TOKEN': csrfToken,
    'Accept': 'application/json'
  }

  if(['POST', 'PUT', 'PATCH'].includes(req_type)) {
    headers['Content-Type'] = 'application/json'
  }

  const requestOptions: RequestInit = {
    method: req_type,
    headers
  }

  if(payload && ['POST', 'PUT', 'PATCH'].includes(req_type)) {
    requestOptions['body'] = JSON.stringify(payload)
  }

  const res = await fetch(url, requestOptions)

  const data = await res.json() ?? {}

  let error: HTTPError = null

  const status: number = res.status

  if (!res.ok)
    error = { message: data.message, status: res.status }

  if (data.csrfToken) {
    document.querySelector('meta[name="csrf-token"]')?.setAttribute('content', data.csrfToken);
    delete data.csrfToken
  }

  return { data, error, status }
}