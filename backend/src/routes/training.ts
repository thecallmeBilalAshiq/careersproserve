import express, { Router, Request, Response } from 'express';
import { supabase } from '../index.js';

const router: Router = express.Router();

// Get all training programs
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('training')
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

// Get training by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('training')
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
      error: 'Training program not found'
    });
  }
});

// Create training (admin only)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, category_id, level, instructor, duration_hours, price, created_by } = req.body;

    if (!title || !description || !category_id || !instructor || !duration_hours) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const { data, error } = await supabase
      .from('training')
      .insert([
        {
          title,
          description,
          category_id,
          level: level || 'beginner',
          instructor,
          duration_hours,
          price: price || 0,
          created_by: created_by || '00000000-0000-0000-0000-000000000000'
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: data?.[0],
      message: 'Training program created successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update training (admin only)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('training')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json({
      success: true,
      data: data?.[0],
      message: 'Training program updated successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Delete training (admin only)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('training')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Training program deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
