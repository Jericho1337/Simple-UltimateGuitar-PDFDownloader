export async function onRequest(context) {
    const url = new URL(context.request.url);

    const target = url.searchParams.get("url");

    if (!target.startsWith("https://tabs.ultimate-guitar.com/")) {
        return new Response("Forbidden", { status: 403 });
    }

    const response = await fetch(target);
    const headers = new Headers(response.headers);
    headers.set("Access-Control-Allow-Origin", "*");

    return new Response(response.body, { status: response.status, headers});
}