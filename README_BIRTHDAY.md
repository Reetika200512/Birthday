# 🎉 Spiti's Birthday Celebration Website

A fully immersive, interactive 3D birthday celebration website built for a special birthday surprise! 🎂✨

## 🚀 Features

### 🎨 Design & Visuals
- **Animated Gradient Background** - Smooth pastel gradient with smooth transitions
- **Floating Sparkles & Particles** - Magical floating effects throughout
- **3D Birthday Cake** - Interactive 3D cake built with Three.js featuring:
  - Multi-layer frosting
  - Animated candle flames
  - Rotation animation
  - Click to celebrate interaction
- **Cursor Parallax** - Elements follow mouse movement
- **Smooth Animations** - Framer Motion powered animations with glow and bounce effects

### 🎈 Interactive Elements
- **Floating Balloon Animation** - Colorful balloons float from bottom to top, clickable for pop effects
- **3D Cake Interaction** - Click the cake to trigger confetti and candle effects
- **Memory Photo Gallery** - Masonry grid layout with polaroid-style cards
  - Hover zoom animations
- **Lightbox Viewer** - Full-screen photo viewing with backdrop blur
- **Gift Box** - Interactive gift box that opens with celebration effects
- **Typewriter Message** - Special heartfelt message with typewriter animation

### 🎊 Effects
- **Confetti Explosion** - Page load, cake click, and button press confetti
- **Fireworks Animation** - Triggers when scrolling near the end
- **Floating Hearts** - Hearts float up during the special message section
- **Music Toggle** - Button to control background music

### 📱 Responsive Design
- Mobile-first approach
- Tablet optimized
- Desktop enhanced with parallax
- Smooth animations on all devices

## 🛠️ Tech Stack

- **React 18** - Component-based UI
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Three.js** - 3D graphics for cake
- **React Confetti** - Celebration effects
- **Lucide React** - Beautiful icons

## 📦 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The website will open at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

## 🖼️ Adding Personal Photos

### To customize the photo gallery:

1. Open `src/components/PhotoGallery.jsx`
2. Replace placeholder URLs in the `photos` array:

```javascript
const photos = [
  {
    id: 1,
    src: 'https://your-image-url.jpg',  // Replace with actual image URL
    caption: 'Your caption here',
  },
  // ... more photos
]
```

### Where to get image URLs:
- **Upload to hosting service**: Imgur, Cloudinary, AWS S3
- **Local files**: Place images in `public/` folder and reference with `/filename.jpg`
- **Cloud storage**: Google Drive, OneDrive (get shareable links)

Example with local files:
```javascript
{
  id: 1,
  src: '/memory1.jpg',
  caption: 'Us at the beach',
}
```

## 🎵 Adding Background Music

1. Place your music file in the `public/` folder (e.g., `hbd.mp3`)
2. Open `src/components/MusicToggle.jsx`
3. Uncomment and update the audio lines:

```javascript
const toggleMusic = () => {
  setIsPlaying(!isPlaying)
  audioRef.src = '/hbd.mp3'  // Your music file
  if (isPlaying) audioRef.pause()
  else audioRef.play()
}
```

## 🎨 Customizing Colors & Theme

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#667eea',      // Main purple
  secondary: '#764ba2',    // Darker purple
  accent: '#ff6b9d',       // Pink accent
  pastel: {
    pink: '#FFB6D9',
    purple: '#D8BFD8',
    lavender: '#E6E6FA',
    blue: '#ADD8E6',
  },
}
```

Or modify the gradient backgrounds directly in component files.

## 🎂 Customizing the 3D Cake

Edit `src/components/Cake3D.jsx` to change:
- Cake colors
- Layer heights
- Candle count
- Flame colors

```javascript
const material1 = new THREE.MeshStandardMaterial({
  color: 0xFF69B4,  // Change this to your color
})
```

## 📝 Editing the Special Message

In `src/components/SpecialMessage.jsx`, modify the `fullText` variable with your custom message.

## 🎁 Customizing the Gift Box Message

Edit the message inside `src/components/GiftBox.jsx`:

```javascript
<p className="text-lg md:text-xl text-gray-800 text-center leading-relaxed">
  Your custom message here 💖
</p>
```

## 🌟 Component Structure

```
src/
├── components/
│   ├── HeroSection.jsx          # Main greeting with parallax
│   ├── Cake3D.jsx               # 3D interactive cake
│   ├── BalloonAnimation.jsx      # Floating balloons
│   ├── PhotoGallery.jsx          # Memory photos with lightbox
│   ├── SpecialMessage.jsx        # Typewriter message
│   ├── GiftBox.jsx               # Interactive gift
│   ├── CelebrationSection.jsx    # Final celebration
│   ├── Fireworks.jsx             # Scroll-triggered fireworks
│   ├── MusicToggle.jsx           # Music control button
│   └── BackgroundEffects.jsx     # Global particle effects
├── App.jsx                       # Main app component
├── main.jsx                      # React entry point
├── index.css                     # Tailwind + custom styles
└── ...
```

## 🎯 Customization Checklist

- [ ] Update `index.html` title and metadata
- [ ] Add personal photos to PhotoGallery
- [ ] Customize special message in SpecialMessage component
- [ ] Update gift box message in GiftBox component
- [ ] Add your birthday cake colors if desired
- [ ] Add background music file
- [ ] Test on mobile devices
- [ ] Deploy to hosting service

## 🚀 Deployment

### Using Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Using GitHub Pages
1. Build: `npm run build`
2. Deploy `dist` folder to GitHub Pages

### Using Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 🎉 Features Breakdown

### Section 1: Hero Section
- Animated gradient background
- Glowing birthday message
- Parallax mouse tracking
- Heartfelt greeting card
- Floating sparkles

### Section 2: 3D Cake
- Interactive Three.js cake
- Slow rotation
- Animated flames with glow
- Click to celebrate feature
- Confetti on interaction

### Section 3: Photo Gallery
- Masonry layout
- Hover zoom effect
- Lightbox viewer
- Polaroid-style cards
- Responsive columns

### Section 4: Special Message
- Typewriter animation
- Floating hearts
- Backdrop blur card
- Custom heartfelt text

### Section 5: Gift Box
- Interactive click animation
- Opens to reveal message
- Celebration confetti
- Custom gift message

### Section 6: Celebration
- Floating emojis
- Make a wish section
- Blow candles button
- Continuous confetti

### Global Features
- Floating balloons (pop on click)
- Background sparkles
- Music toggle button
- Fireworks on scroll
- Smooth animations throughout

## 🐛 Troubleshooting

### Photos not loading?
- Check image URLs are correct
- Ensure images are accessible
- Test URL in browser first

### Three.js cake not rendering?
- Make sure Three.js is installed: `npm install three`
- Check browser console for errors
- Ensure WebGL is supported

### Animations janky on mobile?
- Animations are optimized for modern browsers
- Consider reducing particle count in BackgroundEffects.jsx
- Test on actual device

### Music not playing?
- Check file path is correct
- Ensure audio file format is supported
- Test in different browsers

## 📞 Support

For any issues or customizations needed, refer to the component files - they're well-commented and easy to modify!

## 💖 Made with Love

This website was created with passion to make a special birthday surprise. Every animation, effect, and interaction was carefully crafted to bring joy and create unforgettable memories.

**Happy Birthday Spiti!** 🎂✨🎉

---

**Version**: 2.0.0  
**Last Updated**: 2026  
**Status**: Production Ready 🚀