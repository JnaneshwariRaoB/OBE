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

      <style jsx>{`
        .dashboard-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
        }
        .dashboard-content {
          text-align: center;
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .dashboard-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .dashboard-subtitle {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 20px;
        }
        .dashboard-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .btn-dark {
          background-color: #333;
          color: white;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 1rem;
          border-radius: 5px;
          transition: background 0.3s;
        }
        .btn-dark:hover {
          background-color: #555;
        }
        .btn-light {
          background-color: #ddd;
          color: black;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 1rem;
          border-radius: 5px;
          transition: background 0.3s;
        }
        .btn-light:hover {
          background-color: #bbb;
        }
        .dashboard-footer {
          margin-top: 20px;
          font-size: 0.9rem;
          color: #888;
        }
      `}</style>
    </div>
  );
}