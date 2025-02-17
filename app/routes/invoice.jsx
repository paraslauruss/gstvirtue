import React from 'react';
import { Outlet } from '@remix-run/react';

export default function Invoice() {
  return (
    <div>
      <h1>Invoice Section</h1>
      <InvoicePreview />
    </div>
  );
}