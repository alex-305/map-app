
export const formatDate = (date_string:string) => {
    if(!date_string) return null

    const date = new Date(date_string)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}