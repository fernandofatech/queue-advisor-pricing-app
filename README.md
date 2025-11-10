# QueueAdvisor

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://queueadvisor.fernando.moretes.com)
[![Open Source](https://img.shields.io/badge/Open-Source-green?style=for-the-badge)](https://github.com/fernandofatech/queue-advisor-pricing-app)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-orange?style=for-the-badge)](https://github.com/fernandofatech/queue-advisor-pricing-app/issues)

> 🚀 **Open Source MVP** - An independent tool that aggregates AWS information to help you choose between Amazon SQS and Apache Kafka (MSK)

## About This Project

**QueueAdvisor** is an open-source MVP project that combines existing AWS documentation, pricing information, and best practices into a helpful decision-making tool. Built by AWS Solutions Architect Fernando Francisco Azevedo as a learning experience and community contribution.

### Important Disclaimer

⚠️ **This is an independent project** that aggregates publicly available information. All AWS services, Model Context Protocol (MCP), and documentation are property of their respective owners. This tool simply combines existing resources to help with architecture decisions.

## Features

### Core Features
- 🎯 **Smart Decision Algorithm** based on AWS best practices and real-world use cases
- 📊 **Visual Comparisons** with interactive Radar and Bar charts (Recharts)
- 🌎 **9 AWS Regions** with accurate regional pricing data
- 💰 **AWS Free Tier Support** with validation and warnings
- 📱 **Fully Responsive Design** optimized for mobile, tablet, and desktop

### Analysis & Export
- 💾 **Save & Compare Analyses** - Store up to 10 analyses and compare them side-by-side
- 📥 **Multiple Export Formats** - PNG, Markdown, CSV, and JSON
- 🔗 **Share Functionality** - Native sharing and social media integration
- 🎨 **Print-Optimized** - Beautiful print formatting for reports

### User Experience
- 🚀 **5 Preset Configurations** - Free Tier, Microservices, Event Streaming, Cost Effective, High Throughput
- 🌐 **Bilingual Support** - Full English and Portuguese translations
- ✨ **Beautiful UI** with Framer Motion animations and toast notifications
- 🎨 **Dark/Light Theme** support
- ⚡ **Fast & Lightweight** - Optimized for performance

### Technical
- 🤖 **MCP Integration Resources** and tips for AI-assisted workflows
- 📖 **Comprehensive Documentation** - Business and technical guides
- 🔄 **Real-time Pricing Calculations** based on your usage patterns
- 🎭 **Multi-step Wizard** for guided configuration

## Credits

All credits go to:

- **AWS** - Amazon SQS, Amazon MSK, and all AWS services
- **AWS Labs** - Model Context Protocol (MCP)
- **Apache Software Foundation** - Apache Kafka
- **Open Source Community** - Next.js, React, TypeScript, Tailwind CSS, and many other libraries

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI
- **Charts**: Recharts
- **Animations**: Framer Motion

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/fernandofatech/queue-advisor-pricing-app.git
cd queue-advisor-pricing-app

# Install dependencies (using pnpm)
pnpm install

# Or using npm
npm install
```

### Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## Key Pages

- **`/`** - Homepage with comparison form and preset configurations
- **`/compare`** - View and compare saved analyses with charts
- **`/docs`** - Comprehensive documentation and AWS resources
- **`/how-it-works`** - Explanation of the recommendation algorithm
- **`/faq`** - Frequently asked questions
- **`/credits`** - Credits and acknowledgments

## Contributing

This is an open-source project and **contributions are welcome**!

- 🐛 Found a bug? [Open an issue](https://github.com/fernandofatech/queue-advisor-pricing-app/issues)
- 💡 Have an idea? [Start a discussion](https://github.com/fernandofatech/queue-advisor-pricing-app/discussions)
- 🔧 Want to contribute? [Submit a pull request](https://github.com/fernandofatech/queue-advisor-pricing-app/pulls)

## Project Goals

This MVP was created to:

1. **Aggregate AWS Information** - Combine scattered documentation into one place
2. **Learn and Share** - Personal learning experience shared with the community
3. **Help Developers** - Make architecture decisions easier
4. **Promote MCP** - Share resources about AWS Model Context Protocol

## License

This project is open source and available under the MIT License.

## Contact

### Fernando Francisco Azevedo

- Portfolio: [fernando.moretes.com](https://fernando.moretes.com)
- GitHub: [@fernandofatech](https://github.com/fernandofatech)
- LinkedIn: [fernando-francisco-azevedo](https://www.linkedin.com/in/fernando-francisco-azevedo)

---

**Note**: This project aggregates information from AWS and other sources. Always consult official AWS documentation and architects for production deployments.
