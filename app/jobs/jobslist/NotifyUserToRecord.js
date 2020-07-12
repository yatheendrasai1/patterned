const notifier = require('node-notifier');
const JOB_NAME = "notify user to record";

function defineJob(agenda) {
    console.log("Defining job: ", JOB_NAME);
    agenda.define(JOB_NAME, notifyUser);
}

async function notifyUser(job){
    let { itemId } = job.attrs.data;
    notifier.notify({
        title: "Time To Record!",
        message: "it's the Main Step, dont miss to log your work...",
        icon: "https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg",
        sound: true,
        wait: true,
        open: "http:/localhost:3000/aboutus",
      });
}

module.exports = {
    JOB_NAME,
    defineJob
};