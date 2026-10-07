import express from 'express';
import {
  addMember,
  getMemberLoans,
  getMemberById,
  updateMember,
  deleteMember
} from '../controllers/member.controller.js';

const router = express.Router();

router.post('/', addMember);
router.get('/:id/loans', getMemberLoans);
router.get('/:id', getMemberById);
router.patch('/:id', updateMember);
router.delete('/:id', deleteMember);

export default router;