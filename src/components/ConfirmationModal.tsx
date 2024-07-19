import React from 'react';
import styled from '@emotion/styled';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  margin-top: 0;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:nth-of-type(1) {
    background-color: #dc3545;
    color: white;
  }

  &:nth-of-type(2) {
    background-color: #6c757d;
    color: white;
  }
`;

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  return !isOpen ? null : (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Confirm Deletion</ModalTitle>
        <p>Are you sure you want to delete this restaurant?</p>
        <div>
          <ModalButton onClick={onConfirm}>Delete</ModalButton>
          <ModalButton onClick={onCancel}>Cancel</ModalButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;
