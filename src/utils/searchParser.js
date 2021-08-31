export default function parseSearch(q) {
    if (q.startsWith("\\")) return { q: q.slice(1, q.length) };

    const results = { q: [] };

    for (const arg of q.split(" ")) {
        if (arg.includes(":")) {
            let split = arg.split(":");
            results[split[0]] = split[1] || true;
        } else results.q.push(arg);
    }

    return results;
}
