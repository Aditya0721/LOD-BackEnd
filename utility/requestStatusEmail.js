const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'upgradcopypaste@gmail.com',
        pass: 'xndjxeidcwzquaxc'
    }
})

exports.sendCreateRequestMail = async(userEmail) => {
    try{
        console.log("inside send Email")
        let info = await transporter.sendMail({
            from: 'upgradcopypaste@gmail.com',
            to: userEmail,
            subject: `Shop Verification Created`,
            html:`<div>Hello<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">LOD</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Your Request For Shop Creation Has Been Submitted</p>
              <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>LOD Inc</p>
                <p>1600 Amphitheatre Parkway</p>
                <p>California</p>
              </div>
            </div>
          </div>`
        })
        return info
    }
    catch(err){
        console.log(err)
        return false
    }
}

exports.sendCloseRequestMail = async(userEmail, status) => {
    try{
        console.log("inside send Email")
        let info = await transporter.sendMail({
            from: 'upgradcopypaste@gmail.com',
            to: userEmail,
            subject: `Shop Verification Status`,
            html:`<div>Hello<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">LOD</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Your Shop Has Been ${status}</p>
              <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>LOD Inc</p>
                <p>1600 Amphitheatre Parkway</p>
                <p>California</p>
              </div>
            </div>
          </div>`
        })
        return info
    }
    catch(err){
        console.log(err)
        return false
    }
}