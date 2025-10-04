# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [STVP](https://mia.kiwi/projects/stvp).

## [25.0.1] - 2025-10-04

### Added

- `world` property to Cells to keep track of global attributes of the world
- Debug cell types
- Neighbor getters for cells

### Changed

- Cells now reference their empire directly instead of through its ID

## [25.0.0] - 2025-10-04

### Added

- Cells
- Cell types
- Worlds
- World generators
- Perlin-based world generator with octaves
- Perlin-based world generator with preset fading layers
- Canvas drawer