# Contributing

## Project setup and initialization

- `nvm use 20`
- `npm install`
- `npm start`

## Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to help take advantage of some of Lerna's capabilities.

To keep things simple, we stick to a minimal subset of conventional commits:

`<type>[optional breaking change flag (features only)]: <description>`

- `type`: one of 
    - `feat` for most code changes
    - `fix` for bug fixes only
    - `refactor` for code changes that do change behavior
    - `test` adding or modifying tests without changing code
    - `docs` adding documentation
    - `chore` for changes that do not impact the behavior of the platform
- `optional breaking change flag (features only)`: add a `!` after the scope if the feature changes are breaking for users
    - e.g. `feat!: changed the api`
- `description`: what changes are made in the commit

Note that we do not specify scopes in the commit.

## Branching

Branch names should reference the ticket in which the changes were requested, and a short description, `TH-0000_make_it_better`

### Referencing tickets in commits

Requiring a ticket reference in commits adds unnecessary process overhead. However, if a branch contains commits that impact multiple tickets you can add ticket references in the footer of the commit message as follows:

```
feat: I did some work

Refs: TH-0001, TH-0002
```
