import express, { Router, Request, Response } from 'express';
import { supabase } from '../index.js';

const router: Router = express.Router();

// Get all jobs
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('jobs')
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

// Get job by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      error: 'Job not found'
    });
  }
});

// Create job (admin only)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, company, category_id, salary_min, salary_max, location, job_type, experience_level, created_by } = req.body;

    if (!title || !description || !company || !category_id || !location || !job_type) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const { data, error } = await supabase
      .from('jobs')
      .insert([
        {
          title,
          description,
          company,
          category_id,
          salary_min,
          salary_max,
          location,
          job_type,
          experience_level,
          created_by: created_by || '00000000-0000-0000-0000-000000000000',
          status: 'open'
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: data?.[0],
      message: 'Job created successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update job (admin only)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('jobs')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json({
      success: true,
      data: data?.[0],
      message: 'Job updated successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Delete job (admin only)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get jobs by category
router.get('/category/:categoryId', async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('category_id', categoryId)
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

export default router;
