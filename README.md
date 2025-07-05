# 📦 @adaas/auxta

[![npm](https://img.shields.io/npm/v/@adaas/auxta.svg)](https://www.npmjs.com/package/@adaas/auxta)  
[![Release](https://img.shields.io/github/release/ADAAS-org/adaas-auxta.svg)](https://github.com/ADAAS-org/adaas-auxta/releases)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/your-profile/)  
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)  
[![Open Issues](https://img.shields.io/github/issues/ADAAS-org/adaas-auxta.svg)](https://github.com/ADAAS-org/adaas-auxta/issues)  
[![Documentation](https://img.shields.io/badge/Docs-Read-blue)](https://github.com/ADAAS-org/adaas-auxta/docs)  
[![Version](https://img.shields.io/badge/Version-1.0.0-green)](https://github.com/ADAAS-org/adaas-auxta/releases/tag/v1.0.0)  

**Auxta DB** is a purpose-built database that combines the strengths of Elasticsearch and Redis, optimized for one task: **fast matching search** across both on-disk and in-memory indexes.

It allows you to define vectors with **static**, **computed**, and **dynamic** fields — all searchable and filterable at high speed.

*A powerful database solution designed for high-performance context-aware applications.*
Supports advanced use cases with a developer-friendly SDK and flexible entity modeling.

&#x20;&#x20;

---

## 🧭 Table of Contents

2. [Scenarios & Use Cases](#scenarios--use-cases)
3. [Entities & Data Model](#entities--data-model)
4. [Quick Start](#quick-start)
5. [SDK Usage](#sdk-usage)
6. [Common Use Cases](#common-use-cases)
7. [Configuration](#configuration)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact / Support](#contact--support)

---

## 🚀 Quick Start

Ready to get started with `@adaas/auxta`? Here's how to fire it up and run your first search.

### 1. Setup your environment

Add this to your `.env` file or environment variables:

```env
AUXTA_SERVER_PORT=5656
AUXTA_SERVER_HOST=localhost
AUXTA_SERVER_TOKEN=AUXTA-token:1234-1234-1234-1234
AUXTA_SERVER_CLIENT=auxta-client
```

Then, initialize the SDK:

```ts
import { Auxta, AuxtaCommand } from '@adaas/auxta';
import { RunningTrailVector } from './models';

const auxta = new Auxta();
```

### 2. Add your first vector

```ts
const trail = new RunningTrailVector({
  distance: 2222,
  averageTime: 50,
  complexity: 'uphill',
  views: ['rocks', 'mud', 'grass', 'sand'],
  features: ['water', 'trees', 'mountains'],
});

const addCommand = new AuxtaCommand().add(trail);
await auxta.query(addCommand);

console.log('Trail added!');
```

### 3. Run a search query with conditions

```ts
const searchCommand = new AuxtaCommand()
  .search(RunningTrailVector)
  .where('distance', d => d.gte(1000).and().lte(3000))
  .where('views', v => v.in(['mud', 'rocks']).or().in(['water', 'trees']));

const results = await auxta.query<RunningTrailVector>(searchCommand);

console.log('Search returned', results.length, 'items');
```

And that’s it — you're up and running! 🎉

---

## 🎯 Scenarios & Use Cases

### 1. Dynamic Auctions / Matchmaking

Ideal for short-lived real-time data scenarios such as matchmaking systems in multiplayer games:

* Define a temporary index
* Add dimensions like rank, experience, subscription type, game mode, etc.
* Run the auction or matchmaking process
* Clear the index afterward

Use Case Example: Matching online players into balanced teams based on multiple attributes in real time.

### 2. Buyer-Seller Matching

Useful for marketplace platforms with clear category/tag-based logic, but also influenced by dynamic elements like:

* Real-time budgets
* Inventory or consumption metrics

Use Case Example: Match service providers with clients based on both fixed profiles and rapidly changing preferences or constraints.

### 3. API Quote Matching Engine

Perfect for metered APIs with quota-limited access:

* Multiple API endpoints share a protocol
* Quotes are evaluated at runtime
* Users are only granted access to APIs with available call limits or capacity

Use Case Example: A pricing gateway that selects valid API routes based on real-time usage stats and defined business rules.

---

## 📂 Entities & Data Model

### 1. Indexes

Indexes are the main containers that organize vectors. You can think of them like tables or collections, but optimized for fast matching queries on both disk and memory. Indexes support dynamic creation and deletion, allowing flexible workflows such as temporary auction indices.

### 2. Vectors

Vectors represent the data records stored in an index. Each vector consists of multiple fields — these can be static, computed, or dynamic — describing the entity’s attributes. Vectors are the primary objects that you search, add, or update in Auxta.

### 3. Dimensions

Dimensions define the searchable properties within vectors. They describe the type, constraints, and how a field participates in search queries, including operators like range filters, sets, or proximity. Dimensions enable fine-grained control over how matching is performed.

---

## 🧰 SDK Usage

*Coming soon: initialization, queries, mutations, and examples.*

---


## 📄 License

MIT

---

## 📬 Contact / Support

* Website: [https://adaas.org](https://adaas.org)
* Email: [support@adaas.dev](mailto:support@adaas.dev)
* Contact us: [contact-us@adaas.org](mailto:contact-us@adaas.org)
* Issues: [GitHub Issues](https://github.com/adaas/auxta/issues)
