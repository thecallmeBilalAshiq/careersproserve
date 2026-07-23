import express, { Router, Request, Response } from 'express';
import { supabase } from '../index.js';

const router: Router = express.Router();

// Get all applications
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*, jobs(title, company), profiles(full_name)')
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

// Get applications by job ID
router.get('/job/:jobId', async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const { data, error } = await supabase
      .from('applications')
      .select('*, profiles(full_name, avatar_url)')
      .eq('job_id', jobId)
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

// Get applications by user ID
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from('applications')
      .select('*, jobs(title, company, location)')
      .eq('user_id', userId)
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

// Create application
router.post('/', async (req: Request, res: Response) => {
  try {
    const { job_id, user_id, cover_letter, resume_url } = req.body;

    if (!job_id || !user_id) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          job_id,
          user_id,
          cover_letter: cover_letter || '',
          resume_url: resume_url || '',
          status: 'pending'
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: data?.[0],
      message: 'Application submitted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update application status (admin only)
router.put('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required'
      });
    }

    const { data, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json({
      success: true,
      data: data?.[0],
      message: 'Application status updated successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get application count by status
router.get('/stats/by-status', async (req: Request, res: Response) => {
  try {
    const statuses = ['pending', 'reviewed', 'shortlisted', 'hired', 'rejected'];
    const stats = await Promise.all(
      statuses.map(async (status) => {
        const { count, error } = await supabase
          .from('applications')
          .select('*', { count: 'exact', head: true })
          .eq('status', status);
        return { status, count: count || 0, error };
      })
    );

    res.json({
      success: true,
      data: stats
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
