"use client"

import React, { useState } from 'react';

export default function Home() {

  const [form, setForm] = useState({
    companyDomain: '',
    username: '',
    password: ''
  });

  return (
    <div>
      <div className="w-[100%] h-[100%] px-[80px] py-[40px] bg-[#0080B3]">
      <div className="flex">
        <div className="flex w-[50%] items-center justify-center">
          <img src='./images/filming_stock_photo.png' className="rounded-lg"/>
        </div>
        <div className="flex w-[50%] items-center justify-center bg-[#2B709B] rounded-lg">
          <div className="w-[75%] flex flex-col items-center">
            <img src="./images/main_horizontal.png" className="rounded-lg w-[50%] h-[50%] mb-8" alt="Logo" />
            <div className="flex w-full bg-[#1d4964] h-[100%] justify-center rounded-2xl">
              <div className="w-[80%] px-5 py-[50px]">
                <h2 className="text-2xl text-white mb-4 text-center font-mono">Welcome Back</h2>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-white text-sm font-mono">Company Domain</label>
                  <input type="text" id="username" name="username" value={form.companyDomain} onChange={e => setForm({...form, companyDomain: e.target.value})} className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-300 text-gray-800" />
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-white text-sm font-mono">Username</label>
                  <input type="text" id="username" name="username" value={form.username} onChange={e => setForm({...form, username: e.target.value})} className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-300 text-gray-800" />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-white text-sm font-mono">Password</label>
                  <input type="password" id="password" name="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-300 text-gray-800" />
                </div>
                <button className="w-full bg-[#047eb3] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#047eb37e] font-mono mt-4">Login</button>
                <p className="text-center mt-5 font-mono">Do not have an account? <a href='/signup' className="text-[#047eb3] hover:underline">Sign up</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    
  );
}
