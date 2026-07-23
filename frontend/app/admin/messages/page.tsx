'use client';

import { useState } from 'react';
import { ArrowLeft, Search, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  email: string;
  name: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Job Inquiry',
    message: 'I am interested in the Senior Developer position. Could you provide more details?',
    status: 'unread',
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    subject: 'Training Program Question',
    message: 'What are the prerequisites for the Advanced React course?',
    status: 'read',
    created_at: '2024-01-14T14:20:00Z',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    subject: 'General Inquiry',
    message: 'I would like to know about partnership opportunities.',
    status: 'replied',
    created_at: '2024-01-13T09:15:00Z',
  },
];

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'read':
        return 'bg-blue-100 text-blue-800';
      case 'unread':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'replied':
        return <CheckCircle size={18} className="text-green-600" />;
      case 'read':
        return <Mail size={18} className="text-blue-600" />;
      case 'unread':
      default:
        return <AlertCircle size={18} className="text-yellow-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link href="/admin" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Review and respond to contact form submissions</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
          />
        </div>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 bg-white rounded-xl border border-gray-200 overflow-hidden max-h-[600px] overflow-y-auto"
        >
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No messages found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredMessages.map((msg, idx) => (
                <motion.button
                  key={msg.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedMessage(msg)}
                  className={`w-full text-left p-4 border-l-4 transition-all hover:bg-gray-50 ${
                    selectedMessage?.id === msg.id
                      ? 'bg-blue-50 border-l-blue-600'
                      : msg.status === 'unread'
                        ? 'border-l-yellow-600 bg-yellow-50/50'
                        : 'border-l-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{msg.name}</p>
                      <p className="text-sm text-gray-600 truncate">{msg.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {getStatusIcon(msg.status)}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Message Detail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6"
        >
          {selectedMessage ? (
            <>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMessage.subject}</h2>
                  <p className="text-gray-600 mt-1">From: {selectedMessage.email}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    selectedMessage.status
                  )}`}
                >
                  {getStatusIcon(selectedMessage.status)}
                  {selectedMessage.status.charAt(0).toUpperCase() + selectedMessage.status.slice(1)}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-900">{selectedMessage.message}</p>
              </div>

              <div className="flex gap-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Reply
                </button>
                <button className="px-6 py-2 border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                  Mark as Resolved
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-96 text-center">
              <p className="text-gray-600">Select a message to view details</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
