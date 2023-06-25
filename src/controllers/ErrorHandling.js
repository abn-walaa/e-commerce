
const errorHandling = (res, error) => {
    res.status(400);

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
            errors.message += error.errors[e].properties.message + " "
            errors[e] = error.errors[e].properties.message
        })

        res.send({ errors })
        return
    }


    res.send({ error: error.message })
}

module.exports = errorHandling