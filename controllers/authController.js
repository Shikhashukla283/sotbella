const axios = require("axios");
const qs = require("qs");
require("dotenv").config();
const customerData = require("../data.json");

const login = async (req, res) => {
    try {
        const url = "https://test.salesforce.com/services/oauth2/token";
        const fullPassword = `${process.env.PASSWORD}${process.env.SECURITY_TOKEN}`;

        const data = qs.stringify({
            grant_type: "password",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            username: process.env.USEREMAIL,
            password: fullPassword, // Password + Security Token
        });

        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: url,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: data,
        };

        const response = await axios.request(config);
        const accessToken = response.data.access_token;

        const salesForceData = await sendDataToSalesforce(accessToken);
        res.status(200).json(salesForceData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
};

const sendDataToSalesforce = async (bearerToken) => {
    try {
        const accountIntegrationUrl = "https://test.salesforce.com/services/AccountIntegration/";

        const config = {
            method: "post",
            url: accountIntegrationUrl,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
            data: customerData,
        };
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error });
    }
};

module.exports = {
    login,
    sendDataToSalesforce,
};
