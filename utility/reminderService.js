const cron = require('node-cron');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const emailService = require('./emailService');

exports.start = () => {
  cron.schedule('0 8 * * *', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointments = await Appointment.find({
      appointmentDate: {
        $gte: tomorrow,
        $lt: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
      }
      // suppression du filtre reminderSent: false
    }).populate('patient doctor');

    for (const appt of appointments) {
      const patientUser = await User.findById(appt.patient.user);
      await emailService.sendReminder(
        patientUser.email,
        'Rappel de rendez-vous',
        `Bonjour, vous avez un rendez-vous demain à ${appt.appointmentDate}`
      );

      // suppression de la mise à jour reminderSent
    }
  });
};
