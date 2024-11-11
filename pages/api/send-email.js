import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name, lname, phone, formType, tripType, pickup, dropoff, pickupDate, pickupTime, days, selectedCar, Price, Package } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, // set these in your .env file
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'rentease573@gmail.com',
    subject: 'New Booking Inquiry',
    text: `
      Name: ${name} ${lname}
      Phone: ${phone}
      DutyType: ${formType === "Local Transport" ? formType + "(" + Package + ")" : formType + "(" + tripType + ")"}
      Pickup: ${pickup}
      Dropoff: ${dropoff}
      Date-Time (pickup): ${pickupDate}, ${pickupTime}
      Days: ${days} day/s
      Car: ${selectedCar.service}
      Price: ${Price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
