import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true, default: 'Untitled Project' },
  messages: [{
    role: { type: String, enum: ['user', 'assistant'] },
    content: { type: String },
    timestamp: { type: Date, default: Date.now }
  }],
  generatedCode: { type: String, default: '' },
  versions: [{
    code: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  isPublic: { type: Boolean, default: false },
  shareToken: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);