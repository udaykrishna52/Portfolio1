import { useState, useCallback } from 'react';
import { Message } from '../types';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hey! I'm Uday's AI assistant. I can answer anything about his skills, projects, experience, or background. What would you like to know?",
      timestamp: new Date(),
    }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: messages.slice(-6).map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();

      // Format the structured response into a readable message
      let formattedContent = '';
      
      if (data.response) {
        formattedContent = data.response;
      } else if (data.skills) {
        formattedContent = "## Uday's Technical Skills\n\n";
        Object.entries(data.skills).forEach(([category, skills]) => {
          formattedContent += `**${category}**: ${Array.isArray(skills) ? skills.join(', ') : skills}\n\n`;
        });
      } else if (data.projects) {
        formattedContent = "## Uday's Projects\n\n";
        if (data.projects.featured_projects) {
          data.projects.featured_projects.forEach((project: any, index: number) => {
            formattedContent += `### ${project.name}\n`;
            formattedContent += `**Description**: ${project.description}\n`;
            formattedContent += `**Technologies**: ${project.tech.join(', ')}\n`;
            formattedContent += `**Status**: ${project.status}\n\n`;
          });
        }
      } else if (data.education) {
        formattedContent = "## Uday's Education\n\n";
        Object.entries(data.education).forEach(([level, details]: [string, any]) => {
          formattedContent += `### ${level.toUpperCase()}\n`;
          Object.entries(details).forEach(([key, value]) => {
            if (key !== 'btech' && key !== 'intermediate' && key !== 'ssc') {
              formattedContent += `**${key.charAt(0).toUpperCase() + key.slice(1)}**: ${value}\n`;
            }
          });
          formattedContent += '\n';
        });
      } else {
        formattedContent = "I'm Uday's AI assistant! I can provide information about his skills, projects, education, and experience. Ask me about any specific aspect!";
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: formattedContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting to the server. Please make sure the backend is running.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }, [messages]);

  return { messages, loading, sendMessage };
};
