export default function formatNumber(value) {
    if (value === "" || value === null || value === undefined) return "";
    return Number(value).toLocaleString();
}