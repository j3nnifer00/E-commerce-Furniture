const jwt = require('jsonwebtoken')
const { User: userModel } = require('../models/userModel');



async function googleOAuthHandler (req, res) {
        // get the code from qs 

    const code = req.query.code

    // get google oauth token : the id jwt token and access token with the code
    const oauthURL = "https://oauth2.googleapis.com/token"
    const values = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID, 
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
        grant_type: 'authorization_code',
    }
    

    const params = new URLSearchParams(values);

    try{
        const response = await fetch(oauthURL, {
            method:"POST",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params
        });

        const {id_token, access_token} = await response.json();

    //console.log({id_token, access_token})

        // Option1. get google user with token (or could get user information from the id_token by decoding them)

        let googleUser = {}
        try{
            const api_response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
                headers:{
                    Authorization: `Bearer ${id_token}`
                }
            })

            googleUser = await api_response.json()
        }catch (error){
            console.log(error)
        }

        //console.log('googleUser:', googleUser)

        // Option2. decode jwt
        // jwt decode won't verify the token.  so you will usually want to use jwt to verify
    /*  const googleUser = jwt.decode(id_token);
        console.log('  ')
        console.log({ googleUser }); 
        console.log('  ') */

    // upsert user
        if (!googleUser.verified_email) {
            return res.status(403).send('Google account is not verified');
        }

        const user = await userModel.findOneAndUpdate({
            email: googleUser.email,
        }, {
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture,
            password: null,
        }, {
            upsert: true,
            new: true
        })

        const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.JWT_KEY,
            { expiresIn: '1d' }
        );

    // Step 5: 로그인 성공 시 이메일과 JWT 토큰 전송
    
    // 예: 서버에서 리디렉션
    res.redirect(`${process.env.CLIENT_ENDPOINT}/user/google-login/?token=${token}&email=${googleUser.email}&isAdmin=${user.isAdmin}`);



        
    }catch(error){
        console.error('Error during Google OAuth handler:', error);
        res.status(500).send('Internal Server Error');
    }

};


module.exports = {
    googleOAuthHandler,
};