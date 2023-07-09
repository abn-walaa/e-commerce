
const errorHandling = (res, error) => {
    res.status(400);
    console.log(error)
    console.log(error.message, error.code)
    // if the unique
    let errors = {};
    if (error.code === 11000) {

        let name = Object.keys(error.keyValue)[0]
        errors[name] = name + " is Used"
        errors.message = name + " is Used"
        res.send({ errors })
        return;
    }

    if (error.message.includes("validation failed:")) {
        errors.message = ""

        Object.keys(error.errors).forEach(e => {
            if (error.errors[e].properties) {
                errors.message += e + ":" + error.errors[e].properties?.message + ","
                errors[e] = error.errors[e].properties?.message
            } else if (error.errors[e].message) {
                errors.message += "failed for " + e + " "
                errors[e] = " failed for " + e
            }

        })

        res.send({ errors })
        return
    }


    res.send({ errors: { message: error.message } })
}

module.exports = errorHandling