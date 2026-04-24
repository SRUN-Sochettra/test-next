# test-next
# frontend: test-next + backend: basic spring-boot

> Employee & Product Management Interface

## [ SYSTEM SPECIFICATIONS ]
- **Framework**: Next.js 16.2.2
- **Core Library**: React 19.2.4
- **Compilation**: Babel Plugin React Compiler 1.0.0
- **Styling Engine**: Tailwind CSS v4
- **Notification System**: React Hot Toast 2.6.0
- **Authentication**: Custom `AuthContext` integrated at root layout

## [ ARCHITECTURE ]
- App Router implementation via `src/app/`
- Root layout configured with dark-themed notification toasters (`#1f2937` background, `#374151` border).
- Global authentication state wrapped via `<AuthProvider>`.

## [ DEPLOYMENT PROTOCOLS ]

### Dependency Installation
```bash
npm install
```

### Development Environment
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Code Quality Enforcement
```bash
npm run lint
```

## [ MAINTAINER ]
**GitHub:** [@SRUN-Sochettra](https://github.com/SRUN-Sochettra)
