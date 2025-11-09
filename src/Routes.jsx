import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AptitudeAssessment from './pages/aptitude-assessment';
import CollegeDetails from './pages/college-details';
import AIChatAssistant from './pages/ai-chat-assistant';
import TimelineTracker from './pages/timeline-tracker';
import CareerExploration from './pages/career-exploration';
import StudentDashboard from './pages/student-dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const Routes = () => {
  return (
    // use Vite's BASE_URL so the router works both in dev ("/") and when built with a base (e.g. "/Edupath/")
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIChatAssistant />} />
        <Route path="/aptitude-assessment" element={<AptitudeAssessment />} />
        <Route path="/college-details" element={<CollegeDetails />} />
        <Route path="/ai-chat-assistant" element={<AIChatAssistant />} />
        <Route path="/timeline-tracker" element={<TimelineTracker />} />
        <Route path="/career-exploration" element={<CareerExploration />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
  <Route path="/auth/login" element={<Login />} />
  <Route path="/auth/register" element={<Register />} />
  <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
