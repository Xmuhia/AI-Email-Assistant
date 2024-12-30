export const mockEmails = [
    {
        id: "1",
        from: "Peter Anderson",
        email: "peter.anderson@example.com",
        subject: "Project Update Meeting",
        content: `Hi Team,

I wanted to schedule a meeting to discuss the latest project updates. We've made significant progress on the frontend development, and I'd like to showcase some of the new features.

Key points to discuss:
- New UI components
- Performance improvements
- Upcoming deadlines

Please let me know your availability for tomorrow.

Best regards,
Peter`,
        date: "Mar 6",
        isUnread: true,
        category: "work",
        avatar: "avatar-1.jpg",
        attachments: []
    },
    {
        id: "2",
        from: "Sarah Wilson",
        email: "sarah.wilson@example.com",
        subject: "Design Review Feedback",
        content: `Hello,

I've reviewed the latest design mockups and have some feedback to share:

1. The color scheme works perfectly
2. We might need to adjust the mobile layout
3. The typography choices are excellent

Let's schedule a call to discuss these points in detail.

Best,
Sarah`,
        date: "Mar 5",
        isUnread: true,
        category: "design",
        avatar: "avatar-2.jpg",
        attachments: ["design-v1.pdf", "mockup.fig"]
    },
    {
        id: "3",
        from: "Tech Support",
        email: "support@company.com",
        subject: "System Maintenance Notice",
        content: `Important Notice:

Our systems will undergo scheduled maintenance this weekend. Please save all your work and expect some downtime during the following period:

Date: Saturday, March 9
Time: 10:00 PM - 2:00 AM EST

We apologize for any inconvenience.

Best regards,
IT Team`,
        date: "Mar 4",
        isUnread: true,
        category: "system",
        avatar: "avatar-3.jpg",
        attachments: []
    },
    {
        id: "4",
        from: "Marketing Team",
        email: "marketing@company.com",
        subject: "Q1 Campaign Results",
        content: `Hi everyone,

Here are the results from our Q1 marketing campaign:

- Email open rate: 28%
- Click-through rate: 12%
- Conversion rate: 3.5%

Full report attached.

Best regards,
Marketing Team`,
        date: "Mar 3",
        isUnread: true,
        category: "marketing",
        avatar: "avatar-4.jpg",
        attachments: ["Q1-Report.pdf"]
    },
    {
        id: "5",
        from: "Alex Johnson",
        email: "alex.j@example.com",
        subject: "Team Building Event",
        content: `Hey team!

I'm excited to announce our upcoming team building event:

When: Next Friday
Where: Central Park
Activities: Outdoor games, lunch, and group activities

Please RSVP by Wednesday.

Cheers,
Alex`,
        date: "Mar 2",
        isUnread: true,
        category: "social",
        avatar: "avatar-5.jpg",
        attachments: ["event-details.pdf"]
    }
];

export const emailCategories = {
    work: { label: "Work", badge: "primary" },
    design: { label: "Design", badge: "info" },
    system: { label: "System", badge: "warning" },
    marketing: { label: "Marketing", badge: "success" },
    social: { label: "Social", badge: "danger" }
};