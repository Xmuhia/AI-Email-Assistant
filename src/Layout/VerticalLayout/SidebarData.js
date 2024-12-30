const SidebarData = [
    {
        label: "Menu",
        isMainMenu: true,
    },
    {
        label: "Email",
        icon: "mdi mdi-email-outline",
        subItem: [
            { sublabel: "Inbox", link: "/inbox" },
            { sublabel: "Email Compose", link: "/compose-email" },
        ],
    },
]

export default SidebarData;