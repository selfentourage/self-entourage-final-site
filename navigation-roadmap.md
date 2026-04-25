# Self Entourage Navigation Roadmap

This document captures the premium navigation direction for the live site.

## Current confirmed need

The primary navigation must remain clean, but the secondary pages must not disappear from the customer journey.

## Primary navigation

These are the main conversion paths and should stay visually dominant:

- Home
- Start Here
- Store
- Learn
- Build
- Deploy
- Memberships
- Contact

## Secondary navigation

These pages should remain accessible through a premium Explore / Programs navigation layer:

- Truth OS
- Black Crown
- Neverloop
- Services
- About
- FAQ
- Private Programs
- Intensives & Reservations

## Preferred final architecture

Desktop:

- Logo / brand at left
- Primary nav across the top
- Explore dropdown containing Truth OS, Black Crown, Neverloop, Services, About, FAQ
- Programs dropdown containing Private Programs and Intensives & Reservations

Mobile:

- Logo / brand at top
- Compact menu system
- Main section
- Explore section
- Programs section
- Support / Legal section

## Implementation warning

The current site has many static HTML pages. A true dropdown/hamburger system should be applied globally and tested across all public pages. A CSS-first patch can safely expose secondary links, but the best final version is a shared responsive header pattern across all pages.
