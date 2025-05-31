# Next.js 14 Fullstack Application

A modern fullstack application built with Next.js 14, TypeScript, TailwindCSS, Shadcn UI, and Supabase.

## Features

- 🚀 Next.js 14 with App Router
- 💎 TypeScript for type safety
- 🎨 TailwindCSS for styling
- 🎯 Shadcn UI components
- 🔐 Supabase for backend and authentication
- 📱 Responsive design
- 🔄 Server Components by default
- 🏗️ Clean project structure

## Project Structure

```
src/
├── frontend/
│   ├── app/          # App Router pages
│   ├── components/   # Shared UI components
│   ├── lib/         # Frontend utilities
│   └── types/       # Frontend type definitions
├── backend/
│   ├── components/  # Backend components
│   ├── lib/        # Backend utilities
│   ├── types/      # Backend type definitions
│   └── supabase/   # Supabase client and server logic
```

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Deployment

This project is configured for deployment on Vercel. Simply connect your repository to Vercel and it will automatically deploy your application.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
