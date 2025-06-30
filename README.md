# Travel Tracer 🌍✈️

## Overview

Travel Tracer is an interactive web application that allows users to visualize and share their travel experiences by marking visited locations and dream destinations on an interactive world map.

Live Demo: [travel.carlossousa.tech](https://travel.carlossousa.tech/)

## Features

- 🗺️ Interactive world map using Leaflet
- 📍 Mark visited countries and future travel destinations
- 📸 Potential for adding travel photos and notes
- 🌐 Responsive design
- 🐳 Docker support for easy deployment

## Technologies Used

- React
- Leaflet
- JSON for data management
- Docker
- Docker Compose

## Prerequisites

- Node.js (v18 or later)
- Docker (optional, for containerized deployment)

## Local Development Setup

### Manual Setup

1. Clone the repository
   ```bash
   git clone https://github.com/zebrajr/traveltracer.git
   cd travel-tracer/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

### Docker Development Setup

1. Ensure Docker and Docker Compose are installed

2. Start development environment
   ```bash
   docker-compose up dev
   ```

## Production Deployment

### Docker Deployment

1. Build and run production container
   ```bash
   docker-compose up traveltracer
   ```
Note: you can force rebuild if needed with `docker-compose build traveltracer` 

## Project Structure

```
travel-tracer/
│
├── frontend/             # Main application directory
│   ├── src/              # Source code
│   ├── public/           # Public assets
│   └── package.json      # npm dependencies
│
├── Dockerfile            # Production Docker configuration
└── docker-compose.yml    # Docker Compose configuration
```

## Customization

- Edit JSON files in `frontend/public/lists/` to update travel locations
- Modify map styles and configurations in relevant components

## Future Roadmap

- [ ] Add user authentication
- [ ] Implement Simple GUI to add New Visited / Wishlisted Locations
- [ ] Implement photo upload feature
- [ ] Create shareable travel maps

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Contact

Project Link: [github.com/zebrajr/traveltracer](https://github.com/zebrajr/traveltracer)
Live Demo: [travel.carlossousa.tech](https://travel.carlossousa.tech/)

