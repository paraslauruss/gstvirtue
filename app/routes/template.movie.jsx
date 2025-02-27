import React from 'react';
import { Link } from '@remix-run/react';

export default function MovieTemplate() {
  return (
    <div>
      <h1>Movie Templates</h1>
      <ul>
        <li>
          <Link to="/invoice">Invoice Template</Link>
        </li>
      </ul>
    </div>
  );
}