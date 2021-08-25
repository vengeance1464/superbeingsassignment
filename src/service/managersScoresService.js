export default async function fetchManagersData() {
    const url = "https://run.mocky.io/v3/09a1870d-294b-4d53-ac4f-87b676ddd000"
    const managersData = await fetch(url).then(response => response.json())
    return managersData
}
