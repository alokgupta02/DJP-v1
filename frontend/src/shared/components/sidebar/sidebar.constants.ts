import {
    Home,
    TriangleAlert,
    MessagesSquare,
    Vote,
    FileSignature,
    Users,
    Bell,
    ChartPie,
    User,
    Plus
} from "lucide-react";

import type { SidebarItem } from "./sidebar.types";

export const sidebarItems: SidebarItem[] = [
    {
        id: "home",
        label: "Home",
        path: "/",
        icon: Home
    },

    {
        id: "issues",
        label: "Issues",
        path: "/issues",
        icon: TriangleAlert
    },

    {
        id: "discussions",
        label: "Discussions",
        path: "/discussions",
        icon: MessagesSquare
    },

    {
        id: "polls",
        label: "Polls",
        path: "/polls",
        icon: Vote
    },

    {
        id: "petitions",
        label: "Petitions",
        path: "/petitions",
        icon: FileSignature
    },

    {
        id: "representatives",
        label: "Representatives",
        path: "/representatives",
        icon: Users
    },

    {
        id: "notifications",
        label: "Notifications",
        path: "/notifications",
        icon: Bell,
        badge: 1
    },

    {
        id: "insights",
        label: "Insights",
        path: "/insights",
        icon: ChartPie
    },

    {
        id: "profile",
        label: "Profile",
        path: "/profile",
        icon: User
    },
];

export const createAction = {
    label: "Create",
    icon: Plus
};