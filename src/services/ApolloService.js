import got from 'got';
import { success, failure } from '#src/utils/response.js'
import Profile from '#src/models/Profile.js';

async function getProfileData(message) {

    const email = message.body.email;
    const API_ENDPOINT = "https://api.apollo.io/v1/people/match";
    const apolloKey = message.apolloKey;
    const sendData = {
        "api_key": apolloKey,
        "email": email,
        "reveal_personal_emails": true
    };
    const headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
    };

    try {
        const response = await got.post(API_ENDPOINT, {
            headers: headers,
            responseType: 'json',
            json: sendData,
        });
        const userData = response.body.person;
        console.log("response:", userData)
        if (userData && userData.first_name !== "") {
            const user = new Profile(userData);
            return success(user);
        } else {
            return failure("no match found");
        }
    } catch (error) {
        if (error.response && error.response.statusCode) {
            return failure(`${error.response.statusCode} Error`);
        } else {
            return failure("HTTP connection error");
        }
    }
}

export { getProfileData };
