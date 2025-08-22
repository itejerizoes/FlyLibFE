import { useState } from 'react';

export function useModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<React.ReactNode>(null);

  const showModal = (title: string, content: React.ReactNode) => {
    setTitle(title);
    setContent(content);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  return { open, title, content, showModal, closeModal };
}