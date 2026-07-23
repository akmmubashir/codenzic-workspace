

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/nav/AppLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { MyAttendance } from './pages/MyAttendance';
import { AttendanceMonitor } from './pages/AttendanceMonitor';
import { Leave } from './pages/Leave';
import { Employees } from './pages/Employees';
import { Projects } from './pages/Projects';
import { Board } from './pages/Board';
import { MyTasks } from './pages/MyTasks';
import { EOD } from './pages/EOD';
import { TeamEOD } from './pages/TeamEOD';
import { Chat } from './pages/Chat';
import { Announcements } from './pages/Announcements';
import { Reports } from './pages/Reports';
import { Roles } from './pages/Roles';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-attendance" element={<MyAttendance />} />
          <Route path="/attendance-monitor" element={<AttendanceMonitor />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/board" element={<Board />} />
          <Route path="/my-tasks" element={<MyTasks />} />
          <Route path="/eod" element={<EOD />} />
          <Route path="/team-eod" element={<TeamEOD />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>);

}