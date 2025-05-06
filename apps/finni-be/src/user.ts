import express from 'express';

const router = express.Router()

// Mock user
const me = {
  firstName: "Alex",
  lastName: "Kim",
  email: "alexgkim205@gmail.com"
}

router.get('/me', (req, res) => {
  res.json({
    ok: true,
    data: me
  });
});

router.post('/login', (req, res) => {
  res.json({
    ok: true,
    data: me
  });
});

router.post('/logout', (req, res) => {
  res.json({
    ok: true,
  });
});

export default router
