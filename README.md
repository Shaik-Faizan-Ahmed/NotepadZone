# NotepadZone

A modern, cloud-synced note-taking application built with Next.js and Firebase. NotepadZone provides a clean, intuitive interface for creating, managing, and organizing your notes with real-time synchronization across devices.

🚀 **Live Demo**: [https://notepad-zone.vercel.app/](https://notepad-zone.vercel.app/)

## Features

- **Real-time Synchronization** - Notes are automatically synced across all devices using Firebase Firestore
- **Dark Mode Support** - Toggle between light and dark themes with persistent preference storage
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Quick Actions** - View, copy, and delete notes with a single click
- **Timestamp Tracking** - Automatic timestamp recording for all notes
- **Password Protection** - Secure deletion with password verification
- **Clean UI** - Modern, distraction-free interface inspired by physical sticky notes

## Tech Stack

- **Framework**: Next.js 15.2.4 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Firebase Firestore
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ or compatible runtime
- pnpm (recommended) or npm/yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Shaik-Faizan-Ahmed/NotepadZone.git
cd NotepadZone
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Update the Firebase configuration in `lib/firebase.ts` with your project credentials

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
NotepadZone/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main application page
│   ├── layout.tsx         # Root layout component
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components (Radix-based)
│   └── theme-provider.tsx # Theme management
├── lib/                   # Utility libraries
│   ├── firebase.ts       # Firebase configuration
│   └── utils.ts          # Helper functions
├── hooks/                # Custom React hooks
├── public/               # Static assets
└── styles/               # Additional stylesheets
```

## Usage

### Adding a Note
1. Type your note in the text area on the homepage
2. Click the "Add Note" button
3. Your note will automatically sync to the cloud

### Managing Notes
- **View**: Click the "View" button to see the full note content
- **Copy**: Click the "Copy" button to copy note text to clipboard
- **Delete**: Click the "Delete" button and enter the password when prompted

### Theme Toggle
Click the sun/moon icon in the navigation bar to switch between light and dark modes.

## Environment Variables

If you need to use environment variables for Firebase configuration (recommended for production), create a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)
- Backend powered by [Firebase](https://firebase.google.com/)

---

**Note**: For security purposes, ensure you rotate your Firebase credentials and implement proper security rules in production environments.
