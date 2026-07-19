import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, Navigate, } from "react-router-dom";
import { AppLayout } from "../../shared/components/layout";
import AuthLayout from "../../app/layouts/AuthLayout";
import LoginPage from "../../features/auth/LoginPage";
import SignupPage from "../../features/auth/SignupPage";
import OTPPage from "../../features/auth/OTPPage";
import Step1BasicInfo from "../../features/auth/onboarding/Step1BasicInfo";
import Step2Location from "../../features/auth/onboarding/Step2Location";
import Step3About from "../../features/auth/onboarding/Step3About";
import FeedPage from "../../features/feed/FeedPage";
import IssuesPage from "../../features/issues/IssuesPage";
import IssueDetailPage from "../../features/issues/IssueDetailPage";
import CreateIssuePage from "../../features/issues/CreateIssuePage";
import DiscussionsPage from "../../features/discussions/DiscussionsPage";
import DiscussionDetailPage from "../../features/discussions/DiscussionDetailPage";
import CreateDiscussionPage from "../../features/discussions/CreateDiscussionPage";
import PollsPage from "../../features/polls/PollsPage";
import CreatePollPage from "../../features/polls/CreatePollPage";
import RepresentativesPage from "../../features/representatives/RepresentativesPage";
import NotificationsPage from "../../features/notifications/NotificationsPage";
import PetitionsPage from "../../features/petitions/PetitionsPage";
import InsightsPage from "../../features/insights/InsightsPage";
import ProfilePage from "../../features/profile/ProfilePage";
import NotFoundPage from "../../features/NotFoundPage";
export const router = createBrowserRouter([
    {
        element: _jsx(AppLayout, {}),
        children: [
            {
                index: true,
                element: _jsx(Navigate, { to: "/feed", replace: true }),
            },
            {
                path: "/feed",
                element: _jsx(FeedPage, {}),
            },
            {
                path: "/issues",
                element: _jsx(IssuesPage, {}),
            },
            {
                path: "/issues/new",
                element: _jsx(CreateIssuePage, {}),
            },
            {
                path: "/issues/:id",
                element: _jsx(IssueDetailPage, {}),
            },
            {
                path: "/discussions",
                element: _jsx(DiscussionsPage, {}),
            },
            {
                path: "/discussions/new",
                element: _jsx(CreateDiscussionPage, {}),
            },
            {
                path: "/discussions/:id",
                element: _jsx(DiscussionDetailPage, {}),
            },
            {
                path: "/polls",
                element: _jsx(PollsPage, {}),
            },
            {
                path: "/polls/new",
                element: _jsx(CreatePollPage, {}),
            },
            {
                path: "/profile",
                element: _jsx(ProfilePage, {}),
            },
            {
                path: "/representatives",
                element: _jsx(RepresentativesPage, {}),
            },
            {
                path: "/notifications",
                element: _jsx(NotificationsPage, {}),
            },
            {
                path: "/petitions",
                element: _jsx(PetitionsPage, {}),
            },
            {
                path: "/insights",
                element: _jsx(InsightsPage, {}),
            }
        ],
    },
    {
        element: _jsx(AuthLayout, {}),
        children: [
            { path: "/login", element: _jsx(LoginPage, {}) },
            { path: "/signup", element: _jsx(SignupPage, {}) },
            { path: "/otp", element: _jsx(OTPPage, {}) },
        ],
    },
    { path: "/onboarding/basic-info", element: _jsx(Step1BasicInfo, {}) },
    { path: "/onboarding/location", element: _jsx(Step2Location, {}) },
    { path: "/onboarding/about", element: _jsx(Step3About, {}) },
    {
        path: "*",
        element: _jsx(NotFoundPage, {}),
    },
]);
