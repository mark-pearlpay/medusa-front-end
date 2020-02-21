Feature: Wallet Management
  As a user
  I should be able to manage my wallet

Scenario: Create wallet
    Given I have valid wallet details
    When I go to main page
    And I create a new wallet
    Then wallet should exist in list

# Scenario: Update wallet

Scenario: Top up wallet
	Given I have valid wallet details
	And I go to main page
    And I create a new wallet
    When I top up an existing wallet
    Then I should have a correct balance value

Scenario: Delete wallet
	Given I have valid wallet details
	And I go to main page
    And I create a new wallet
    When I delete an existing wallet
    Then wallet should not exist in list

Scenario: List wallets
	Given I have existing wallets
    When I go to main page
    Then wallet list should exist
    And wallet list should not be empty

# Scenario: List transaction history - Get
# Scenario: Transfer funds between wallets
# Scenario: Withdraw funds between wallets
