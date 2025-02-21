"use client"

import React, { useState } from 'react';
import { getDomainOwner } from '@/service/server';
import Link from 'next/link';
export default function Home() {
  const response = getDomainOwner().then(res => {console.log(response)}).catch(err => {
     <Link to='/'/>;
  });

  return (
    <div>
      {
        response ? <p>Hello world</p> : <p>Invalid access</p>
      }
    </div>
    );
}
  