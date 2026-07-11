---
trigger: always_on
---

# Lean Codebase Rule

The primary objective of this project is to deliver a working, maintainable application with the minimum necessary code. Prefer simplicity over architectural purity.

## Core Principles

* Always modify an existing file before creating a new one.
* Every new file, component, hook, utility, context, provider, or service must have a clear, immediate purpose. Do not create abstractions for anticipated future use.
* Do not generate boilerplate, scaffolding, placeholder files, or unused architecture.
* Keep related code colocated within its feature folder.

## Components

* Create a new component only if:

  * it is reused in at least 3 places, or
  * the existing file becomes difficult to understand (roughly 250–300 lines), or
  * it represents a distinct UI element with independent responsibility.
* Do not create wrapper components that only apply styling or render children.

## Hooks

* Do not create custom hooks unless the same stateful logic is reused in at least 3 places.
* Keep feature-specific logic inside the page/component until reuse is proven.

## Utilities

* Do not create generic `utils`, `helpers`, `common`, or `shared` files without demonstrated reuse.
* Utility functions should exist only when shared across multiple features.

## State Management

* Prefer local component state.
* Lift state only when necessary.
* Introduce Context or global state only when multiple unrelated components require the same mutable data.

## Styling

* Prefer Tailwind utility classes directly in components.
* Avoid creating styling wrapper components unless they provide meaningful reusable behavior.

## Dependencies

* Before installing a new dependency, determine whether the functionality can be implemented cleanly with existing project dependencies or a small amount of code.
* Do not introduce libraries for trivial functionality.

## Refactoring

After completing every task:

1. Remove dead code.
2. Remove duplicate code.
3. Remove unnecessary abstractions.
4. Merge tiny components back into their parent when appropriate.
5. Delete unused files, imports, variables, and dependencies.
6. Reduce complexity whenever functionality remains unchanged.

## Decision Process

Before creating any new file or abstraction, ask internally:

1. Can this be implemented by modifying an existing file?
2. Is the abstraction solving a current problem instead of a possible future problem?
3. Will this be reused immediately?
4. Does this reduce overall complexity?

If any answer is **No**, keep the implementation simple and colocated.

The goal is not to build a perfect architecture. The goal is to build the smallest, cleanest, and easiest-to-maintain codebase that fully satisfies the current requirements.
