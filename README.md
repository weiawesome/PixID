# PixID - Smart Image Cropping Tool

<div align="center">

![PixID](https://img.shields.io/badge/PixID-Image%20Cropping-blue?style=for-the-badge)

**Quick cropping for social media avatars and ID photos**

[🌐 Live Demo](https://weiawesome.github.io/PixID/) | [📖 中文](README.zh.md) | [📖 English](README.md)

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/weiawesome/PixID)

</div>

## ✨ Features

### 🚀 Quick Upload
- **Drag & Drop**: Simply drag and drop images to upload
- **Click to Upload**: Traditional file picker support
- **Multiple Formats**: Supports JPEG, PNG, WebP, and HEIC formats
- **HEIC Support**: Automatic conversion from HEIC/HEIF to JPEG

### ✂️ Smart Cropping
- **Preset Sizes**: Multiple preset sizes for social media and ID photos
- **Custom Aspect Ratios**: Adjustable aspect ratios for flexible cropping
- **Zoom Control**: Mouse wheel zoom for precise adjustments
- **Rotation**: Rotate images 90° left or right
- **Real-time Preview**: See your changes instantly

### 📥 One-Click Export
- **High Quality**: Export images with high quality settings
- **Multiple Formats**: Export as JPEG, PNG, or WebP
- **Quick Download**: Instant download after cropping

## 🎯 Preset Sizes

### Social Media Avatars
- **Twitter/X**: 400×400 pixels
- **Facebook**: 720×720 pixels
- **Instagram**: 320×320 pixels
- **LinkedIn**: 400×400 pixels
- **YouTube**: 800×800 pixels
- **TikTok**: 200×200 pixels
- **Discord**: 128×128 pixels

### ID Photos
- **China 1-inch**: 25×35mm (295×413px @ 300 DPI)
- **China 2-inch**: 35×53mm (413×626px @ 300 DPI)
- **China Small 1-inch**: 22×32mm (260×378px @ 300 DPI)
- **US Passport**: 2×2 inches (600×600px @ 300 DPI)
- **International Passport**: 35×45mm (354×472px @ 300 DPI)
- **US Visa**: 2×2 inches (600×600px @ 300 DPI)
- **Driver's License**: 35×45mm (354×472px @ 300 DPI)
- **China ID Card**: 26×32mm (358×441px @ 350 DPI)
- **Resume Photo**: 35×45mm (413×531px @ 300 DPI)

## 🌍 Multi-language Support

PixID supports 5 languages:
- 繁體中文 (Traditional Chinese)
- 简体中文 (Simplified Chinese)
- English
- 日本語 (Japanese)
- 한국어 (Korean)

## 📸 Screenshots

### Preview
![Preview](assets/preview.png)

### Size Selection
![Size Selection](assets/size.png)

### Resize & Export
![Resize & Export](assets/resize_export.png)

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/weiawesome/PixID.git

# Navigate to the project directory
cd PixID

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 📦 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **i18next** - Internationalization
- **react-easy-crop** - Image cropping
- **heic2any** - HEIC format conversion

## 🎨 Features in Detail

### Image Upload
- Maximum file size: 10MB
- Supported formats: JPEG, PNG, WebP, HEIC/HEIF
- Automatic HEIC to JPEG conversion
- Multiple file selection support

### Image Cropping
- Interactive crop area with drag support
- Zoom in/out with mouse wheel
- Rotate 90° left or right
- Reset to default settings
- Real-time preview

### Export Options
- High-quality image export
- Multiple format support (JPEG, PNG, WebP)
- Custom quality settings

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Created by [tcweeei](https://github.com/tcweeei)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/weiawesome/PixID/issues).

## 📝 License

MIT © [tcweeei](https://github.com/tcweeei)
