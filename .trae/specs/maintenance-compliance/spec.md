# SparkForge Maintenance & Compliance Enhancement - Product Requirement Document

## Overview
- **Summary**: Comprehensive project maintenance and compliance enhancement for the SparkForge application, addressing database connectivity issues, API errors, compliance requirements (privacy, terms, cookie consent), and performance optimizations.
- **Purpose**: Resolve critical production environment issues and enhance compliance to meet legal and operational standards.
- **Target Users**: Production environment users, developers maintaining the application, and compliance auditors.

## Goals
- Diagnose and resolve production database connectivity issues
- Fix API 500 errors affecting /api/signals endpoint
- Implement compliance requirements: privacy page, terms of service, cookie consent banner, and about page
- Update footer with proper hosting attribution and functional links
- Configure proper caching for improved performance
- Add 301 redirects for old domains
- Verify all fixes and implementations work correctly

## Non-Goals (Out of Scope)
- Implement Argo Smart Routing (requires paid Cloudflare subscription)
- Implement full user authentication system changes
- Add new features beyond compliance and maintenance
- Modify core business logic or data models

## Background & Context
- The application is deployed on Vercel with Supabase as the database backend
- Production API /api/signals is returning 500 errors, likely due to environment variable configuration
- Footer links are currently placeholder (#) links that need to be functional
- Missing compliance pages (privacy, terms, about)
- No cookie consent banner implemented
- Current caching strategy needs improvement

## Functional Requirements
- **FR-1**: Fix database connectivity in production environment
- **FR-2**: Create /privacy page with basic privacy statement
- **FR-3**: Create /terms page with service terms and AI-generated content disclaimer
- **FR-4**: Create /about page detailing technology stack
- **FR-5**: Update footer with hosting attribution and functional links
- **FR-6**: Implement cookie consent banner
- **FR-7**: Configure proper caching headers
- **FR-8**: Add 301 redirects for old domains

## Non-Functional Requirements
- **NFR-1**: API endpoints must return HTTP 200 status code
- **NFR-2**: Pages must load within 3 seconds on subsequent visits
- **NFR-3**: Cookie consent banner must be GDPR compliant
- **NFR-4**: All external links must open in new tabs with proper rel attributes

## Constraints
- **Technical**: Next.js 15, Supabase, Vercel, Cloudflare
- **Business**: Must maintain 7 core Vercel environment variables only
- **Dependencies**: External APIs (DeepSeek, Algolia, Product Hunt)

## Assumptions
- Vercel environment variables are properly configured with correct values
- Supabase project is accessible and properly configured
- Cloudflare is configured as CDN/proxy

## Acceptance Criteria

### AC-1: Database Connectivity Fixed
- **Given**: Production environment with configured Supabase credentials
- **When**: API endpoint /api/signals is accessed
- **Then**: Returns HTTP 200 with signal data or empty array
- **Verification**: `programmatic`

### AC-2: Privacy Page Created
- **Given**: User navigates to /privacy
- **When**: Page loads
- **Then**: Displays basic privacy statement with sections on data collection and usage
- **Verification**: `human-judgment`

### AC-3: Terms of Service Page Created
- **Given**: User navigates to /terms
- **When**: Page loads
- **Then**: Displays service terms including AI-generated content disclaimer
- **Verification**: `human-judgment`

### AC-4: About Page Created
- **Given**: User navigates to /about
- **When**: Page loads
- **Then**: Displays technology stack information: Next.js + Supabase + Cloudflare + Vercel
- **Verification**: `human-judgment`

### AC-5: Footer Updated
- **Given**: User views footer on any page
- **When**: Footer is rendered
- **Then**: Shows "Hosted on Cloudflare · Vercel" and links to /privacy, /terms, and GitHub Issues
- **Verification**: `human-judgment`

### AC-6: Cookie Consent Banner Implemented
- **Given**: User visits the site for the first time
- **When**: Page loads
- **Then**: Cookie consent banner appears with accept/reject options and persists preference
- **Verification**: `human-judgment`

### AC-7: Caching Configured
- **Given**: User visits the site twice
- **When**: Second visit occurs
- **Then**: CF-Cache-Status header changes from MISS to HIT
- **Verification**: `programmatic`

### AC-8: 301 Redirects Configured
- **Given**: User accesses old domain URL
- **When**: Request is made
- **Then**: Returns HTTP 301 redirect to new domain
- **Verification**: `programmatic`

## Open Questions
- [ ] What are the old domain names that need redirects?
- [ ] What is the exact content for privacy policy and terms of service?
