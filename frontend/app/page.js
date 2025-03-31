"use client";

import { useRouter } from "next/navigation";
import "./globals.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Welcome to the Dashboard</h1>
        <p className="dashboard-subtitle">Select a role to proceed</p>

        <div className="dashboard-buttons">
          <button className="btn-dark" onClick={() => router.push("/auth/login")}>
            Admin
          </button>
          <button className="btn-dark">HOD</button>
          <button className="btn-light">Course Coordinator</button>
          <button className="btn-light">Course Associate</button>
        </div>

        <p className="dashboard-footer">
          © 2025 | Sahyadri College of Engineering & Management. All rights reserved.
        </p>
      </div>
    </div>
  );
}
