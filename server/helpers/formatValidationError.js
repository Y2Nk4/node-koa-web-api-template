module.exports = function (errors) {
    return errors.map((error) => {
        return Object.keys(error).map(key => error[key]).join(',')
    }).join(',')
}
