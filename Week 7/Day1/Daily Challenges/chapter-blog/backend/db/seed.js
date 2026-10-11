import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Article from '../models/articles.js';
import User from '../models/users.js';
import connectDB from './connect.js';

dotenv.config();

async function seedDatabase() {
  try {
    await connectDB();
    
    await User.deleteMany({});
    await Article.deleteMany({});

    const adminPasswordHash = await bcrypt.hash('admin123', 10);
    const userPasswordHash = await bcrypt.hash('user123', 10);

    const admin = await User.create({
      name: 'Admin user',
      email: 'admin@example.com',
      passwordHash: adminPasswordHash,
      role: 'admin',
    });

    const user = await User.create({
      name: 'Regular Reader',
      email: 'user@example.com',
      passwordHash: userPasswordHash,
      role: 'user',
    });

    const articles = [
      {
        title: 'Designing with Purpose in 2026',
        excerpt: 'Explore how thoughtful typography and purposeful whitespace redefine user experience.',
        content: `Typography forms the backbone of digital interaction. A clean interface allows content to speak directly to the audience without unnecessary distractions.

Generous spacing and clear contrast are essential elements. By focusing on essential visual hierarchy, designers create environments where reading feels natural and enjoyable.

As design tools evolve, maintaining simplicity remains paramount. Striking a balance between functionality and minimalism is the true goal of modern interface design.`,
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
        category: 'Design',
        author: admin._id,
      },
      {
        title: 'Building Scalable Full-Stack Applications',
        excerpt: 'Key strategies for connecting React, SWR, and Express APIs efficiently.',
        content: `Architecture decisions early in a project set the tone for maintainability. Separating concerns between client and server layers keeps codebase manageable.

State management strategies, like leveraging SWR for data caching, eliminate the need for redundant local state. This ensures synchronized data across your components.

Security must never be an afterthought. Implementing HttpOnly cookies alongside strict authorization guards protects resources effectively.`,
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        category: 'Development',
        author: admin._id,
      },
      {
        title: 'Productivity Techniques for Developers',
        excerpt: 'How to manage cognitive load and maintain focused work during heavy coding sessions.',
        content: `Modern software development demands continuous mental context switching. Structuring daily work into bounded tasks reduces mental fatigue significantly.

Establishing visible visual checkpoints helps track progress without constant status checks. Breaking large features into single actions keeps momentum high.

Prioritizing clarity over complex setups ensures long-term consistency. Simple environments foster long-lasting output.`,
        imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
        category: 'Product',
        author: admin._id,
      },
      {
        title: 'The Art of Slow Travel',
        excerpt: 'Discovering remote locations while maintaining a productive remote workflow.',
        content: `Traveling while working requires intentional planning and discipline. Finding balance between exploration and output requires clear routines.

Reliable connectivity and quiet working spaces are critical considerations. Remote work grants flexibility when managed with clear boundaries.

Immersing yourself in local culture provides endless creative inspiration. Experiences outside the screen often solve complex engineering challenges.`,
        imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
        category: 'Travel',
        author: admin._id,
      },
      {
        title: 'Modern CSS with Tailwind CDN',
        excerpt: 'Speed up prototyping using utility-first CSS directly in your application.',
        content: `Utility-first CSS offers an intuitive approach to building custom responsive components without writing tedious custom rules.

Using utility classes speeds up iterations significantly during early prototype phases. You design directly inside your component files.

Maintaining consistent spacing, color schemes, and responsive breakpoints becomes automated through utility constraints.`,
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
        category: 'Development',
        author: admin._id,
      },
      {
        title: 'Culture and Design Systems',
        excerpt: 'How team culture shapes the design systems and products we deliver.',
        content: `Design systems reflect the values and communication style of the teams building them. Shared components require shared vocabulary.

Collaboration between designers and developers relies on mutual respect and ongoing feedback loops. Shared goals eliminate friction.

Documenting patterns ensures consistent user experiences across multiple products over time. Culture is the foundation of design quality.`,
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
        category: 'Culture',
        author: admin._id,
      },
    ];

    await Article.insertMany(articles);

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seedDatabase();