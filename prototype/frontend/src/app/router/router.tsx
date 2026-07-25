import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import { AppLayout } from "../../shared/components/layout";
import AuthLayout from "../../app/layouts/AuthLayout";

import LoginPage from "../../features/auth/LoginPage";
import SignupPage from "../../features/auth/SignupPage";
import OTPPage from "../../features/auth/OTPPage";
import Step1BasicInfo from "../../features/auth/onboarding/Step1BasicInfo";
import Step2Location from "../../features/auth/onboarding/Step2Location";
import Step3About from "../../features/auth/onboarding/Step3About";
import { OnboardingProvider } from "../../features/auth/onboarding/OnboardingContext";

import FeedPage from "../../features/feed/FeedPage";

import IssuesPage from "../../features/issues/IssuesPage";
import IssueDetailPage from "../../features/issues/IssueDetailPage";
import CreatePostPage from "../../features/create/CreatePostPage";
import DiscussionsPage from "../../features/discussions/DiscussionsPage";
import DiscussionDetailPage from "../../features/discussions/DiscussionDetailPage";
import PollsPage from "../../features/polls/PollsPage";
import RepresentativesPage from "../../features/representatives/RepresentativesPage";
import NotificationsPage from "../../features/notifications/NotificationsPage";
import PetitionsPage from "../../features/petitions/PetitionsPage";
import InsightsPage from "../../features/insights/InsightsPage";
import ProfilePage from "../../features/profile/ProfilePage";

import NotFoundPage from "../../features/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/feed" replace />,
      },

      {
        path: "/feed",
        element: <FeedPage />,
      },
      {
        path: "/submit",
        element: <CreatePostPage />,
      },

      {
        path: "/issues",
        element: <IssuesPage />,
      },
      {
        path: "/issues/new",
        element: <Navigate to="/submit?type=issue" replace />,
      },
      {
        path: "/issues/:id",
        element: <IssueDetailPage />,
      },

      {
        path: "/discussions",
        element: <DiscussionsPage />,
      },
      {
        path: "/discussions/new",
        element: <Navigate to="/submit?type=discussion" replace />,
      },
      {
        path: "/discussions/:id",
        element: <DiscussionDetailPage />,
      },

      {
        path: "/polls",
        element: <PollsPage />,
      },
      {
        path: "/polls/new",
        element: <Navigate to="/submit?type=poll" replace />,
      },

      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/representatives",
        element: <RepresentativesPage />,
      },
      {
        path: "/notifications",
        element: <NotificationsPage />,
      },
      {
        path: "/petitions",
        element: <PetitionsPage />,
      },
      {
        path: "/insights",
        element: <InsightsPage />,
      }
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/otp", element: <OTPPage /> },
    ],
  },

  {
    path: "/onboarding",
    element: <OnboardingProvider />,
    children: [
      { path: "basic-info", element: <Step1BasicInfo /> },
      { path: "location", element: <Step2Location /> },
      { path: "about", element: <Step3About /> },
    ],
  },


  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
