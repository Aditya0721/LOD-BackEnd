exports.validEmail = (email) => {
    //console.log(email, email.match(/^([a-z0-9]+)@([a-z]{3,9})\.([a-z]{2,3})$/))
    if(!email.match(/^([a-z0-9]+)@([a-z]{3,9})\.([a-z]{2,3})$/)){
        return false
    }
    return true
}