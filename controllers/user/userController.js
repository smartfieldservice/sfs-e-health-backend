//@external module
const axios = require('axios');

//@internal module
const { User } = require('../../models/modelExporter');
const { functions } = require('../../utilities/utilityExporter');

const otpRequest = async(req, res) => {

    try {

        const { phone, otp, response } = req.body;

        let user = await User.findOne({ phone });

        if(user){
            user = await User.findOneAndUpdate({
                    phone
                },{
                    otp,
                    otpExpiresAt : new Date(Date.now() + 2 * 60 * 1000)
                },{
                new : true
            });
        }else{
            user = new User({
                phone,
                otp,
                otpExpiresAt : new Date(Date.now() + 2 * 60 * 1000)
            });
            await user.save();
        }

        res.status(200).json({ message: 'OTP sent successfully', otp , response });

    } catch (error) {
        res.status(400).json({ errors : error.message });
    }
}


const otpVerify = async(req, res) => {
    
    try {
        
        let { phone, otp } = req.body;
        phone = phone.startsWith('+') ? phone : `+${phone}`;

        const user = await User.findOne({ phone });

        if(user){

            if(user.otpExpiresAt < Date.now()){
                return res.status(400).json({ message: 'OTP has expired' });
            }

            if(otp === user.otp){

                //@invalidate the otp
                user = await User.findOneAndUpdate({
                        phone
                    },{
                        opt : "",
                        otpExpiresAt: null
                    },{
                        new :true
                });

                //@send the response
                res.status(200).json({  message: 'OTP verified successfully', 
                    _id : user._id, 
                    phone : user.phone, 
                    token : functions.generateAuthToken(user._id, phone)
                });

            }else{
                res.status(400).json({ message: 'Invalid OTP' });
            }
        }else{
            return res.status(404).json({ message: 'Not found' });
        }

    } catch (error) {
        res.status(400).json({ errors : error.message });
    }
}


//@exports
module.exports = {  otpRequest,
                    otpVerify
                }