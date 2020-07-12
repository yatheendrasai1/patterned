const agendaJobs = require("../app/jobs/agenda");

async function userNotification(data){
    //15 9-17 * * 1-5
    await agendaJobs.schedule("in 1 minute", "notify user to record", data);
}

module.exports = {
    userNotification: userNotification
}