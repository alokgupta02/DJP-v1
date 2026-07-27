import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";

import { AppLayout } from "../../shared/components/layout";
import AuthLayout from "../../app/layouts/AuthLayout";

// Lazy-loaded route components for code splitting
const LoginPage = lazy(() => import("../../features/auth/LoginPage"));
const SignupPage = lazy(() => import("../../features/auth/SignupPage"));
const OTPPage = lazy(() => import("../../features/auth/OTPPage"));
const Step1BasicInfo = lazy(() => import("../../features/auth/onboarding/Step1BasicInfo"));
const Step2Location = lazy(() => import("../../features/auth/onboarding/Step2Location"));
const Step3About = lazy(() => import("../../features/auth/onboarding/Step3About"));
const OnboardingProvider = lazy(() => import("../../features/auth/onboarding/OnboardingProvider"));

const FeedPage = lazy(() => import("../../features/feed/FeedPage"));

const IssuesPage = lazy(() => import("../../features/issues/IssuesPage"));
const IssueDetailPage = lazy(() => import("../../features/issues/IssueDetailPage"));
const CreatePostPage = lazy(() => import("../../features/create/CreatePostPage"));
const DiscussionsPage = lazy(() => import("../../features/discussions/DiscussionsPage"));
const DiscussionDetailPage = lazy(() => import("../../features/discussions/DiscussionDetailPage"));
const PollsPage = lazy(() => import("../../features/polls/PollsPage"));
const PollDetailPage = lazy(() => import("../../features/polls/PollDetailPage"));
const RepresentativesPage = lazy(() => import("../../features/representatives/RepresentativesPage"));
const NotificationsPage = lazy(() => import("../../features/notifications/NotificationsPage"));
const PetitionsPage = lazy(() => import("../../features/petitions/PetitionsPage"));
const InsightsPage = lazy(() => import("../../features/insights/InsightsPage"));
const ProfilePage = lazy(() => import("../../features/profile/ProfilePage"));

const NotFoundPage = lazy(() => import("../../features/NotFoundPage"));

// Skeleton loader for lazy loading
function PageSkeleton() {
  return (
    <div className="flex-1 p-8 flex items-center justify-center">
      <div className="animate-pulse space-y-6 w-full max-w-3xl">
        <div className="h-8 bg-[var(--color-bg-subtle)] rounded w-1/4"></div>
        <div className="h-4 bg-[var(--color-bg-subtle)] rounded w-1/2"></div>
        <div className="h-4 bg-[var(--color-bg-subtle)] rounded w-1/3"></div>
        <div className="h-4 bg-[var(--color-bg-subtle)] rounded w-full"></div>
        <div className="h-4 bg-[var(--color-bg-subtle)] rounded w-full"></div>
        <div className="h-4 bg-[var(--color-bg-subtle)] rounded w-3/4"></div>
      </div>
    </div>
  );
}

// Wrapper to add Suspense boundary
function withSuspense(Component: React.ComponentType) {
  return () => (
    <Suspense fallback={<PageSkeleton />}>
      <Component />
    </Suspense>
  );
}

const FeedPageWithSuspense = withSuspense(FeedPage);
const IssuesPageWithSuspense = withSuspense(IssuesPage);
const IssueDetailPageWithSuspense = withSuspense(IssueDetailPage);
const CreatePostPageWithSuspense = withSuspense(CreatePostPage);
const DiscussionsPageWithSuspense = withSuspense(DiscussionsPage);
const DiscussionDetailPageWithSuspense = withSuspense(DiscussionDetailPage);
const PollsPageWithSuspense = withSuspense(PollsPage);
const PollDetailPageWithSuspense = withSuspense(PollDetailPage);
const RepresentativesPageWithSuspense = withSuspense(RepresentativesPage);
const NotificationsPageWithSuspense = withSuspense(NotificationsPage);
const PetitionsPageWithSuspense = withSuspense(PetitionsPage);
const InsightsPageWithSuspense = withSuspense(InsightsPage);
const ProfilePageWithSuspense = withSuspense(ProfilePage);
const LoginPageWithSuspense = withSuspense(LoginPage);
const SignupPageWithSuspense = withSuspense(SignupPage);
const OTPPageWithSuspense = withSuspense(OTPPage);
const Step1BasicInfoWithSuspense = withSuspense(Step1BasicInfo);
const Step2LocationWithSuspense = withSuspense(Step2Location);
const Step3AboutWithSuspense = withSuspense(Step3About);
const OnboardingProviderWithSuspense = withSuspense(OnboardingProvider);
const NotFoundPageWithSuspense = withSuspense(NotFoundPage);

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
        element: <FeedPageWithSuspense />,
      },
      {
        path: "/submit",
        element: <CreatePostPageWithSuspense />,
      },

      {
        path: "/issues",
        element: <IssuesPageWithSuspense />,
      },
      {
        path: "/issues/new",
        element: <Navigate to="/submit?type=issue" replace />,
      },
      {
        path: "/issues/:id",
        element: <IssueDetailPageWithSuspense />,
      },

      {
        path: "/discussions",
        element: <DiscussionsPageWithSuspense />,
      },
      {
        path: "/discussions/new",
        element: <Navigate to="/submit?type=discussion" replace />,
      },
      {
        path: "/discussions/:id",
        element: <DiscussionDetailPageWithSuspense />,
      },

      {
        path: "/polls",
        element: <PollsPageWithSuspense />,
      },
      {
        path: "/polls/new",
        element: <Navigate to="/submit?type=poll" replace />,
      },
      {
        path: "/polls/:id",
        element: <PollDetailPageWithSuspense />,
      },

      {
        path: "/profile",
        element: <ProfilePageWithSuspense />,
      },
      {
        path: "/profile/:id",
        element: <ProfilePageWithSuspense />,
      },
      {
        path: "/representatives",
        element: <RepresentativesPageWithSuspense />,
      },
      {
        path: "/notifications",
        element: <NotificationsPageWithSuspense />,
      },
      {
        path: "/petitions",
        element: <PetitionsPageWithSuspense />,
      },
      {
        path: "/insights",
        element: <InsightsPageWithSuspense />,
      }
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPageWithSuspense /> },
      { path: "/signup", element: <SignupPageWithSuspense /> },
      { path: "/otp", element: <OTPPageWithSuspense /> },
    ],
  },

  {
    path: "/onboarding",
    element: <OnboardingProviderWithSuspense />,
    children: [
      { path: "basic-info", element: <Step1BasicInfoWithSuspense /> },
      { path: "location", element: <Step2LocationWithSuspense /> },
      { path: "about", element: <Step3AboutWithSuspense /> },
    ],
  },


  {
    path: "*",
    element: <NotFoundPageWithSuspense />,
  },
]);
