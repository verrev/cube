import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

import { getKey, setKey } from '@/utils';
import { KvKey } from '@/app/api/route';

export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    jwt.verify(token, process.env.JWT_SECRET);

    const res = NextResponse.redirect(process.env.APP_URL, 'replace');
    res.cookies.set('Authorization', `Bearer ${token}`);
    return res;
  } catch (e) {
    console.log(e);
    return new NextResponse(null, { status: 400 });
  }
};

const sendEmail = async (to, subject, text) => {
  if (process.env.VERCEL_ENV === 'production') {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const retryCount = 5;
    for (let i = 0; i < retryCount; ++i) {
      console.log(`Sending email attempt #${i + 1}`);
      try {
        await transporter.sendMail({
          from: 'noreply@0v.ee',
          to,
          subject,
          text,
          html: `<table width="100%" cellspacing="0" cellpadding="0"><tr><td><table cellspacing="0" cellpadding="0"><tr><td style="border-radius:2px" bgcolor="#ED2939"><a href="${text}" target="_blank" style="padding:8px 12px;border:1px solid #ed2939;border-radius:2px;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#fff;text-decoration:none;font-weight:700;display:inline-block">Click</a></td></tr></table></td></tr></table>`,
        });
        return;
      } catch (e) {
        console.log(e);
      }
    }
  } else {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    const retryCount = 5;
    for (let i = 0; i < retryCount; ++i) {
      console.log(`Sending email attempt #${i + 1}`);
      try {
        const url = nodemailer.getTestMessageUrl(
          await transporter.sendMail({
            from: 'noreply@0v.ee',
            to,
            subject,
            text,
            html: `<table width="100%" cellspacing="0" cellpadding="0"><tr><td><table cellspacing="0" cellpadding="0"><tr><td style="border-radius:2px" bgcolor="#ED2939"><a href="${text}" target="_blank" style="padding:8px 12px;border:1px solid #ed2939;border-radius:2px;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#fff;text-decoration:none;font-weight:700;display:inline-block">Click</a></td></tr></table></td></tr></table>`,
          })
        );
        console.log(url);
        return;
      } catch (e) {
        console.log(e);
      }
    }
  }
};

export const PUT = async (req) => {
  const { email, player } = await req.json();
  if (!email || !player) {
    return new NextResponse(null, { status: 400 });
  }

  const alreadyRegisteredPlayerEmail = (await getKey(KvKey.PLAYERS))[player];
  if (
    alreadyRegisteredPlayerEmail &&
    !(await bcrypt.compare(email, alreadyRegisteredPlayerEmail))
  ) {
    console.log(
      `Attempted login from mismatching email ${email} !== ${alreadyRegisteredPlayerEmail} for player ${player}`
    );
    return new NextResponse(null, { status: 400 });
  }
  if (!alreadyRegisteredPlayerEmail) {
    await setKey(KvKey.PLAYERS, {
      ...((await getKey(KvKey.PLAYERS)) || {}),
      [player]: await bcrypt.hash(
        email,
        parseInt(process.env.EMAIL_HASH_ROUND_COUNT)
      ),
    });
  }

  const token = jwt.sign({ player }, process.env.JWT_SECRET, {
    expiresIn: '365d',
  });

  await sendEmail(
    email,
    '0v.ee | Get cubed',
    `${process.env.APP_URL}/api/login?token=${token}`
  );

  return new NextResponse(null, { status: 200 });
};
