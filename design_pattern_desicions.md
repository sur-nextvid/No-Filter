# Design Pattern Decisions

Explanation of the Design patterns used.

### Ethereum Patterns used

- Registry Contract
- Restricting Access.
- Circuit Breaker.
- Smart contract comments according to solidity documentation.

### Why these patterns

These patterns help us make the smart contract more secure and less susceptible to attacks.

- **Restricting Access** allow us to use authorization control functions.

- **Registry Contract** allow us to make the main contract upgradeable.

- **Circuit Breaker** allow us stop the contract if is hacked and we can destroy the contract if we couldn't recover from an attack and move the contract funds to the contract owner or a specified account.

### Why not others

These are the ones that I thought my contracts required and they give the security level that I was looking for.
