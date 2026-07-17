import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // Ensure uploads folder exists at root
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Serve static uploaded videos
  app.use('/uploads', express.static(uploadsDir));

  // Binary video upload endpoint
  app.post('/api/upload-video', express.raw({ type: 'video/*', limit: '100mb' }), (req, res) => {
    try {
      const contentType = req.headers['content-type'] || 'video/mp4';
      const extension = contentType.split('/')[1] || 'mp4';
      const filename = `promo_video_${Date.now()}.${extension}`;
      const filePath = path.join(uploadsDir, filename);

      fs.writeFileSync(filePath, req.body);

      const videoUrl = `/uploads/${filename}`;
      res.json({ success: true, videoUrl });
    } catch (error: any) {
      console.error('Error in video upload:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Automated Email Notification System
  app.post('/api/send-order-email', async (req, res) => {
    const { id, name, email, phone, address, orderDetails, status, type } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email address is required to send notification.' });
    }

    // Dynamic HTML generation matching Albarka Collection high-end brand identity
    const isCreated = type === 'created';
    const subject = isCreated 
      ? `Order Placed Successfully! - Albarka Collection [Order #${id.substring(0, 6).toUpperCase()}]`
      : `Your Order Status Update: ${status.toUpperCase()} - Albarka Collection [Order #${id.substring(0, 6).toUpperCase()}]`;

    // Status display configurations
    const getStatusBadgeStyle = (s: string) => {
      switch (s.toLowerCase()) {
        case 'delivered': return 'background-color: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;';
        case 'shipped': return 'background-color: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe;';
        case 'cancelled': return 'background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;';
        default: return 'background-color: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;';
      }
    };

    const statusBadge = status || 'pending';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f7f9fa;
            color: #1a1a1a;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .wrapper {
            width: 100%;
            background-color: #f7f9fa;
            padding: 40px 20px;
            box-sizing: border-box;
          }
          .container {
            max-width: 600px;
            background-color: #ffffff;
            margin: 0 auto;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            border: 1px solid #eef2f5;
          }
          .header {
            background-color: #111827;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            font-size: 24px;
            margin: 0;
            font-weight: 300;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 20px;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 12px;
            color: #111827;
          }
          .intro {
            font-size: 15px;
            line-height: 1.6;
            color: #4b5563;
            margin-bottom: 30px;
          }
          .status-card {
            background-color: #f9fafb;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 30px;
            border: 1px solid #f3f4f6;
          }
          .status-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }
          .status-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #6b7280;
            font-weight: 600;
          }
          .status-badge {
            display: inline-block;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            padding: 6px 14px;
            border-radius: 9999px;
            ${getStatusBadgeStyle(statusBadge)}
          }
          .tracker {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
          }
          .tracker-steps {
            display: table;
            width: 100%;
            table-layout: fixed;
          }
          .tracker-step {
            display: table-cell;
            text-align: center;
            font-size: 11px;
            color: #9ca3af;
            position: relative;
          }
          .tracker-step.active {
            color: #111827;
            font-weight: 600;
          }
          .tracker-dot {
            width: 12px;
            height: 12px;
            background-color: #e5e7eb;
            border-radius: 50%;
            margin: 0 auto 8px auto;
          }
          .tracker-step.active .tracker-dot {
            background-color: #111827;
            box-shadow: 0 0 0 4px rgba(17, 24, 39, 0.15);
          }
          .section-title {
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #111827;
            margin-bottom: 12px;
            border-bottom: 1px solid #f3f4f6;
            padding-bottom: 8px;
          }
          .details-box {
            font-size: 14px;
            line-height: 1.6;
            color: #374151;
            margin-bottom: 30px;
            background-color: #ffffff;
            border: 1px solid #f3f4f6;
            border-radius: 10px;
            padding: 16px;
            white-space: pre-line;
          }
          .meta-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          .meta-table td {
            padding: 8px 0;
            font-size: 14px;
            vertical-align: top;
          }
          .meta-label {
            color: #6b7280;
            width: 120px;
          }
          .meta-val {
            color: #111827;
            font-weight: 500;
          }
          .btn {
            display: block;
            background-color: #111827;
            color: #ffffff !important;
            text-align: center;
            padding: 16px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin: 30px 0;
          }
          .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #f3f4f6;
          }
          .footer p {
            font-size: 12px;
            color: #6b7280;
            margin: 0 0 10px 0;
            line-height: 1.5;
          }
          .footer a {
            color: #111827;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <!-- Header -->
            <div class="header">
              <h1>Albarka Collection</h1>
            </div>
            
            <!-- Content -->
            <div class="content">
              <div class="greeting">Hello ${name},</div>
              <p class="intro">
                ${isCreated 
                  ? `Thank you for your order! Your payment receipt has been uploaded, and we are preparing your order. You can monitor its progress in real-time below.` 
                  : `We are writing to let you know that your order has been updated. Please find the new shipment and delivery details below.`
                }
              </p>

              <!-- Status Card -->
              <div class="status-card">
                <div class="status-row">
                  <span class="status-label">Order Reference</span>
                  <span style="font-family: monospace; font-weight: bold; font-size: 14px; color: #111827;">#${id.substring(0, 8).toUpperCase()}</span>
                </div>
                <div class="status-row">
                  <span class="status-label">Current Status</span>
                  <span class="status-badge">${statusBadge}</span>
                </div>

                <!-- Step Tracker Graphic -->
                <div class="tracker">
                  <div class="tracker-steps">
                    <div class="tracker-step ${['pending', 'shipped', 'delivered'].includes(statusBadge.toLowerCase()) ? 'active' : ''}">
                      <div class="tracker-dot"></div>
                      Pending
                    </div>
                    <div class="tracker-step ${['shipped', 'delivered'].includes(statusBadge.toLowerCase()) ? 'active' : ''}">
                      <div class="tracker-dot"></div>
                      Shipped
                    </div>
                    <div class="tracker-step ${statusBadge.toLowerCase() === 'delivered' ? 'active' : ''}">
                      <div class="tracker-dot"></div>
                      Delivered
                    </div>
                  </div>
                </div>
              </div>

              <!-- Customer Info -->
              <div class="section-title">Delivery & Contact Details</div>
              <table class="meta-table">
                <tr>
                  <td class="meta-label">Customer</td>
                  <td class="meta-val">${name}</td>
                </tr>
                <tr>
                  <td class="meta-label">Phone</td>
                  <td class="meta-val">${phone}</td>
                </tr>
                <tr>
                  <td class="meta-label">Address</td>
                  <td class="meta-val">${address || 'Not specified (Pickup/In-store)'}</td>
                </tr>
              </table>

              <!-- Order items -->
              <div class="section-title">Order Items</div>
              <div class="details-box">${orderDetails}</div>

              <!-- Call to Action -->
              <a href="https://wa.me/2348032896303?text=Hello%20Albarka%20Collection,%20I'd%20like%20to%20follow%20up%20on%20my%20Order%20%23${id.substring(0, 8).toUpperCase()}" class="btn">
                Inquire on WhatsApp
              </a>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p>You are receiving this automated email because you placed an order at Albarka Collection.</p>
              <p>Albarka Collection, T48 Anguwan Rogo, Jos North, Plateau State, Nigeria</p>
              <p>Phone: <a href="tel:+2348032896303">+234 803 289 6303</a> | Email: <a href="mailto:info@albarkacollection.com">info@albarkacollection.com</a></p>
              <p style="margin-top: 15px; font-size: 10px; color: #9ca3af;">&copy; 2026 Albarka Collection. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Retrieve environment variables
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_NAME, SMTP_FROM_EMAIL } = process.env;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: parseInt(SMTP_PORT || '587', 10),
          secure: parseInt(SMTP_PORT || '587', 10) === 465, // true for 465, false for other ports
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });

        const info = await transporter.sendMail({
          from: `"${SMTP_FROM_NAME || 'Albarka Collection'}" <${SMTP_FROM_EMAIL || SMTP_USER}>`,
          to: email,
          subject,
          html: htmlContent,
        });

        console.log(`Email successfully sent to ${email}. Message ID: ${info.messageId}`);
        return res.json({ success: true, messageId: info.messageId });
      } catch (error: any) {
        console.error('Error sending real email via SMTP:', error);
        return res.status(500).json({ success: false, error: error.message });
      }
    } else {
      // Graceful local development / unconfigured fallback simulation
      console.log('============= AUTOMATED EMAIL SIMULATION =============');
      console.log(`TO: ${email}`);
      console.log(`SUBJECT: ${subject}`);
      console.log(`STATUS: ${statusBadge}`);
      console.log(`DETAILS: ${orderDetails}`);
      console.log('======================================================');
      console.log('(To send real emails, please configure SMTP_HOST, SMTP_USER, and SMTP_PASS in the Settings secrets/env variables panel)');
      
      return res.json({ 
        success: true, 
        simulated: true, 
        message: 'Notification processed! Real email will send once SMTP is configured in the settings.' 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Serve index.html for any unhandled GET requests (SPA client-side routing)
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
