import express from 'express';
import { supabase } from './helpers/supabase';

const router = express.Router();

// Get
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('patients')
    .select()
    .eq('id', Number(req.params.id))
    .maybeSingle();
  if (error) {
    res.json({
      ok: false,
      error,
    });
    return;
  }
  res.json({
    ok: true,
    data,
  });
});

// List
router.get('/', async (_, res) => {
  const { data, error } = await supabase.from('patients').select().eq('deleted', false);
  if (error) {
    res.json({
      ok: false,
      error,
    });
    return;
  }
  res.json({
    ok: true,
    data,
  });
});

// Create
router.post('/', async (req, res) => {
  const { data, error } = await supabase
    .from('patients')
    .insert(req.body)
    .select();
  if (error) {
    res.json({
      ok: false,
      error,
    });
    return;
  }
  res.json({
    ok: true,
    data,
  });
});

// Update
router.put('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('patients')
    .update(req.body)
    .eq('id', req.params.id)
    .select();
  if (error) {
    res.json({
      ok: false,
      error,
    });
    return;
  }
  res.json({
    ok: true,
    data,
  });
});

// Delete
router.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('patients')
    .update({"deleted": true})
    .eq('id', req.params.id);
  if (error) {
    res.json({
      ok: false,
      error,
    });
    return;
  }
  res.json({
    ok: true,
  });
});

export default router;
