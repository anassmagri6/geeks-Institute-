import User from '../models/users.js';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  };
}

function getPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

function createLoginCookie(res, user) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is missing from the backend environment.');
  }

  const token = JWT.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.cookie('chapter_token', token, {
    ...getCookieOptions(),
    maxAge: 8 * 60 * 60 * 1000,
  });
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({ message: 'Invalid input data.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    
    if (await User.findOne({ email: cleanEmail })) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      passwordHash: await bcrypt.hash(password, 10),
      role: 'user',
    });

    createLoginCookie(res, user);
    return res.status(201).json({ user: getPublicUser(user) });
  } catch (error) {
    console.error('Registration failed:', error);
    return res.status(500).json({ message: 'Unable to create your account.' });
  }
}
export async function login(req, res) {
  try {
    const email = typeof req.body?.email === 'string'
      ? req.body.email.trim().toLowerCase()
      : '';
    const password = req.body?.password;

    if (!email || typeof password !== 'string' || !password) {
      return res.status(400).json({ message: 'Enter your email and password.' });
    }

    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    }

    createLoginCookie(res, user);
    return res.status(200).json({ user: getPublicUser(user) });
  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({ message: 'Unable to sign in right now.' });
  }
}

export async function getCurrentUser(req, res) {
  try {
    return res.status(200).json({
      user: req.user ? getPublicUser(req.user) : null,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({ message: 'Unable to fetch current user.' });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie('chapter_token', getCookieOptions());
    return res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Unable to logout.' });
  }
}
