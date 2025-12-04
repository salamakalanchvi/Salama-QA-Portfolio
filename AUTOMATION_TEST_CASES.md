# 🎯 Sauce Demo - Automatable Test Cases

## Overview
This document outlines all test cases that can be realistically automated for the Sauce Demo application using Playwright. These are organized by feature/module and include positive, negative, and edge cases.

---

## 📋 Test Organization Structure

Tests should be organized into:
- **smoke/** — Critical happy path flows (1-3 tests)
- **regression/** — Comprehensive coverage (15-20 tests)

---

# 🔐 LOGIN MODULE

## Positive Cases

### TC-LOGIN-001: Valid Login with Standard User
- **Priority:** Critical
- **Description:** User logs in with valid standard user credentials
- **Expected:** User redirected to inventory page, cart badge visible, URL shows /inventory.html
- **Why Automate:** Foundation test, must always work

### TC-LOGIN-002: Successful Login Persists Session
- **Priority:** High
- **Description:** After login, refresh page and verify session still active
- **Expected:** User remains logged in, inventory page still displays
- **Why Automate:** Validates storage state and session handling

---

## Negative Cases

### TC-LOGIN-003: Login Fails with Invalid Username
- **Priority:** High
- **Description:** Login with non-existent username and correct password
- **Expected:** Error message displayed: "Username and password do not match"
- **Test Data:** `username: "invalid_user"`, `password: "secret_sauce"`
- **Why Automate:** Validates proper error handling

### TC-LOGIN-004: Login Fails with Invalid Password
- **Priority:** High
- **Description:** Login with correct username but wrong password
- **Expected:** Error message displayed: "Username and password do not match"
- **Test Data:** `username: "standard_user"`, `password: "wrongpassword"`
- **Why Automate:** Tests authentication validation

### TC-LOGIN-005: Login Fails with Empty Username
- **Priority:** High
- **Description:** Try to login with empty username field
- **Expected:** Error message: "Username is required"
- **Test Data:** `username: ""`, `password: "secret_sauce"`
- **Why Automate:** Frontend validation check

### TC-LOGIN-006: Login Fails with Empty Password
- **Priority:** High
- **Description:** Try to login with empty password field
- **Expected:** Error message: "Password is required"
- **Test Data:** `username: "standard_user"`, `password: ""`
- **Why Automate:** Frontend validation check

### TC-LOGIN-007: Login Fails with Both Fields Empty
- **Priority:** Medium
- **Description:** Try to login with both username and password empty
- **Expected:** Error message appears
- **Why Automate:** Edge case validation

### TC-LOGIN-008: Locked User Cannot Login
- **Priority:** High
- **Description:** Login with locked user credentials
- **Expected:** Error message: "Sorry, this user has been locked out."
- **Test Data:** `username: "locked_user"`, `password: "secret_sauce"`
- **Why Automate:** Validates account lockout functionality

---

## Edge Cases

### TC-LOGIN-009: Login with Whitespace Trimming
- **Priority:** Medium
- **Description:** Login with username that has leading/trailing spaces
- **Expected:** Should trim spaces and login successfully OR show error (depends on app behavior)
- **Test Data:** `username: "  standard_user  "`, `password: "secret_sauce"`
- **Why Automate:** Real-world user input edge case

### TC-LOGIN-010: Username Case Sensitivity
- **Priority:** Low
- **Description:** Try login with uppercase username
- **Expected:** Determine if username is case-sensitive or not
- **Test Data:** `username: "STANDARD_USER"`, `password: "secret_sauce"`
- **Why Automate:** Documents expected behavior

---

# 🛍️ INVENTORY / PRODUCT LISTING MODULE

## Positive Cases

### TC-INVENTORY-001: Inventory Page Loads with Products
- **Priority:** Critical
- **Description:** Navigate to inventory page and verify all products display
- **Expected:** Page loads, 6 products visible with images, names, prices, and "Add to cart" buttons
- **Why Automate:** Core functionality

### TC-INVENTORY-002: Product Sorting - Price Low to High
- **Priority:** High
- **Description:** Click sort dropdown and select "Price (low to high)"
- **Expected:** Products re-sort correctly by price ascending order
- **Test Data:** Verify products order: $9.99 < $15.99 < $29.99, etc.
- **Why Automate:** Tests sorting functionality

### TC-INVENTORY-003: Product Sorting - Price High to Low
- **Priority:** High
- **Description:** Click sort dropdown and select "Price (high to low)"
- **Expected:** Products display in descending price order
- **Why Automate:** Tests reverse sorting

### TC-INVENTORY-004: Product Sorting - Name (A to Z)
- **Priority:** High
- **Description:** Sort products alphabetically A to Z
- **Expected:** Products display in alphabetical order
- **Why Automate:** Tests alphabetical sorting

### TC-INVENTORY-005: Product Sorting - Name (Z to A)
- **Priority:** High
- **Description:** Sort products alphabetically Z to A
- **Expected:** Products display in reverse alphabetical order
- **Why Automate:** Tests reverse alphabetical sorting

### TC-INVENTORY-006: Add Single Product to Cart
- **Priority:** Critical
- **Description:** Click "Add to cart" for one product
- **Expected:** Product added, cart badge shows "1", button changes to "Remove from cart"
- **Test Data:** Add "Sauce Labs Backpack"
- **Why Automate:** Foundation functionality

### TC-INVENTORY-007: Add Multiple Different Products to Cart
- **Priority:** High
- **Description:** Add 3 different products to cart
- **Expected:** Cart badge updates to "3", all three products addable
- **Test Data:** Add Backpack, T-Shirt, Onesie
- **Why Automate:** Tests multi-item cart handling

### TC-INVENTORY-008: Add Same Product Multiple Times (if allowed)
- **Priority:** Medium
- **Description:** Try adding same product twice to cart
- **Expected:** Document behavior (does quantity increase or add second instance?)
- **Test Data:** Add Backpack twice
- **Why Automate:** Tests cart logic

### TC-INVENTORY-009: Remove Product from Inventory
- **Priority:** High
- **Description:** Add product to cart, then click "Remove from cart" button on inventory
- **Expected:** Product removed, cart badge decreases, button reverts to "Add to cart"
- **Why Automate:** Tests cart removal

### TC-INVENTORY-010: Product Detail Click
- **Priority:** Medium
- **Description:** Click on product name or image to open product detail
- **Expected:** Navigate to product detail page with full description
- **Why Automate:** Tests product detail navigation

---

## Negative Cases

### TC-INVENTORY-011: Empty Sort Dropdown Selection
- **Priority:** Low
- **Description:** Verify sort dropdown has valid options
- **Expected:** Dropdown should always have valid selections
- **Why Automate:** Validates UI consistency

---

# 🛒 CART MODULE

## Positive Cases

### TC-CART-001: View Cart with Single Item
- **Priority:** High
- **Description:** Add one product and open cart
- **Expected:** Cart page shows 1 item with product name, price, quantity
- **Why Automate:** Foundation cart functionality

### TC-CART-002: View Cart with Multiple Items
- **Priority:** High
- **Description:** Add 3 products and open cart
- **Expected:** Cart displays all 3 items with correct prices and quantities
- **Why Automate:** Tests multi-item cart display

### TC-CART-003: Verify Cart Item Prices Match Product Prices
- **Priority:** Medium
- **Description:** Add product and verify price in cart matches inventory
- **Expected:** Price identical to what was shown on inventory
- **Test Data:** Backpack inventory price should equal cart price
- **Why Automate:** Catches price discrepancy bugs

### TC-CART-004: Update Product Quantity in Cart
- **Priority:** High
- **Description:** In cart, change product quantity from 1 to 3
- **Expected:** Quantity updates, item subtotal updates, cart total updates
- **Why Automate:** Tests quantity modification

### TC-CART-005: Remove Product from Cart
- **Priority:** High
- **Description:** Remove one product from cart
- **Expected:** Product removed, cart count decreases, totals recalculate
- **Why Automate:** Tests item removal

### TC-CART-006: Continue Shopping from Cart
- **Priority:** Medium
- **Description:** Click "Continue Shopping" button on cart
- **Expected:** Redirected back to inventory page
- **Why Automate:** Tests navigation

### TC-CART-007: Proceed to Checkout from Cart
- **Priority:** Critical
- **Description:** Click "Proceed to Checkout" button
- **Expected:** Navigate to checkout/information page
- **Why Automate:** Critical user flow

---

## Edge Cases

### TC-CART-008: Cart Persists After Page Refresh
- **Priority:** High
- **Description:** Add items, refresh page, verify cart still has items
- **Expected:** Cart items persist across page reload
- **Why Automate:** Tests session persistence

### TC-CART-009: Empty Cart Behavior
- **Priority:** Medium
- **Description:** Remove all items from cart to make it empty
- **Expected:** Cart badge removes or shows 0, empty cart message displays
- **Why Automate:** Tests empty state UI

---

# 💳 CHECKOUT MODULE

## Positive Cases

### TC-CHECKOUT-001: Complete Checkout with Valid Information
- **Priority:** Critical
- **Description:** Fill checkout form with valid info and complete purchase
- **Expected:** Order confirmation page displays "Thank you for your order!"
- **Test Data:**
  - First Name: "Salama"
  - Last Name: "Awan"
  - Postal Code: "12345"
- **Why Automate:** Most critical user flow

### TC-CHECKOUT-002: Verify Order Summary Before Completion
- **Priority:** High
- **Description:** Proceed through checkout and verify order summary shows correct items and prices
- **Expected:** Order summary page displays correct item count, prices, and total
- **Why Automate:** Ensures order accuracy

### TC-CHECKOUT-003: Verify Order Total Calculation
- **Priority:** High
- **Description:** Add multiple products with different prices and verify total calculation
- **Expected:** Subtotal + tax = total correctly calculated
- **Test Data:** Add 2-3 items, verify math
- **Why Automate:** Catches calculation bugs

### TC-CHECKOUT-004: Checkout with Different Postal Codes
- **Priority:** Medium
- **Description:** Try checkout with various valid postal codes
- **Expected:** All valid formats accepted (US, international if applicable)
- **Test Data:** "12345", "90210", "00001"
- **Why Automate:** Tests postal code validation

---

## Negative Cases

### TC-CHECKOUT-005: Checkout Fails with Empty First Name
- **Priority:** High
- **Description:** Try checkout without entering first name
- **Expected:** Error message: "First Name is required"
- **Why Automate:** Validates form requirements

### TC-CHECKOUT-006: Checkout Fails with Empty Last Name
- **Priority:** High
- **Description:** Try checkout without entering last name
- **Expected:** Error message: "Last Name is required"
- **Why Automate:** Validates form requirements

### TC-CHECKOUT-007: Checkout Fails with Empty Postal Code
- **Priority:** High
- **Description:** Try checkout without entering postal code
- **Expected:** Error message: "Postal Code is required"
- **Why Automate:** Validates form requirements

### TC-CHECKOUT-008: Checkout with Invalid Postal Code Format
- **Priority:** Medium
- **Description:** Try checkout with non-numeric or invalid postal code
- **Expected:** Either accept any format OR show validation error (document behavior)
- **Test Data:** "ABCDE", "!@#$%", ""
- **Why Automate:** Tests input validation

### TC-CHECKOUT-009: Checkout with Special Characters in Name
- **Priority:** Low
- **Description:** Try checkout with special characters in name
- **Expected:** Either accept or reject (document behavior)
- **Test Data:** First Name: "José", Last Name: "O'Brien"
- **Why Automate:** Documents special character handling

---

## Edge Cases

### TC-CHECKOUT-010: Checkout Flow Cancellation
- **Priority:** Medium
- **Description:** Start checkout, then click cancel/back
- **Expected:** Return to cart without processing order
- **Why Automate:** Tests cancellation flow

### TC-CHECKOUT-011: Empty Cart Checkout Attempt
- **Priority:** Medium
- **Description:** Try to checkout with empty cart
- **Expected:** Should either prevent checkout or show error
- **Why Automate:** Tests edge case handling

---

# 🚪 LOGOUT / SESSION MODULE

## Positive Cases

### TC-SESSION-001: User Logout Successfully
- **Priority:** High
- **Description:** Click logout button and verify redirection
- **Expected:** Logged out, redirected to login page, cart cleared
- **Why Automate:** Security critical

### TC-SESSION-002: Cannot Access Protected Pages After Logout
- **Priority:** High
- **Description:** After logout, try to access inventory page directly via URL
- **Expected:** Redirected to login page, access denied
- **Why Automate:** Security validation

### TC-SESSION-003: Session Timeout (if applicable)
- **Priority:** Medium
- **Description:** Wait for session to timeout and verify behavior
- **Expected:** Redirected to login or shown session expired message
- **Why Automate:** Tests session management (if applicable)

---

# 📊 CROSS-FUNCTIONAL / REGRESSION TEST SCENARIOS

## Positive Flow

### TC-E2E-001: Complete Purchase Flow (Smoke Test)
- **Priority:** Critical
- **Description:** Full flow - Login → Browse → Add Items → Checkout → Complete
- **Expected:** Order confirmation message
- **Why Automate:** Most important flow to catch regressions
- **Current Status:** ✅ Already implemented

### TC-E2E-002: Multiple Items Checkout
- **Priority:** High
- **Description:** Add 3+ items, verify prices, complete checkout
- **Expected:** Order completes with correct total
- **Why Automate:** Real-world usage

### TC-E2E-003: Multiple Checkouts in Sequence
- **Priority:** Medium
- **Description:** Complete purchase, logout, login, add items again, checkout again
- **Expected:** Both orders complete successfully
- **Why Automate:** Tests repeated workflow stability

---

# 📈 TEST CASE SUMMARY

| Category | Total Cases | Positive | Negative | Edge Cases |
|----------|------------|----------|----------|-----------|
| Login | 10 | 2 | 6 | 2 |
| Inventory | 11 | 9 | 1 | 1 |
| Cart | 9 | 7 | 0 | 2 |
| Checkout | 11 | 4 | 5 | 2 |
| Session | 3 | 3 | 0 | 0 |
| E2E/Regression | 3 | 3 | 0 | 0 |
| **TOTAL** | **47** | **28** | **12** | **7** |

---

# 🎯 Recommended Implementation Phases

## Phase 1 - Foundation (5 tests) - START HERE
These are the must-haves for portfolio credibility:
1. ✅ TC-LOGIN-001: Valid login
2. ✅ TC-INVENTORY-001: Inventory page loads
3. ✅ TC-INVENTORY-006: Add product to cart
4. ✅ TC-CART-007: Proceed to checkout
5. ✅ TC-CHECKOUT-001: Complete checkout (already have this!)

**Why:** Covers happy path, shows framework is working

---

## Phase 2 - Robustness (8 tests)
Add validation and error handling:
1. TC-LOGIN-003: Invalid username
2. TC-LOGIN-004: Invalid password
3. TC-LOGIN-005: Empty username
4. TC-LOGIN-006: Empty password
5. TC-CHECKOUT-005: Empty first name
6. TC-CHECKOUT-006: Empty last name
7. TC-CHECKOUT-007: Empty postal code
8. TC-SESSION-001: Logout

**Why:** Shows you think about error scenarios, not just happy path

---

## Phase 3 - Features (8 tests)
Add feature-specific tests:
1. TC-INVENTORY-002: Sort price low to high
2. TC-INVENTORY-004: Sort name A to Z
3. TC-INVENTORY-007: Add multiple products
4. TC-CART-001: View cart
5. TC-CART-004: Update quantity
6. TC-CART-005: Remove from cart
7. TC-CHECKOUT-002: Verify order summary
8. TC-E2E-002: Multiple items checkout

**Why:** Demonstrates feature understanding

---

## Phase 4 - Edge Cases & Persistence (5 tests)
Polish the suite:
1. TC-INVENTORY-009: Remove product
2. TC-CART-008: Cart persists after refresh
3. TC-CHECKOUT-003: Verify total calculation
4. TC-SESSION-002: Cannot access after logout
5. TC-E2E-003: Multiple checkouts in sequence

**Why:** Shows comprehensive thinking

---

# 💡 Implementation Notes

## Test Data Strategy
- Use constants for valid credentials and user info
- Keep test data in centralized config
- Use parameterized tests where possible

## Assertion Strategy
- Assert visible UI elements (cart badge, button text)
- Assert URL navigation
- Assert success/error messages
- Don't over-assert (keep tests maintainable)

## Error Message Validation
- Document exact error messages from the app
- Match error text in assertions
- Handle case sensitivity

## Flakiness Prevention
- Use proper waits (waitForSelector, waitForNavigation)
- Avoid hard sleeps
- Use data attributes for selectors when possible

---

**Recommendation:** Start with Phase 1 + Phase 2 (13 tests total). This gives you a solid, credible portfolio with good coverage. Later add Phase 3 & 4 as you have time.

