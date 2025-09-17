# tud-new-timetable

## Rehosting of an alternative TU Dublin TimeTable

### Deployment

This application is configured for deployment on Vercel. 

#### Deploy to Vercel

1. **Using Vercel CLI:**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Using Vercel Dashboard:**
   - Connect your GitHub repository to Vercel
   - The build settings are automatically detected from `vercel.json`
   - Deploy with one click

3. **Manual Build:**
   ```bash
   npm install
   npm run build
   ```

#### Configuration

- **Framework:** Create React App
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`

The app uses HashRouter for client-side routing and is optimized for static hosting on Vercel.
