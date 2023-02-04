export default function getPxVal(remVal) {
    return parseFloat(remVal.split(0, -3)) * 16;
}
