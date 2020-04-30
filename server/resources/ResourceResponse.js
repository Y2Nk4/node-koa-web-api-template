export default function (map) {
    return function (res) {
        if (res === undefined || res === null) {
            return res
        }
        if (Array.isArray(res)) {
            return res.map(i => map(i))
        }
        return map(res)
    }
}
