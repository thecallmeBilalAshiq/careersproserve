import express, { Router, Request, Response } from 'express';
import { supabase } from '../index.js';

const router: Router = express.Router();

// Check admin credentials (simplified - in production use proper JWT)
router.post('/admin/verify', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Verify against environment admin credentials (use Supabase auth in production)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@sapphire.career';
    const adminPassword = process.env.ADMIN_PASSWORD || 'SapphireAdmin@2024!';

    if (email === adminEmail && password === adminPassword) {
      res.json({
        success: true,
        message: 'Admin credentials verified',
        admin: {
          email: adminEmail,
          role: 'super_admin',
          token: 'admin_token_' + Date.now() // In production use JWT
        }
      });
    } else {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get admin users
router.get('/admin/list', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: data || [],
      count: data?.length || 0
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create admin user
router.post('/admin/create', async (req: Request, res: Response) => {
  try {
    const { email, role, permissions } = req.body;

    if (!email || !role) {
      return res.status(400).json({
        success: false,
        error: 'Email and role are required'
      });
    }

    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        {
          email,
          role,
          permissions: permissions || ['read', 'write']
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: data?.[0],
      message: 'Admin user created successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Login endpoint
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Use Supabase auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    res.json({
      success: true,
      message: 'Login successful',
      user: data.user,
      session: data.session
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: error.message || 'Login failed'
    });
  }
});

// Logout endpoint
router.post('/logout', async (req: Request, res: Response) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
