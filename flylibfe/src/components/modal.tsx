import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        padding: 24,
        borderRadius: 8,
        minWidth: 320,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}>
        {title && <h3>{title}</h3>}
        {children}
        <button onClick={onClose} style={{ marginTop: 16 }}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;