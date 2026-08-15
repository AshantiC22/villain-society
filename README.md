# Villain Culture — Full Stack E-Commerce Platform

> Built for the ones who never fit.

**Live Site:** [vllnculture.com](https://vllnculture.com)  
**Built by:** Ashanti Cocroft — MSU Software Engineering, Dec 2025  
**GitHub:** [github.com/AshantiC22](https://github.com/AshantiC22)  
**LinkedIn:** [linkedin.com/in/ashanticocroft](https://linkedin.com/in/ashanticocroft)

---

## Overview

Villain Culture is a production-ready full stack e-commerce platform 
built from scratch for an independent dark streetwear clothing brand. 
The platform processes real customer orders, manages inventory in real 
time, and includes a fully functional admin dashboard — all built on 
AWS serverless infrastructure.

This project was built entirely by one developer with zero templates, 
zero Shopify, zero WordPress — pure code from frontend to cloud.

---

## Live Features

- 🛒 Full e-commerce checkout with Stripe payment processing
- 📦 Real-time inventory management system
- 🔐 Secure admin dashboard with inline product editing
- 📧 Automated order confirmation emails via AWS SES
- 📱 Fully responsive — mobile first design
- 🚀 CI/CD pipeline — auto deploys on every git push
- ⚡ CloudFront CDN — global content delivery

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Vite, React Router |
| Backend | AWS Lambda, Node.js |
| Database | AWS DynamoDB (NoSQL) |
| Payments | Stripe API, Stripe Elements |
| Email | AWS SES with DKIM authentication |
| Storage | AWS S3 |
| CDN | AWS CloudFront |
| Auth | AWS IAM |
| CI/CD | GitHub Actions |
| DNS | Namecheap, AWS Certificate Manager |
| Monitoring | AWS CloudWatch |

---

## Architecture
<img width="1292" height="692" alt="villain culture system design" src="https://github.com/user-attachments/assets/153ba88e-0285-4b21-954c-783a8dd6a283" />
### Serverless Backend — 8 Lambda Functions

| Function | Method | Description |
|----------|--------|-------------|
| villain-create-payment | POST | Stripe payment intent + order save |
| villain-get-inventory | GET | Fetch all products with stock |
| villain-update-inventory | POST | Update stock per size |
| villain-update-product | PUT | Update name, price, description |
| villain-get-orders | GET | Fetch all orders for admin |
| villain-get-waitlist | GET | Fetch waitlist signups |
| villain-email-signup | POST | Add to waitlist |
| villain-contact-form | POST | Save contact messages |

---

## Key Technical Decisions

**Why Serverless?**  
No server management, pay-per-execution pricing, 
automatic scaling, and faster deployment cycles. 
Perfect for a new e-commerce brand with unpredictable traffic.

**Why DynamoDB?**  
NoSQL fits the product inventory data model well. 
Flexible schema allows adding new product attributes 
without migrations. Single-digit millisecond performance at scale.

**Why CloudFront?**  
Global CDN ensures fast load times worldwide. 
Assets cached at edge locations with 1-year cache headers 
on static assets and no-cache on HTML for instant updates.

**Why GitHub Actions?**  
Automated CI/CD means every push to main deploys 
to production in under 2 minutes. Separate cache 
strategies per asset type (HTML vs JS/CSS vs media).

---

## Admin Dashboard

The admin dashboard at `/admin` provides:
- Real-time order management
- Inline inventory editing — click any value to edit
- Live price and description updates
- Waitlist management with CSV export
- Customer message inbox
- Low stock alerts

All changes save directly to DynamoDB and reflect 
immediately across the entire site.

---

## Payment Flow
<img width="4402" height="2613" alt="villain_culture_payment_system_design_drawio_lines" src="https://github.com/user-attachments/assets/96199b8b-0020-43bd-bc57-e588b3299618" />
---

## CI/CD Pipeline

```yaml
Push to main branch
    → GitHub Actions triggered
    → npm install
    → npm run build (Vite)
    → Deploy HTML (no-cache)
    → Deploy JS/CSS (1 year cache)
    → Deploy images/videos (1 year cache)
    → CloudFront invalidation
    → Live in ~2 minutes
```

---

## Performance Optimizations

- Lazy loading on all product images
- First product image loads with high priority
- Video preloading with metadata strategy on mobile
- Code splitting — Stripe loads only on checkout page
- GPU-accelerated animations with `will-change`
- AbortController on all fetch requests
- Memoized React components with `memo()`
- 1-year cache headers on static assets

---

## What I Learned

- **AWS Serverless Architecture** — Designing and deploying 
  Lambda functions, API Gateway, and DynamoDB from scratch
- **Payment Processing** — Integrating Stripe payment intents, 
  handling webhooks, and managing payment states
- **Email Infrastructure** — DKIM authentication, SES sandbox 
  vs production, and email deliverability best practices
- **CI/CD** — Building automated deployment pipelines with 
  proper cache invalidation strategies
- **Performance Engineering** — Lazy loading, cache headers, 
  GPU acceleration, and Core Web Vitals optimization
- **DNS and SSL** — Configuring custom domains, SSL certificates, 
  and CloudFront distributions

---

## Running Locally

```bash
git clone https://github.com/AshantiC22/villain-society
cd villain-society
npm install
npm run dev
```

Requires environment variables for AWS and Stripe keys.

---

## What's Next

- [ ] Switch to Stripe live keys for real transactions
- [ ] AWS SES production access for customer emails
- [ ] Real product photography when inventory arrives
- [ ] Customer account system with order history
- [ ] Discount code system
- [ ] Reduce inventory automatically on purchase

---

*Built with React, AWS, Stripe, and a villain mentality.*

