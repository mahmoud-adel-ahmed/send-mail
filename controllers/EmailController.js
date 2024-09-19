const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

exports.sendMail = async (req, res) => {
  try {
    const { to, subject, htmlBody } = req.body;

    if (!to || !subject || !htmlBody) {
      return res.status(400).json({ errMsg: "All fields are required" });
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html: htmlBody,
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(201).json({ msg: "Email sent successfully", info });
  } catch (error) {
    console.log("🚀 ~ exports.sendMail= ~ error:", error);
    res.status(500).json({ msg: error.message });
  }
};

//  `<!DOCTYPE html>
//               <html lang="en">
//                 <head>
//                   <meta charset="UTF-8" />
//                   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//                   <title>Event Invitation</title>
//                   <style>
//                     /* Basic email styles */
//                     * {
//                       margin: 0;
//                       padding: 0;
//                       box-sizing: border-box;
//                           }
//                         body {
//                           margin: 0;
//                           padding: 0;
//                           width: 100% !important;
//                           font-family: Arial, Helvetica, sans-serif;
//                         }

//                         .email-container {
//                           max-width: 600px;
//                           margin: 0 auto;
//                           background-color: #ffffff;
//                         }

//                         .email-header,
//                         .email-footer {
//                           background-color: #0e1b33;
//                           color: #ffffff;
//                           text-align: center;
//                           padding-block: 20px;
//                         }

//                         .email-header img {
//                           max-width: 200px;
//                           height: auto;
//                           margin-right: auto;
//                         }

//                         .email-body {
//                           padding: 20px;
//                           text-align: center;
//                         }

//                         .email-body img {
//                           width: 100%;
//                           height: auto;
//                           max-width: 100%;
//                           display: block;
//                           margin: 0 auto;
//                         }

//                         .email-body h1 {
//                           font-size: 24px;
//                         }

//                         .email-body p {
//                           font-size: 16px;
//                           line-height: 1.8;
//                           padding: 20px 0;
//                         }

//                         .agenda-table {
//                           width: 100%;
//                           border-collapse: collapse;
//                           margin: 20px 0;
//                           overflow: hidden;
//                         }

//                         .agenda-table th {
//                           padding: 15px !important;
//                         }

//                         .agenda-table th,
//                         .agenda-table td {
//                           padding: 20px;
//                           background-color: #17243b;
//                           text-align: left;
//                         }

//                         .agenda-table td {
//                           font-size: 11px;
//                           font-weight: 100 !important;
//                         }

//                         .agenda-table tr:not(:last-child) {
//                           border-bottom: 1px solid rgba(255, 255, 255, 0.2);
//                         }

//                         .agenda-table th {
//                           background-color: #f7f7f7;
//                           color: #0e1b33 !important;
//                         }

//                         .button {
//                           background-color: #02bb5b;
//                           color: #ffffff;
//                           padding: 10px 20px;
//                           text-decoration: none;
//                           border-radius: 5px;
//                           display: inline-block;
//                         }

//                         .footer-text {
//                           /* font-size: 12px; */
//                           text-align: left;
//                         }

//                         .footer p > span {
//                           font-size: 10px;
//                         }

//                         /* Responsive styles */
//                         @media only screen and (max-width: 600px) {
//                           .email-container {
//                             width: 100% !important;
//                           }

//                           .email-header img {
//                             max-width: 170px;
//                           }
//                           .agenda-table th {
//                             font-size: 10px !important;
//                             padding: 10px !important;
//                           }

//                           .agenda-table td {
//                             font-size: 7px !important;
//                             padding: 10px !important;
//                           }

//                           .email-header {
//                             padding-left: 0;
//                             padding-block: 13px !important;
//                           }

//                           .my_img {
//                             width: 130px !important;
//                           }

//                           .my_h1 {
//                             font-size: 16px !important;
//                           }

//                           /* .email-body {
//                             padding: 10px !important;
//                           } */

//                           /* .my_p {
//                             padding: 15px !important;
//                             /* font-size: 13px !important;
//                           } */

//                           .email-body h1 {
//                             font-size: 20px;
//                           }

//                           .email-body p {
//                             font-size: 12px;
//                             padding: 15px !important;
//                           }

//                           .evt {
//                             font-size: 16px;
//                           }

//                           .email-footer {
//                             text-align: left !important;
//                             padding-top: 17px !important;
//                           }
//                           .footer,
//                           .footer > * {
//                             text-align: left !important;
//                           }

//                           .footer p > span {
//                             font-size: 2px !important;
//                           }

//                           .footer p:last-of-type > span {
//                             font-size: 4px !important;
//                           }
//                           .footer p {
//                             height: 30px !important;
//                           }
//                           .footer p > img {
//                             width: 20px !important;
//                             height: 20px !important;
//                           }
//                         }
//                       </style>
//                     </head>
//                     <body>
//                       <div class="email-container" style="background-color: white !important">
//                         <div
//                           class="email-header"
//                           style="text-align: left; background-color: #fff"
//                         >
//                           <img
//                             src="https://events.alexondev.net/assets/SiteLogo-8mHirAuN.png"
//                             alt="Event Logo"
//                           />
//                         </div>

//                         <div
//                           class="email-body"
//                           style="
//                             position: relative;
//                             color: white;
//                             background-color: #0e1b33;
//                             border-radius: 10px;
//                             overflow: hidden;
//                             padding: 0;
//                           "
//                         >
//                           <!-- Background Image with Overlay -->
//                           <div
//                             style="
//                               background-image: url('https://events.alexondev.net/assets/back-Cgf2QjYU.jpg');
//                               background-size: cover;
//                               background-position: center;
//                               height: 325.31px;
//                               border-radius: 10px;
//                               position: relative;
//                             "
//                           >
//                             <!-- Full Overlay -->
//                             <div
//                               style="
//                                 position: absolute;
//                                 top: 0;
//                                 left: 0;
//                                 width: 100%;
//                                 height: 100%;
//                                 background-color: rgba(0, 0, 0, 0.6); /* Dark overlay */
//                                 /* display: flex;
//                                 justify-content: center;
//                                 align-items: center; */
//                                 padding: 20px;
//                                 box-sizing: border-box;
//                               "
//                             >
//                               <!-- Centered Content -->
//                               <div
//                                 style="
//                                   text-align: left;
//                                   color: white;
//                                   line-height: 1.5;
//                                   margin-top: 75px;
//                                 "
//                               >
//                                 <img
//                                   src="https://i.postimg.cc/vHKwZC81/image-71.png"
//                                   style="width: 190px; margin: 0; margin-bottom: 20px"
//                                   alt=""
//                                   class="my_img"
//                                 />
//                                 <h2 style="margin: 0; font-size: 20px" class="my_h1">
//                                   Think AI & Beyond: <br />
//                                   The Future Intelligence
//                                 </h2>
//                                 <p style="margin-top: 10px; font-size: 13px; margin-left: 3px">
//                                   21/09/2024 - 09:00 pm
//                                 </p>
//                               </div>
//                             </div>
//                           </div>

//                           <!-- Email Body Content -->
//                           <p
//                             style="padding: 20px 39px; background-color: #0e1b33; color: #fff"
//                             class="my_p"
//                           >
//                             We are delighted to invite you to our upcoming event, "Think AI &
//                             Beyond: The Future Intelligence", set to take place on 30th September
//                             2024 at Mövenpick Hotel & Resort Al Bida’a. Join us for an engaging
//                             day filled with insightful discussions, cutting-edge presentations,
//                             and interactive sessions.
//                           </p>

//                           <!-- Event Agenda -->
//                           <div>
//                             <h2 class="evt">Event Agenda</h2>
//                             <div style="width: 90%; border-radius: 20px; margin: 0px auto">
//                               <table style="height: 100%" class="agenda-table">
//                                 <tr style="background-color: green">
//                                   <th style="border-top-left-radius: 10px">From</th>
//                                   <th>To</th>
//                                   <th style="border-top-right-radius: 10px">Activity</th>
//                                 </tr>
//                                 <tr>
//                                   <td>9:30 am</td>
//                                   <td>10:00 am</td>
//                                   <td>Arrival, Networking and Welcome Coffee</td>
//                                 </tr>
//                                 <tr>
//                                   <td>10:00 am</td>
//                                   <td>10:15 am</td>
//                                   <td>Welcome Note</td>
//                                 </tr>
//                                 <tr>
//                                   <td>10:15 am</td>
//                                   <td>11:30 am</td>
//                                   <td>Transformative Solutions for the Digital Age</td>
//                                 </tr>
//                                 <tr>
//                                   <td>11:30 am</td>
//                                   <td>12:00 pm</td>
//                                   <td>Coffee Break</td>
//                                 </tr>
//                                 <tr>
//                                   <td>12:00 pm</td>
//                                   <td>12:45 pm</td>
//                                   <td>Optimizing Service Excellence in the Digital Era</td>
//                                 </tr>
//                                 <tr>
//                                   <td>12:45 pm</td>
//                                   <td>1:00 pm</td>
//                                   <td>Luck Draw</td>
//                                 </tr>
//                                 <tr>
//                                   <td style="border-bottom-left-radius: 10px">1:00 pm</td>
//                                   <td>Onwards</td>
//                                   <td style="border-bottom-right-radius: 10px">Lunch</td>
//                                 </tr>
//                               </table>
//                             </div>

//                             <a
//                               href="#"
//                               class="button"
//                               style="margin-bottom: 20px; padding: 8px 60px; color: #fff"
//                               >Confirm Now</a
//                             >
//                           </div>
//                         </div>
//                       </div>

//                       <!-- Footer -->
//                       <div class="email-container">
//                         <div
//                           class="email-footer"
//                           style="background-color: white; color: black !important"
//                         >
//                           <div class="footer">
//                             <p class="footer-text" style="float: left; width: 69%">
//                               <img
//                                 style="width: 30px; height: 30px; vertical-align: middle"
//                                 src="https://i.postimg.cc/mk2WPsF9/location.png"
//                               />
//                               <span> Shuwaikh Industrial Area, Sun City </span>
//                             </p>
//                             <p class="footer-text" style="float: left; width: 30%">
//                               <img
//                                 src="https://i.postimg.cc/W1QVXCQR/EMAIL.png"
//                                 style="width: 30px; height: 30px; vertical-align: middle"
//                               />
//                               <span>sales@zakq8.com</span>
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </body>
//                   </html>
