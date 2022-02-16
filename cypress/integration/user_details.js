/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable require-jsdoc */
var Countly = require("../../lib/countly");

function initMain() {
    Countly.init({
        app_key: "YOUR_APP_KEY",
        url: "https://try.count.ly",
        max_events: -1
    });
}

const userDetailObj = {
    name: "Barturiana Sosinsiava",
    username: "bar2rawwen",
    email: "test@test.com",
    organization: "Dukely",
    phone: "+123456789",
    picture: "https://ps.timg.com/profile_images/52237/011_n_400x400.jpg",
    gender: "Non-binary",
    byear: 1987, // birth year
    custom: {
        "key1 segment": "value1 segment",
        "key2 segment": "value2 segment",
    },
};

describe('User details tests ', () => {
    it('Checks if user detail recording works', () => {
        // halt countly if it was initiated before
        if (Countly.device_id !== undefined) {
            Countly.halt();
        }
        cy.wait(150).then(()=>{
            cy.clearLocalStorage().then(()=>{
                initMain();
                Countly.user_details(userDetailObj);
                cy.fetch_local_request_queue().then((e)=>{
                    let queue = JSON.parse(e);
                    cy.check_user_details(queue[0], userDetailObj);
                });
            });
        });
    });
});

