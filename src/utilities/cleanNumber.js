export default function cleanNumber(value) {
    return value.replace(/[^\d]/g, "");
}