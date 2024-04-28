'use client';

import { deleteTransaction } from '../app/actions/deleteTransaction';
import { Button } from './ui/Button';
import { X, Loader } from 'lucide-react';
import { useState } from 'react';

interface ITransactionItemRemoveButton {
  id: string;
  onRemoved: () => void;
}

export default function TransactionItemRemoveButton({
  id,
  onRemoved,
}: ITransactionItemRemoveButton) {
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const handleClick = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    try {
      setLoading(true);
      await deleteTransaction(id);
      onRemoved();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      size='sm'
      variant={confirmed ? 'danger' : 'ghost'}
      onClick={handleClick}
      aria-disabled={loading}
    >
      {!loading && <X className='w-4 h-4' />}
      {loading && <Loader className='w-4 h-4 animate-spin' />}
    </Button>
  );
}
