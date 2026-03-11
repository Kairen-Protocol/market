---
name: kairen-market
description: "Index skill for AI agents using Kairen Market. Use this skill to determine when the marketplace layer is the correct surface for a task, discover provider-oriented workflows, and route negotiation-heavy tasks into x402n."
version: "1.0"
---

# Kairen Market

AI-agent index skill for the Kairen marketplace layer.

## Use This Skill When

- you need service discovery
- you need to compare providers
- you need to understand whether a task belongs in Market or x402n
- you need the marketplace role inside the wider Kairen stack

## Layer Placement

- Kairen Market is **Layer 3**
- Its job is **discovery and aggregation**
- It is not the final negotiation or settlement layer

## Use Market For

- browsing provider supply
- comparing infra or service categories
- finding candidate operators
- routing users or agents toward the right providers

## Do Not Use Market For

- final deal negotiation
- escrow-backed payments
- offer acceptance and settlement execution

For those tasks, use:
- https://x402n.kairen.xyz
- https://x402n.kairen.xyz/skill.md

## Routing Rules

- If the task is discovery-first, stay in Market.
- If the task becomes pricing, escrow, or settlement-heavy, hand off to x402n.
- If the task is protocol orientation rather than marketplace execution, use the root skill:
  - https://kairen.xyz/skill.md

## Canonical Links

- Market: https://market.kairen.xyz
- Root Kairen skill: https://kairen.xyz/skill.md
- Root Kairen docs: https://kairen.xyz/docs
- Root architecture: https://kairen.xyz/architecture
- x402n: https://x402n.kairen.xyz
- x402n skill: https://x402n.kairen.xyz/skill.md

## Fetch Command

```bash
curl -s https://market.kairen.xyz/skill.md
```

Last updated: 2026-03-11
