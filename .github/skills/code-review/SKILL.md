---
name: code-review
user-invocable: true
description: "Perform a repository-level code review focused on security, architecture, and general development standards."
---

# Code Review Skill

## Use when

- Reviewing a repository for security issues, architectural quality, and general development best practices.
- The user asks for a report on the project structure, code conventions, or risk areas.
- You need a structured, checklist-driven assessment rather than a single code fix.

## Workflow

1. Survey the repository.
   - Inspect `package.json`, `tsconfig.json`, `prisma/schema.prisma`, and the `src/` folder structure.
   - Identify the main modules, public APIs, authentication/authorization layers, and persistence patterns.

2. Evaluate security.
   - Check authentication and authorization flows for proper guard use, role checks, and access control.
   - Examine input validation, request handling, and DTO/DTO validation coverage.
   - Look for secrets or configuration leaks, insecure defaults, and unsafe dependency usage.
   - Verify that sensitive data is handled appropriately (passwords, tokens, PII, encryption).

3. Evaluate architecture.
   - Assess module boundaries, service responsibilities, and separation of concerns.
   - Check consistency of patterns across features (controllers, services, DTOs, entities).
   - Evaluate database modeling, relations, and how business logic is layered.
   - Look for coupling, duplication, and potential maintainability issues.

4. Evaluate general development rules.
   - Validate naming conventions, folder organization, and comment/documentation quality.
   - Check test coverage, existing specs, and whether critical paths are covered.
   - Review configuration files, linting, formatting, and build/test scripts.
   - Identify any code smells, dead code, or missing error handling.

5. Produce a report.
   - Summarize key findings in three sections: Security, Architecture, General Development.
   - Prioritize issues as High, Medium, or Low risk.
   - Provide concrete recommendations and next steps.

## Expected Output

- A concise summary of strengths and weaknesses.
- A prioritized list of security risks, architectural problems, and development rule violations.
- Suggested fixes, improvement opportunities, and areas for follow-up review.

## Notes

- If the user asks for a more specific review (security only, architecture only, or dev standards only), adapt the report and focus the checklist accordingly.
- When a code example is needed, cite the relevant file path and line context.
