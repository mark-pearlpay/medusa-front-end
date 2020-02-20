Feature: Wallet Management
  As a user
  I should be able to manage my wallet

Scenario: Create wallet
    Given I have valid wallet details
    When I go to main page
    And I create a new wallet
    Then wallet should exist in list

# Scenario: Update wallet
# Scenario: Delete wallet
# Scenario: Get wallet

Scenario: List wallets
	Given I have existing wallets
    When I go to main page
    Then wallet list should exist
    And wallet list should not be empty

# Scenario: Transfer funds between wallets
# Scenario: List transaction history