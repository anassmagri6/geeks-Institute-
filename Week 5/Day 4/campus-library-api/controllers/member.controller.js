import * as MemberModel from '../models/member.model.js';

export const addMember = async (req, res) => {
  try {
    const { full_name, email } = req.body;
    const newMember = await MemberModel.addMember(full_name, email);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMemberLoans = async (req, res) => {
  try {
    const loans = await MemberModel.getMemberLoans(req.params.id);
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMemberById = async (req, res) => {
  try {
    const member = await MemberModel.findMemberById(req.params.id);
    if (!member) 
    return res.status(404).json({ error: 'Member not found' });

    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMember = async (req, res) => {
  try {
    const { full_name, email } = req.body;
    const updatedMember = await MemberModel.updateMember(req.params.id, full_name, email);
    if (!updatedMember)
     return res.status(404).json({ error: 'Member not found' });
    
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const deleted = await MemberModel.deleteMember(req.params.id);
    if (!deleted) 
        return res.status(400).json({ error: 'Member not found' });
    
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};