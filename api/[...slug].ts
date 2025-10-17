import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { storage } from '../server/storage';
import { insertIssueSchema, updateIssueSchema } from '../shared/schema';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Issue Routes
app.get('/api/issues', async (req, res) => {
  try {
    const issues = await storage.getAllIssues();
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});

app.get('/api/issues/reporter/:reporterId', async (req, res) => {
  try {
    const { reporterId } = req.params;
    const issues = await storage.getIssuesByReporter(reporterId);
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reporter issues' });
  }
});

app.get('/api/issues/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await storage.getIssue(id);
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch issue' });
  }
});

app.post('/api/issues', async (req, res) => {
  try {
    const validatedData = insertIssueSchema.parse(req.body);
    const issue = await storage.createIssue(validatedData);
    res.status(201).json(issue);
  } catch (error) {
    res.status(400).json({ error: 'Invalid issue data' });
  }
});

app.patch('/api/issues/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = updateIssueSchema.parse(req.body);
    const issue = await storage.updateIssue(id, validatedData);
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    res.json(issue);
  } catch (error) {
    res.status(400).json({ error: 'Invalid update data' });
  }
});

app.delete('/api/issues/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const success = await storage.deleteIssue(id);
    if (!success) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete issue' });
  }
});

// Export for Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};