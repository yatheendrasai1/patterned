const Agenda = require("agenda");
const userNotification = require("./jobslist/NotifyUserToRecord.js");

const agenda = new Agenda({
    db: { address: process.env.MONGODB_URL , collection: process.env.AGENDA_JOBS_COLLECTION_NAME},
    maxConcurrency: 5,
    defaultConcurrency: 1
});

agenda.on('ready', function () {
    userNotification.defineJob(agenda);
    agenda.start();
});

module.exports = agenda; 