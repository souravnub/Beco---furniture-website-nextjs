export default function (array) {
    const half = Math.ceil(array.length / 2);

    const firstHalf = array.slice(half);
    const secondHalf = array.slice(0, half);

    return { firstHalf, secondHalf };
}
