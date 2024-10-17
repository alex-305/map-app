import { get } from "@/scripts/http";
import { HTTPError } from "@/scripts/http";
async function updateCsrfToken() {
    const {data, error, status} = await get('/csrf-token')

    if(error) {
        console.error("Error: Request failed with status " + error.status + ": " + error.message)
        return
    }

    const newCsrfToken = data.csrfToken;

    document.querySelector('meta[name="csrf-token"]').setAttribute('content', newCsrfToken);


}