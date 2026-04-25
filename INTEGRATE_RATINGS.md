# Adding Ratings to Your Projects and Blog Pages

This guide shows how to integrate the RatingWidget component into your projects and blog pages to allow visitors to rate your work.

## Step 1: Import the RatingWidget

Add this import at the top of your projects page (`src/app/projects/page.tsx`):

```typescript
import RatingWidget from '@/components/RatingWidget';
```

## Step 2: Add RatingWidget to Project Cards

In your project card JSX, add the widget below the project description:

### Projects Page Example

```typescript
{projects.map((project) => (
  <article key={project.id} className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-200/10 opacity-0 transition group-hover:opacity-100" />
    <div className="relative space-y-4">
      <span className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
        {project.role}
      </span>
      <h2 className="text-2xl font-semibold text-slate-900">{project.name}</h2>
      <p className="text-slate-600 leading-7">{project.summary}</p>
      <p className="text-sm text-slate-500">{project.tech}</p>
      
      {/* Add RatingWidget here */}
      <RatingWidget
        itemId={project.id}
        itemType="project"
        averageRating={project.averageRating || 0}
        totalRatings={project.totalRatings || 0}
        userRatings={project.ratings}
      />
    </div>
  </article>
))}
```

### Blog Page Example

```typescript
{articles.map((article, index) => (
  <article
    key={article.id}
    className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 animate-slide-up dark:bg-slate-900 dark:border-slate-700 dark:hover:border-blue-800"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <div className="flex items-start justify-between gap-4 mb-4">
      <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
        {article.category}
      </span>
      <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
        {article.readTime}
      </span>
    </div>

    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
      {article.title}
    </h2>

    <p className="text-slate-600 dark:text-slate-400 leading-7 mb-6">
      {article.excerpt}
    </p>

    <div className="flex items-center justify-between mb-4">
      <time className="text-sm text-slate-500 dark:text-slate-400">
        {article.date}
      </time>
      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm group-hover-scale transition-all">
        {t.readMore}
      </button>
    </div>

    {/* Add RatingWidget here */}
    <RatingWidget
      itemId={article.id}
      itemType="article"
      averageRating={article.averageRating || 0}
      totalRatings={article.totalRatings || 0}
      userRatings={article.ratings}
    />
  </article>
))}
```

## Step 3: Update Type Definitions

Make sure your Project and BlogArticle interfaces include rating properties:

```typescript
interface Project {
  id: string;
  name: string;
  role: string;
  summary: string;
  tech: string;
  averageRating?: number;
  totalRatings?: number;
  ratings?: any[];
}

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  averageRating?: number;
  totalRatings?: number;
  ratings?: any[];
}
```

## RatingWidget Props

| Prop | Type | Description |
|------|------|-------------|
| `itemId` | string | ID of project or article |
| `itemType` | 'project' \| 'article' | Type of item being rated |
| `averageRating` | number | Current average rating (0-5) |
| `totalRatings` | number | Total number of ratings |
| `userRatings` | array | Array of rating objects to display |

## Sample Rating Object Structure

```typescript
{
  id: "rating_1",
  score: 5,
  userName: "John Doe",
  userEmail: "john@example.com",
  comment: "Great project!",
  createdAt: "2026-04-20"
}
```

## Styling Customization

The RatingWidget is fully responsive and supports dark mode. You can customize colors by editing the component:

- Star color (active): `fill-yellow-400`
- Star color (inactive): `fill-slate-300`
- Background: `bg-slate-100 dark:bg-slate-800`
- Borders: `border-slate-200 dark:border-slate-700`

## Features

✨ **User Experience:**
- 5-star rating system
- Optional comments
- Name required (spam prevention)
- Hover effects for better UX
- Smooth animations

📊 **Admin Benefits:**
- See all ratings submitted
- Track engagement
- Moderate inappropriate content
- Calculate average scores automatically
- View recent ratings at a glance

🎨 **Design:**
- Responsive layout
- Dark mode support
- Accessible (proper semantic HTML)
- Tailwind CSS styling
- Mobile-friendly form

## Testing the Rating System

1. Start your dev server: `npm run dev`
2. Navigate to a project or article page
3. Click the "Rate" button
4. Submit a 5-star rating with your name
5. View your rating displayed!
6. Go to admin panel to see it listed
7. Delete inappropriate ratings as needed

## Known Limitations

- Currently, a user can rate the same item multiple times
- No email verification for ratings
- Ratings are sorted by newest first

## Future Enhancements

- One-time rating per user (IP or cookie-based)
- Email verification for ratings
- Rating approval workflow
- Spam detection
- Rating analytics dashboard
- Export ratings as CSV

## Troubleshooting

### Rating widget not appearing
Make sure:
1. Fetched data includes `averageRating`, `totalRatings`, `ratings` fields
2. API returns proper format from `/api/admin/projects` or `/api/admin/blog`
3. Component is imported correctly

### Rating submission fails
Check:
1. Browser console for errors
2. Network tab to see API response
3. Database is running and seeded
4. All environment variables are set

### Ratings not updating
Ratings display after page refresh. Consider:
1. Adding real-time updates with WebSocket
2. Implementing optimistic UI updates
3. Auto-refresh data every 30 seconds

---

## Next Steps

1. ✅ Integrate RatingWidget on pages
2. Add analytics dashboard for ratings
3. Implement automatic email notifications
4. Create rating moderation workflow
5. Add rating filters and sorting
